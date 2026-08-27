import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

function payloadEncrypt(payload, encryptionKey) {
  const iv = Buffer.from(encryptionKey.substring(0, 16), 'utf8');
  const keyBuffer = Buffer.from(encryptionKey, 'utf8');
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  return cipher.update(payload, 'utf8', 'base64') + cipher.final('base64');
}

function payloadDecrypt(payload, encryptionKey) {
  const iv = Buffer.from(encryptionKey.substring(0, 16), 'utf8');
  const keyBuffer = Buffer.from(encryptionKey, 'utf8');
  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  return decipher.update(payload, 'base64', 'utf8') + decipher.final('utf8');
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, email, target, donor } = req.body;

  if (!amount || !email) {
    return res.status(400).json({ error: 'Missing required parameters: amount and email' });
  }

  const integrationKey = process.env.PESEPAY_INTEGRATION_KEY;
  const encryptionKey = process.env.PESEPAY_ENCRYPTION_KEY;
  const isProduction = process.env.PESEPAY_ENVIRONMENT === 'production';

  // Fallback: Simulation Mode if API keys are not supplied in environmental variables
  if (!integrationKey || !encryptionKey) {
    console.log("Pesepay Integration Key or Encryption Key not set. Running in SIMULATION mode.");
    
    // Generate a mock payment session redirecting to a success callback page
    const mockRef = `PESE-MOCK-${Date.now()}`;
    const redirectUrl = `${req.headers.origin || 'https://rhema-word-ministries.vercel.app'}/#give?status=success&ref=${mockRef}&amt=${amount}&target=${encodeURIComponent(target)}&email=${encodeURIComponent(email)}&donor=${encodeURIComponent(donor || 'Anonymous')}`;
    
    return res.status(200).json({
      simulation: true,
      redirectUrl: redirectUrl,
      referenceNumber: mockRef,
      message: "Keys missing. Simulated Pesepay redirect URL created."
    });
  }

  // Base URL: Choose Sandbox (Default) or Production based on settings
  const baseUrl = isProduction 
    ? 'https://api.pesepay.com/api/payments-engine'
    : 'https://api.test.sandbox.pesepay.com/payments-engine';

  const initiateUrl = `${baseUrl}/v1/payments/initiate`;
  const origin = req.headers.origin || 'https://rhema-word-ministries.vercel.app';

  try {
    // Construct transaction payload
    const transaction = {
      amountDetails: {
        amount: parseFloat(amount),
        currencyCode: 'USD'
      },
      reasonForPayment: `Giving to ${target || 'Ministry General offering'}`,
      resultUrl: `${origin}/api/payment-callback`,
      returnUrl: `${origin}/#give?status=success&amt=${amount}&target=${encodeURIComponent(target)}&email=${encodeURIComponent(email)}&donor=${encodeURIComponent(donor || 'Anonymous')}`,
      customerName: donor || 'Anonymous Partner',
      customerEmail: email
    };

    // Encrypt payload
    const encryptedPayload = payloadEncrypt(JSON.stringify(transaction), encryptionKey);

    // Call Pesepay API directly
    const apiResponse = await fetch(initiateUrl, {
      method: 'POST',
      headers: {
        'key': integrationKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ payload: encryptedPayload })
    });

    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error("Pesepay API Error Status:", apiResponse.status, responseData);
      return res.status(apiResponse.status).json({
        error: responseData.message || 'Error communicating with Pesepay gateway API.'
      });
    }

    if (!responseData.payload) {
      return res.status(500).json({ error: 'Invalid response from Pesepay gateway.' });
    }

    // Decrypt response payload
    const decryptedPayload = JSON.parse(payloadDecrypt(responseData.payload, encryptionKey));

    return res.status(200).json({
      success: true,
      simulation: false,
      redirectUrl: decryptedPayload.redirectUrl,
      referenceNumber: decryptedPayload.referenceNumber
    });

  } catch (error) {
    console.error("Pesepay initiation error:", error);
    return res.status(500).json({
      error: "Failed to initiate payment on Pesepay gateway",
      details: error.message
    });
  }
}

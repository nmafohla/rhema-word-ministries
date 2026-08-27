import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

function payloadDecrypt(payload, encryptionKey) {
  const iv = Buffer.from(encryptionKey.substring(0, 16), 'utf8');
  const keyBuffer = Buffer.from(encryptionKey, 'utf8');
  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  return decipher.update(payload, 'base64', 'utf8') + decipher.final('utf8');
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { referenceNumber } = req.query;

  if (!referenceNumber) {
    return res.status(400).json({ error: 'Missing referenceNumber parameter' });
  }

  // Handle simulation references
  if (referenceNumber.startsWith('PESE-MOCK-')) {
    return res.status(200).json({
      success: true,
      simulation: true,
      transactionStatus: 'PAID',
      message: 'Simulated payment transaction marked as PAID.'
    });
  }

  const integrationKey = process.env.PESEPAY_INTEGRATION_KEY;
  const encryptionKey = process.env.PESEPAY_ENCRYPTION_KEY;
  const isProduction = process.env.PESEPAY_ENVIRONMENT === 'production';

  if (!integrationKey || !encryptionKey) {
    return res.status(400).json({
      error: 'Pesepay API credentials not set. Unable to check status of live reference.'
    });
  }

  const baseUrl = isProduction 
    ? 'https://api.pesepay.com/api/payments-engine'
    : 'https://api.test.sandbox.pesepay.com/payments-engine';

  const checkUrl = `${baseUrl}/v1/payments/check-payment?referenceNumber=${referenceNumber}`;

  try {
    // Call Pesepay API directly
    const apiResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'key': integrationKey,
        'Content-Type': 'application/json'
      }
    });

    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({
        error: responseData.message || 'Error communicating with Pesepay verification API.'
      });
    }

    if (!responseData.payload) {
      return res.status(500).json({ error: 'Invalid response from Pesepay status checker.' });
    }

    // Decrypt status payload
    const decryptedPayload = JSON.parse(payloadDecrypt(responseData.payload, encryptionKey));

    return res.status(200).json({
      success: true,
      simulation: false,
      transactionStatus: decryptedPayload.transactionStatus, // e.g., PAID, FAILED, INITIATED
      referenceNumber: decryptedPayload.referenceNumber
    });

  } catch (error) {
    console.error("Pesepay status check error:", error);
    return res.status(500).json({
      error: "Failed to verify transaction status on Pesepay",
      details: error.message
    });
  }
}

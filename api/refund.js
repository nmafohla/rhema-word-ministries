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

  const { transactionId, amount, email, donorName } = req.body;

  if (!transactionId || !amount || !email) {
    return res.status(400).json({ error: 'Missing required parameters: transactionId, amount, and email' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
      <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Refund Processed</h2>
      <p>Dear ${donorName || 'Anonymous Partner'},</p>
      <p>This email confirms that a refund has been successfully initiated for your donation to Rhema Word Ministries.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Transaction Reference:</strong> ${transactionId}</p>
        <p style="margin: 5px 0;"><strong>Refund Amount:</strong> USD $${parseFloat(amount).toFixed(2)}</p>
        <p style="margin: 5px 0;"><strong>Status:</strong> Approved & Dispatched</p>
      </div>
      <p>Please note that it may take 2 to 5 business days for this amount to reflect back in your mobile wallet (EcoCash/OneMoney) or credit card account.</p>
      <p>If you have any questions or did not authorize this request, please contact our support office immediately at <a href="mailto:info@rhemawordministries.com">info@rhemawordministries.com</a>.</p>
      <p style="margin-top: 30px; font-size: 0.9em; color: #555;">Thank you and God bless you.</p>
      <p style="font-weight: bold; color: #111;">Rhema Word Ministries Zimbabwe Administration</p>
    </div>
  `;

  // Fallback: Simulation Mode if Resend API key is not set
  if (!resendApiKey) {
    console.log("=========================================");
    console.log("SIMULATING EMAIL DISPATCH (RESEND_API_KEY NOT DEFINED)");
    console.log(`To: ${email}`);
    console.log(`Subject: Donation Refund Approved - Rhema Word Ministries`);
    console.log(`Body:\n${emailHtml.replace(/<[^>]*>/g, '')}`);
    console.log("=========================================");

    return res.status(200).json({
      success: true,
      emailSent: false,
      simulation: true,
      message: "Refund processed successfully. Email logged to console (Simulation Mode)."
    });
  }

  try {
    // Send email using Resend API directly via fetch
    const mailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Rhema Word Ministries <onboarding@resend.dev>', // Resend default sending domain sandbox address
        to: email,
        subject: 'Donation Refund Processed - Rhema Word Ministries',
        html: emailHtml
      })
    });

    const mailData = await mailResponse.json();

    if (!mailResponse.ok) {
      console.error("Resend API Error:", mailData);
      return res.status(mailResponse.status).json({
        error: mailData.message || 'Failed to dispatch email via Resend API.'
      });
    }

    return res.status(200).json({
      success: true,
      emailSent: true,
      simulation: false,
      message: "Refund processed successfully. Notification email dispatched via Resend."
    });

  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      error: "Failed to dispatch email notification",
      details: error.message
    });
  }
}

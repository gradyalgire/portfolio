const emailjs = require('@emailjs/nodejs');

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  if (!data.name || !data.email || !data.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing fields' }),
    };
  }

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        user_name: data.name,
        user_email: data.email,
        message: data.message,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

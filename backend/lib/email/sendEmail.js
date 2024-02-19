const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

module.exports = async (email, subject, bodyHtml) => {
  const sesClient = new SESClient({
    region: process.env.EMAIL_AWS_REGION,
    credentials: {
      accessKeyId: process.env.EMAIL_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.EMAIL_AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: bodyHtml,
        },
      },
      Subject: { Data: subject },
    },
    Source: process.env.EMAIL_FROM_EMAIL_ADDRESS,
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log('Email sent! Message ID:', data.MessageId);
  } catch (err) {
    console.error('Failed to send email.', err);
  }
};

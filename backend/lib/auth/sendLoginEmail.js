const sendEmail = require('../email/sendEmail');
const createLoginToken = require('./createLoginToken');

module.exports = async (knex, res, email) => {
  const user = await knex('users')
    .select('id', 'email')
    .where('email', email)
    .first();

  if (user) {
    const token = await createLoginToken(knex, user.id);
    const loginUrl = `${process.env.WEBSITE_BASE_URL}/login?token=${token}`;

    const bodyHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Culture Catchup Login</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 40px;
                background-color: #f4f4f4;
                color: #333;
                line-height: 1.6;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: inline-block;
                background-color: gray;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Welcome back to Culture Catchup!</h2>
            <p>To log in to your account, please click the button below:</p>
            <a href="${loginUrl}" class="button">Click here to login</a>
        </div>
    </body>
    </html>
    `;

    await sendEmail(email, 'Culture Catchup Login Link', bodyHtml);
    res.status(200).send('Email sent');
  } else {
    res.status(404).send('User not found');
  }
};

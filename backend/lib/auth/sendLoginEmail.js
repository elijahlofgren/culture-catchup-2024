const sendEmail = require('../email/sendEmail');

module.exports = async (knex, res, email) => {
  const user = await knex('users')
    .select('email')
    .where('email', email)
    .first();

  if (user) {
    await sendEmail(email);
  } else {
    res.status(404).send('User not found');
  }
};

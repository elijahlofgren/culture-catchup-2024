const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(48).toString('hex');
}

module.exports = async (knex, userId) => {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes from now

  await knex('user_passwordless_logins').insert({
    user_id: userId,
    token: token,
    expires_at: expiresAt,
  });

  return token;
};

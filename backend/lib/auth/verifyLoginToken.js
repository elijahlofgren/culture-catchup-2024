module.exports = async (token) => {
  const tokenInfo = await knex('passwordless_logins')
    .select('user_id')
    .where({
      token: token,
      expires_at: { '>': knex.fn.now() },
      used: false, // Check if the token hasn't been used yet
    })
    .first();

  if (tokenInfo) {
    // Token is valid, so mark it as used
    await knex('passwordless_logins')
      .where({ token: token })
      .update({ used: true });

    return { valid: true, userId: tokenInfo.user_id };
  } else {
    return { valid: false };
  }
};

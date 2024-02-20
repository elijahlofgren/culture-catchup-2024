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

    // Generate a JWT for the user
    const userJwt = jwt.sign(
      {
        userId: tokenInfo.user_id,
      },
      process.env.LOGIN_JWT_SECRET_KEY,
      {
        // Expires in 1 hour
        expiresIn: '1h',
      }
    );
    return { valid: true, userId: tokenInfo.user_id, jwt: userJwt };
  } else {
    return { valid: false };
  }
};

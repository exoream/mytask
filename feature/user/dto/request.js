function userRequest(body) {
  const { name, email, password } = body;
  return { name, email, password };
}

module.exports = { userRequest };

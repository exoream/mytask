function userResponse(res, user) {
  const { id, name, email } = user;
  return res.status(200).json({ id, name, email });
}

function userListResponse(res, userList) {
  return res.status(200).json(
    userList.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }))
  );
}

function loginResponse(res, user, token) {
  const response = {
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  };
  return res.status(200).json(response);
}

module.exports = { userResponse, userListResponse, loginResponse};

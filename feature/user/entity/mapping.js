const UserCore = require("../entity/entity");
const User = require("../model/model");

// Mapping dari Main ke Model
function usersCoreToUsersModel(mainData) {
  return {
    id: mainData.id,
    name: mainData.name,
    email: mainData.email,
    password: mainData.password,
    role: mainData.role,
  };
}

function listUserCoreToUserModel(mainData) {
  const listUser = [];
  for (const user of mainData) {
    const userModel = usersCoreToUsersModel(user);
    listUser.push(userModel);
  }
  return listUser;
}

// Mapping dari Model ke Main
function usersModelToUsersCore(mainData) {
  const userCore = new UserCore(
    mainData.id,
    mainData.name,
    mainData.email,
    mainData.password,
    mainData.role
  );
  return userCore;
}

// Mapping dari Model ke Main untuk array
function listUserModelToUserCore(mainData) {
  const listUser = [];
  for (const user of mainData) {
    const userCore = usersModelToUsersCore(user);
    listUser.push(userCore);
  }
  return listUser;
}



module.exports = {
  usersCoreToUsersModel,
  listUserCoreToUserModel,
  usersModelToUsersCore,
  listUserModelToUserCore,
};

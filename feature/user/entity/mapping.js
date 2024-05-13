const UserCore = require("../entity/entity");
const User = require("../model/model");

// Mapping dari Main ke Model
function mapMainToModel(mainData) {
  return User.build({
    id: mainData.id,
    name: mainData.name,
    email: mainData.email,
    password: mainData.password,
    role: mainData.role,
  });
}

// Mapping dari Model ke Main
function mapModelToMain(modelData) {
  return new UserCore(
    modelData.id,
    modelData.name,
    modelData.email,
    modelData.password,
    modelData.role
  );
}

// Mapping dari Model ke Main untuk array
function modelToMainMapping(dataModel) {
    return dataModel.map((value) => {
        return mapModelToMain(value);
    });
}



module.exports = { mapMainToModel, mapModelToMain, modelToMainMapping };

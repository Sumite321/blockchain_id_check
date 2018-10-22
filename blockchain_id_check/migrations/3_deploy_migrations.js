var UserID = artifacts.require("./UserID.sol");

module.exports = function(deployer) {
  deployer.deploy(UserID);
};

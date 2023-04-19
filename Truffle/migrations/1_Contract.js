var Contract = artifacts.require("./Contract.sol");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(Contract);
};
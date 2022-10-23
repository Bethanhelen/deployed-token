const hre = require("hardhat");

async function main() {
  const TyToken = await hre.ethers.getContractFactory("TyToken");
  const tyToken = await TyToken.deploy(1000000);

  await tyToken.deployed();

  console.log("Ty Token deployed: ", tyToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
import hre from "hardhat";

async function main() {
  const FakeAccountRegistry = await hre.ethers.getContractFactory("FakeAccountRegistry");
  const contract = await FakeAccountRegistry.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`FakeAccountRegistry contract deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

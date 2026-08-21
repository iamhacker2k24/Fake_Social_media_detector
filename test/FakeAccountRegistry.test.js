import { expect } from "chai";
import hre from "hardhat";

describe("FakeAccountRegistry Contract Unit Tests", function () {
  let contract;
  let owner;
  let unauthorizedAccount;

  const sampleScanId = "SCAN-987654";
  const samplePlatform = "instagram";
  const sampleAccountHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("account_therock"));
  const sampleEvidenceHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("evidence_payload_data"));
  const sampleRiskScore = 78;

  beforeEach(async function () {
    [owner, unauthorizedAccount] = await hre.ethers.getSigners();
    const Factory = await hre.ethers.getContractFactory("FakeAccountRegistry");
    contract = await Factory.deploy();
    await contract.waitForDeployment();
  });

  it("1. Should deploy contract and assign correct owner", async function () {
    expect(await contract.owner()).to.equal(owner.address);
  });

  it("2 & 10. Should register account and emit AccountRegistered event", async function () {
    await expect(
      contract.registerAccount(
        sampleScanId,
        samplePlatform,
        sampleAccountHash,
        sampleEvidenceHash,
        sampleRiskScore
      )
    )
      .to.emit(contract, "AccountRegistered")
      .withArgs(
        sampleScanId,
        samplePlatform,
        sampleAccountHash,
        sampleEvidenceHash,
        sampleRiskScore,
        await hre.ethers.provider.getBlock("latest").then((b) => b.timestamp + 1),
        owner.address
      );
  });

  it("3, 11 & 12. Should retrieve registered account details", async function () {
    await contract.registerAccount(
      sampleScanId,
      samplePlatform,
      sampleAccountHash,
      sampleEvidenceHash,
      sampleRiskScore
    );

    const record = await contract.getAccount(sampleScanId);
    expect(record.accountHash).to.equal(sampleAccountHash);
    expect(record.evidenceHash).to.equal(sampleEvidenceHash);
    expect(record.riskScore).to.equal(sampleRiskScore);
    expect(record.submittedBy).to.equal(owner.address);
    expect(record.platform).to.equal(samplePlatform);
    expect(record.exists).to.be.true;
    expect(record.timestamp).to.be.above(0);
  });

  it("4 & 5. Should verify correct and incorrect evidence hashes", async function () {
    await contract.registerAccount(
      sampleScanId,
      samplePlatform,
      sampleAccountHash,
      sampleEvidenceHash,
      sampleRiskScore
    );

    const isMatch = await contract.verifyEvidence(sampleScanId, sampleEvidenceHash);
    expect(isMatch).to.be.true;

    const tamperedHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("tampered_fake_data"));
    const isTamperedMatch = await contract.verifyEvidence(sampleScanId, tamperedHash);
    expect(isTamperedMatch).to.be.false;
  });

  it("6. Should prevent duplicate scanId registration", async function () {
    await contract.registerAccount(
      sampleScanId,
      samplePlatform,
      sampleAccountHash,
      sampleEvidenceHash,
      sampleRiskScore
    );

    await expect(
      contract.registerAccount(
        sampleScanId,
        samplePlatform,
        sampleAccountHash,
        sampleEvidenceHash,
        sampleRiskScore
      )
    ).to.be.revertedWith("Investigation scanId already registered");
  });

  it("7. Should prevent unauthorized registration", async function () {
    await expect(
      contract.connect(unauthorizedAccount).registerAccount(
        sampleScanId,
        samplePlatform,
        sampleAccountHash,
        sampleEvidenceHash,
        sampleRiskScore
      )
    ).to.be.revertedWith("Caller is not the authorized backend owner");
  });

  it("8 & 10. Should update risk score from authorized owner and emit event", async function () {
    await contract.registerAccount(
      sampleScanId,
      samplePlatform,
      sampleAccountHash,
      sampleEvidenceHash,
      sampleRiskScore
    );

    const newRiskScore = 92;
    await expect(contract.updateRiskScore(sampleScanId, newRiskScore))
      .to.emit(contract, "RiskScoreUpdated")
      .withArgs(
        sampleScanId,
        sampleRiskScore,
        newRiskScore,
        await hre.ethers.provider.getBlock("latest").then((b) => b.timestamp + 1),
        owner.address
      );

    const updatedRecord = await contract.getAccount(sampleScanId);
    expect(updatedRecord.riskScore).to.equal(newRiskScore);
    expect(updatedRecord.evidenceHash).to.equal(sampleEvidenceHash);
  });

  it("9. Should prevent unauthorized risk score update", async function () {
    await contract.registerAccount(
      sampleScanId,
      samplePlatform,
      sampleAccountHash,
      sampleEvidenceHash,
      sampleRiskScore
    );

    await expect(
      contract.connect(unauthorizedAccount).updateRiskScore(sampleScanId, 99)
    ).to.be.revertedWith("Caller is not the authorized backend owner");
  });
});

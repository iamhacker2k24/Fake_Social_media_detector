// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FakeAccountRegistry {
    address public owner;

    struct AccountRecord {
        bytes32 accountHash;
        bytes32 evidenceHash;
        uint256 riskScore;
        uint256 timestamp;
        address submittedBy;
        string platform;
        bool exists;
    }

    mapping(string => AccountRecord) private _records;

    event AccountRegistered(
        string indexed scanId,
        string platform,
        bytes32 accountHash,
        bytes32 evidenceHash,
        uint256 riskScore,
        uint256 timestamp,
        address indexed submittedBy
    );

    event RiskScoreUpdated(
        string indexed scanId,
        uint256 oldRiskScore,
        uint256 newRiskScore,
        uint256 timestamp,
        address indexed updatedBy
    );

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the authorized backend owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function registerAccount(
        string calldata scanId,
        string calldata platform,
        bytes32 accountHash,
        bytes32 evidenceHash,
        uint256 riskScore
    ) external onlyOwner {
        require(bytes(scanId).length > 0, "Scan ID cannot be empty");
        require(!_records[scanId].exists, "Investigation scanId already registered");
        require(accountHash != bytes32(0), "Account hash cannot be zero");
        require(evidenceHash != bytes32(0), "Evidence hash cannot be zero");

        _records[scanId] = AccountRecord({
            accountHash: accountHash,
            evidenceHash: evidenceHash,
            riskScore: riskScore,
            timestamp: block.timestamp,
            submittedBy: msg.sender,
            platform: platform,
            exists: true
        });

        emit AccountRegistered(
            scanId,
            platform,
            accountHash,
            evidenceHash,
            riskScore,
            block.timestamp,
            msg.sender
        );
    }

    function getAccount(string calldata scanId)
        external
        view
        returns (
            bytes32 accountHash,
            bytes32 evidenceHash,
            uint256 riskScore,
            uint256 timestamp,
            address submittedBy,
            string memory platform,
            bool exists
        )
    {
        AccountRecord memory record = _records[scanId];
        require(record.exists, "Record does not exist");
        return (
            record.accountHash,
            record.evidenceHash,
            record.riskScore,
            record.timestamp,
            record.submittedBy,
            record.platform,
            record.exists
        );
    }

    function verifyEvidence(string calldata scanId, bytes32 suppliedEvidenceHash)
        external
        view
        returns (bool)
    {
        AccountRecord memory record = _records[scanId];
        if (!record.exists) {
            return false;
        }
        return record.evidenceHash == suppliedEvidenceHash;
    }

    function updateRiskScore(string calldata scanId, uint256 newRiskScore)
        external
        onlyOwner
    {
        AccountRecord storage record = _records[scanId];
        require(record.exists, "Record does not exist");

        uint256 oldScore = record.riskScore;
        record.riskScore = newRiskScore;

        emit RiskScoreUpdated(scanId, oldScore, newRiskScore, block.timestamp, msg.sender);
    }
}

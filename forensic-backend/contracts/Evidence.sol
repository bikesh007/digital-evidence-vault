// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract EvidenceChain {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    enum Role {
        NONE,
        INVESTIGATOR,
        ANALYST,
        COURT
    }

    mapping(address => Role)
    public roles;

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Only admin"
        );
        _;
    }

    modifier onlyAuthorized() {
        require(
            roles[msg.sender] != Role.NONE,
            "Unauthorized"
        );
        _;
    }

    struct Evidence {

        uint id;

        string sha256Hash;

        string ipfsHash;

        string metadataHash;

        address uploadedBy;

        uint timestamp;
    }

    uint public evidenceCount;

    mapping(uint => Evidence)
    public evidences;

    event EvidenceStored(
        uint id,
        string sha256Hash,
        string ipfsHash,
        address uploadedBy
    );

    function assignRole(
        address user,
        Role role
    )
    public onlyAdmin {

        roles[user] = role;
    }

    function storeEvidence(
        string memory _sha256Hash,
        string memory _ipfsHash,
        string memory _metadataHash
    )
    public onlyAuthorized {

        evidenceCount++;

        evidences[evidenceCount] =
        Evidence(
            evidenceCount,
            _sha256Hash,
            _ipfsHash,
            _metadataHash,
            msg.sender,
            block.timestamp
        );

        emit EvidenceStored(
            evidenceCount,
            _sha256Hash,
            _ipfsHash,
            msg.sender
        );
    }
}
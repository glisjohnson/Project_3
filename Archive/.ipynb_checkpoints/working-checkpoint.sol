// "SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.8.0;

contract Voting {
    mapping (string => uint8) public votesReceived;
    string[] public getcandidatelist;

    constructor(string[] memory candidateNames) {
        getcandidatelist = candidateNames;
    }

    function voteForCandidate(string memory candidate) public {
        require(validCandidate(candidate), "Invalid candidate");
        votesReceived[candidate] += 1;
    }

    function totalVotesFor(string memory candidate) public view returns (uint8) {
        require(validCandidate(candidate), "Invalid candidate");
        return votesReceived[candidate];
    }

    function validCandidate(string memory candidate) public view returns (bool) {
        for (uint i = 0; i < getcandidatelist.length; i++) {
            if (keccak256(bytes(getcandidatelist[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }
}

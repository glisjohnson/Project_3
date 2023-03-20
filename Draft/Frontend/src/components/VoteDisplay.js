import React, { useState, useEffect, Fragment } from "react";
import {
  useEthers,
  useContractFunction,
  useContractMethod
} from "@usedapp/core";
import { abi } from "../compiled/ballot_abi.json";
import { ethers, utils } from "ethers";
require("dotenv").config();

const VoteDisplay = () => {
  // const { account, activateBrowserWallet } = useEthers();
  // const [signer, setSigner] = useState(undefined);
  // const [isConnected, setIsConnected] = useState(false);

  const contractAddress = "0x76cbB9289CdAeBa85Cc2bce0C82783ea8c5ca528";

  const [proposalIndex, setProposalIndex] = useState("Bitcoin");
  const { account, library } = useEthers();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);

  // const contractAddress = "0x194f514f7FA8eabbF26E13B52C6dF9E011689212";
  const contract_abi = abi;

  useEffect(() => {
    async function fetchProposals() {
      try {
        const contract = new ethers.Contract(
          contractAddress,
          contract_abi,
          library
        );
        console.log("contract:", contract);
        const proposals = await contract.getProposals();
        setProposals(proposals);
        console.log(proposals);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProposals();
  }, [library]);

  if (loading) {
    return <div>Loading proposals...</div>;
  }

  // if (error) {
  //   return <div>Error loading proposals: {error.message}</div>;
  // }

  async function vote() {
    try {
      setLoading2(true);
      const contract = new ethers.Contract(
        contractAddress,
        contract_abi,
        library.getSigner()
      );
      const proposalId = proposals.findIndex((p) => p === proposalIndex);
      // if (proposalId < 0) {
      //   proposalId = 0; // Assume the selected proposal is the first one in the list
      // }
      console.log(proposalId);
      const tx = await contract.vote(proposalId, { gasLimit: 300000 });
      await tx.wait();
      setLoading2(false);
      alert("Vote submitted!");
    } catch (error) {
      setLoading2(false);
      if (error.message.includes("Already voted.")) {
        alert("you have already voted");
        setError2("Already Voted");
      } else if (error.message.includes("Has no right to vote")) {
        alert("You Have No access to Vote");
        setError2("You Have No access to Vote");
      } else {
        setError2(error);
      }
    }
  }

  return (
    <div className="vote-display">
      {account ? (
        <>
          <h3>Cast your Vote</h3> <br />
          <p>which coin do you think is worth investing in?</p>
          <select
            name="proposals"
            id="proposals"
            value={proposalIndex}
            onChange={(e) => setProposalIndex(e.target.value)}
          >
            {proposals.map((proposal, index) => (
              <option key={index} value={proposal}>
                {proposal}
              </option>
            ))}
          </select>
          <br />
          <button onClick={() => vote()} className="btn">
            Vote
          </button>
          {loading2 && <p>Loading ...</p>}
          {error2 && <p>{error2}</p>}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default VoteDisplay;

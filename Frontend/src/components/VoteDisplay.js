import React, { useState, useEffect, Fragment } from "react";
import {
  useEthers,
  useContractFunction,
  useContractMethod
} from "@usedapp/core";
import { abi } from "../compiled/ballot_abi.json";
import { ethers, utils } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const VoteDisplay = () => {
  const contractAddress = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;
  // const contractAddress = "0x46Cbd54ef91AC4e2bA5602a338D795Dd37E808d5";
  console.log(contractAddress);

  const [proposalIndex, setProposalIndex] = useState("Bitcoin");
  const { account, library } = useEthers();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [admin, setAdmin] = useState("");

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
        const admin = await contract.chairperson();
        setAdmin(admin);
        console.log(admin);
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

  async function vote() {
    try {
      setLoading2(true);
      const contract = new ethers.Contract(
        contractAddress,
        contract_abi,
        library.getSigner()
      );
      const proposalId = proposals.findIndex((p) => p === proposalIndex);

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
      {account && account !== admin ? (
        <>
          <h3>Cast your Vote</h3> <br />
          <p>Which proposal do you think we should implement ?</p>
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

import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { abi } from "../compiled/ballot_abi.json";

const Admin = () => {
  const { account, library } = useEthers();
  const [voterAddress, setVoterAddress] = useState("");
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);
  const [winningProposal, setWinningProposal] = useState("");
  const [proposalVoteCounts, setProposalVoteCounts] = useState([]);
  const [admin, setAdmin] = useState("");

  const contractAddress = "0x76cbB9289CdAeBa85Cc2bce0C82783ea8c5ca528";
  const contract_abi = abi;

  let contract = null;
  if (library) {
    contract = new ethers.Contract(
      contractAddress,
      contract_abi,
      library.getSigner()
    );
  }

  async function handleGiveRightToVote() {
    try {
      setLoading(true);
      const tx = await contract.giveRightToVote(voterAddress);
      await tx.wait();
      setLoading(false);
      alert("Right to vote given!");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  async function handleTallyVotes() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    const winningProposal = await contract.winningProposal();
    setWinningProposal(winningProposal.toString());

    const numProposals = await contract.numProposals();
    const counts = [];
    for (let i = 0; i < numProposals; i++) {
      const count = await contract.proposalVoteCounts(i);
      counts.push(count.toString());
    }
    setProposalVoteCounts(counts);
  }

  useEffect(() => {
    async function getAdmin() {
      try {
        const contract = new ethers.Contract(
          contractAddress,
          contract_abi,
          library
        );
        console.log(contract);
        const admin = await contract.chairperson();
        setAdmin(admin);
        const proposals = await contract.getProposals();
        setProposals(proposals);
        setLoading2(false);
      } catch (error) {
        setError2(error);
        setLoading2(false);
      }
    }

    getAdmin();
  }, [library]);

  return (
    <div>
      {account && account == admin ? (
        <>
          <h2>Give Right To Vote</h2>
          <input
            type="text"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            placeholder="Enter the voter's address"
          />
          <button onClick={handleGiveRightToVote}>Give Right To Vote</button>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}

          <div>
            <h2>Tally Votes</h2>
            <button onClick={handleTallyVotes}>Tally Votes</button>
            {winningProposal && (
              <p>The winning vote is: {proposals[winningProposal]}</p>
            )}
            {proposalVoteCounts.length > 0 && (
              <ul>
                {proposalVoteCounts.map((count, index) => (
                  <li key={index}>
                    {proposals[index]}: {count} votes
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Admin;

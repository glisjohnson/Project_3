import { useEffect, useState } from "react";
import {
  DAppProvider,
  Rinkeby,
  Kovan,
  Mainnet,
  Localhost,
  multicall,
  useEthers
} from "@usedapp/core";
import { ethers, utils } from "ethers";
import { abi } from "./compiled/ballot_abi.json";
import "./App.css";

import Wallet from "./components/Wallet";
import Header from "./components/Header";
import AcountInfo from "./components/AcountInfo";
import VoteDisplay from "./components/VoteDisplay";
import Admin from "./components/Admin";

function App() {
  const config = {
    multicallAddresses: ["0x729c03D40060a3f2560001fEB1F2Cf939d527027"],
    readOnlyChainId: Localhost.chainId,
    readOnlyUrls: {
      [Localhost.chainId]: "http://127.0.0.1:7545"
    }
    // multicallAddresses: ["0x194f514f7FA8eabbF26E13B52C6dF9E011689212"]
    // notifications: {
    //   expirationPeriod: 1000, //milliseconds
    //   checkInterval: 1000 // milliseconds
    // }
  };
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const adminAccount = "0x23c35233bd6F73aCF9F8959Cb279f71A7201C79d";

  // const [proposals, setProposals] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { library } = useEthers();

  // const contractAddress = "0x678D88033488C06F5B2408060aC08b2FEEdE4115";
  // const contract_abi = abi;

  // useEffect(() => {
  //   async function fetchProposals() {
  //     try {
  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         contract_abi,
  //         library
  //       );
  //       const proposals = await contract.getProposals();
  //       setProposals(proposals);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   }

  //   fetchProposals();
  // }, [library]);

  // if (loading) {
  //   return <div>Loading proposals...</div>;
  // }

  // if (error) {
  //   return <div>Error loading proposals: {error.message}</div>;
  // }
  // const [hasMetamask, setHasMetamask] = useState(false);
  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     setHasMetamask(true);
  //   }
  // });

  return (
    <DAppProvider config={config}>
      {/* {hasMetamask ? ( */}
      <div className="App">
        <Header />
        <AcountInfo />
        <VoteDisplay
        // proposals={proposals} setProposals={setProposals}
        />
        <Admin />
      </div>
      {/* ) : (
        ""
      )} */}
    </DAppProvider>
  );
}

export default App;

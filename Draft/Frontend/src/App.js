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
import dotenv from "dotenv";
dotenv.config();

function App() {
  const config = {
    multicallAddresses: {
      1337: "0xe3Ec387867C0Dd993612d3bA17c5DF8Fd81D7626"
    },
    readOnlyChainId: Localhost.chainId,
    readOnlyUrls: {
      [Localhost.chainId]: "http://127.0.0.1:7545"
    }
  };
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const adminAccount = "0x23c35233bd6F73aCF9F8959Cb279f71A7201C79d";

  console.log(account);

  return (
    <DAppProvider config={config}>
      <div className="App">
        <Header />
        <AcountInfo />
        <VoteDisplay />
        <Admin />
      </div>
    </DAppProvider>
  );
}

export default App;

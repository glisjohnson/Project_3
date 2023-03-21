import React from "react";
import { useEthers, Localhost } from "@usedapp/core";
import Wallet from "./Wallet";

const Header = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const adminAccount = "0xd50e8dB72E7045277EBae3819EFa094C60883CFd";
  console.log(account);

  return (
    <div>
      <header className="App-header">
        <h1>Voting System</h1>
        <div className="prompt-header">
          {account == adminAccount && <h3>adminstrator</h3>}
          <Wallet />
        </div>
      </header>
    </div>
  );
};

export default Header;

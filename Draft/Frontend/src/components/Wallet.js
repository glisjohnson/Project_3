import React from "react";
import { useEthers, useEtherBalance, Localhost } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const changeBackground = (e) => {
  e.target.style.background = "chocolate";
};
const resetBackground = (e) => {
  e.target.style.background = "antiquewhite";
};

const Wallet = () => {
  const { activateBrowserWallet, account, deactivate, active } = useEthers();

  const ConnectButton = () => (
    <div>
      <button className="btn" onClick={() => activateBrowserWallet()}>
        Connect
      </button>
    </div>
  );

  return (
    <div>
      {!account && <ConnectButton />}
      {account && <button onClick={deactivate}>Disconnect</button>}
    </div>
  );
};

export default Wallet;

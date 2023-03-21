import React from "react";
import {
  useEthers,
  useEtherBalance,
  Localhost,
  useMulticallAddress
} from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const changeBackground = (e) => {
  e.target.style.background = "chocolate";
};
const resetBackground = (e) => {
  e.target.style.background = "antiquewhite";
};

const AcountInfo = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const localBalance = useEtherBalance(account, { chainId: 1337 });
  console.log(account);
  console.log(Localhost.chainId);
  console.log(localBalance);
  return (
    <div className="bal">
      {account ? (
        <>
          <p>Your account : {account}</p>
          {localBalance && (
            <>
              <h4>Account Balance</h4>
              {formatEther(localBalance)}
            </>
          )}
          <hr />
        </>
      ) : (
        <h2>
          Please connect wallet... <br />
        </h2>
      )}
    </div>
  );
};

export default AcountInfo;

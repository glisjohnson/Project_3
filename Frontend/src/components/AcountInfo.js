import React from "react";
import { useEthers, useEtherBalance, Localhost } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

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
          <h4>
            Your account : <h6>{account}</h6>
          </h4>
          {localBalance && (
            <>
              <h4>Account Balance</h4>
              {formatEther(localBalance)}
            </>
          )}
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

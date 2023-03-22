# Voting System

Stark Industries hosts weekly competitions for its employees, where they present proposals on new inventions and vote for their favorites. The winner receives a bonus. Recently, an employee has won 17 consecutive weeks, raising concerns about potential cheating in the voting process. Stark Industries has tried various methods to prevent this, including anonymizing names, but the issue persists. The company reached out to us to help develop a secure, transparent, and tamper-proof voting system using blockchain technology.

Objective:
The objective of the project is to design and implement a blockchain-based voting system to ensure fairness, transparency, and security in Stark Industries' weekly competitions. The system should prevent potential vote manipulation and provide a reliable way to determine the winner.
Solution:
We developed a smart contract called "Ballot" using Solidity, which runs on the Ethereum blockchain. The "Ballot" smart contract includes the following key features:

    Initialization: The contract is deployed with a list of proposal names, and the creator of the contract becomes the chairperson.

    Voting Rights: The chairperson has the authority to grant voting rights to eligible voters. Voters can only vote once, and their voting power (weight) is initially set to 1.

    Voting Process: Voters directly cast their votes for a proposal. As votes are cast, the vote counts for each proposal are updated transparently on the blockchain.

    Determining the Winner: The smart contract calculates the winning proposal based on the highest vote count. The name of the winning proposal can be retrieved from the contract.

The "Ballot" smart contract leverages the immutability, decentralized nature, and strict voting privileges of the Ethereum blockchain to ensure a fair, transparent, and secure voting process.

Implementation and Deployment:
To implement and deploy the smart contract, we used Remix, an online Solidity IDE, and MetaMask, a browser extension for managing Ethereum accounts. The smart contract was tested on a local Ethereum test network before being deployed to the main Ethereum network.

![GitHub last commit](https://img.shields.io/github/last-commit/glisjohnson/Project_3) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/glisjohnson/Project_3) ![GitHub watchers](https://img.shields.io/github/watchers/glisjohnson/Project_3?label=Watch&style=social) ![GitHub top language](https://img.shields.io/github/languages/top/glisjohnson/Project_3) ![GitHub license](https://img.shields.io/badge/license-MIT-blueyellow) <br>

## Table of Contents

1. [Project Links](#Project-Links)
1. [Report](#Report)
1. [Installation](#Installation)
1. [Contribution Guidelines](#Contribution-Guidelines)
1. [Project Team](#Project-Team)
1. [Installation](#nstallation)
1. [License](#License)
1. [Resources](#Resources)

## Project Links

[Repo Link](https://github.com/glisjohnson/Project_3) <br>

## Report

![Screen Shot](https://raw.githubusercontent.com/glisjohnson/Project_3/main/images/pro3_1.gif)

Conclusion:
The blockchain-based voting system designed for Stark Industries' weekly competitions provides a secure, transparent, and tamper-proof solution for the voting process. By utilizing the "Ballot" smart contract on the Ethereum blockchain, we addressed the company's concerns about potential cheating and ensured the integrity of the voting process. This system can be further adapted and scaled for various applications, such as elections, decision-making within organizations, or community governance.

## Installation

You will need to have node.js installed in your Terminal. As well as npm Packages: Express, Mongoose

Step 1. clone the repository

Step 2. Deploy the Ballot.sol contract on Remix or other IDE by providing array of proposals you wanna check

Step 3. connect you contract the frontend react app - Add the abi from your compiled contract and add it to ./Frontend/compiled/ballot_abi.json file - Create a .env file in the Frontend Folder with the deployed contract address and local provider url

```

- WEB3_PROVIDER_URI='<your local RPC server>'
- REACT_APP_SMART_CONTRACT_ADDRESS='<your smart contract Address>'

```

Step 4. Start the Front end react app (inside ./Frontend) - Run `npm install` - Run `npm start` to start the React app

## Contribution Guidelines:

```

Feel free to contribute to this repo by creating issues or sending an email to any of the contributors in the list below.

```

## Project Team

[Danny ndayisenga](https://github.com/dannynday) <br>
[Ethan Johnson](https://github.com/glisjohnson) <br>
[Eyob Abay](https://github.com/Dobinhom) <br>
[Robel Gebremeskel](https://github.com/robel-codes) <br>

## License

#### Distributed under the MIT License. See [Choose A License](https://choosealicense.com/) for more details.

## Resources

[Resources Connect Metamask to Ganache (localhost) for web3 development](https://www.youtube.com/watch?v=jLFXONkA4KM)

[Resources Connecting to smart contacts to metamask](https://www.youtube.com/watch?v=pdsYCkUWrgQ)

```

```

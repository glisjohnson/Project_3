import streamlit as st
from web3 import Web3

# Contract ABI (Application Binary Interface)
abi = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "candidateNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "voteForCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "getcandidatelist",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "totalVotesFor",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "validCandidate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "votesReceived",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

# Contract address on the Ethereum network
contract_address = "0x4a986432FEa7CB44430E3E65baD143fB963CbEEb"

# Connect to Ethereum network
w3 = Web3(Web3.HTTPProvider('WEB3_PROVIDER_URI'))

# Load the contract instance
contract = w3.eth.contract(address=contract_address, abi=abi)

# Get candidate list from the contract
candidate_list = [c.strip() for c in contract.functions.candidateList().call()]

# Streamlit app
st.title("Voting App")

# Display the candidate list
st.write("Candidates:")
for candidate in candidate_list:
    st.write("- " + candidate)

# User input to vote for a candidate
candidate_name = st.text_input("Enter the name of the candidate you want to vote for:")
if st.button("Vote"):
    # Call the voteForCandidate function on the contract
    contract.functions.voteForCandidate(candidate_name).transact()

# User input to check the total votes for a candidate
candidate_name2 = st.text_input("Enter the name of the candidate you want to check the votes for:")
if st.button("Check Votes"):
    # Call the totalVotesFor function on the contract
    total_votes = contract.functions.totalVotesFor(candidate_name2).call()
    st.write("Total votes for " + candidate_name2 + ": " + str(total_votes))
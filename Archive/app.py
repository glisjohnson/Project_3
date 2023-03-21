import os
import json
from web3 import Web3
from pathlib import Path
from dotenv import load_dotenv
import streamlit as st

load_dotenv()

# Define and connect a new Web3 provider
w3 = Web3(Web3.HTTPProvider(os.getenv("WEB3_PROVIDER_URI")))

################################################################################
# Contract Helper function:
# 1. Loads the contract once using cache
# 2. Connects to the contract using the contract address and ABI
################################################################################


# @st.cache(allow_output_mutation=True)
def load_contract():

    # Load the contract ABI
    with open(Path('./compiled/ballot_abi.json')) as f:
        contract_abi = json.load(f)

    # Set the contract address (this is the address of the deployed contract)
    contract_address = os.getenv("SMART_CONTRACT_ADDRESS")

    # Get the contract
    contract = w3.eth.contract(
        address=contract_address,
        abi=contract_abi
    )

    return contract


# Load the contract
ballot = load_contract()

# # Interact with the smart contract
# chairperson = ballot.functions.chairperson().call()
# print(f"The chairperson of the ballot is {chairperson}")

# voter = w3.eth.accounts[1]
# ballot.functions.giveRightToVote(voter).transact({"from": chairperson})
# weight = ballot.functions.voters(voter).call()["weight"]
# print(f"The weight of voter {voter} is {weight}")

# proposal = 1
# ballot.functions.vote(proposal).transact({"from": voter})
# winning_proposal = ballot.functions.winningProposal().call()
# winner_name = ballot.functions.winnerName().call()
# print(
#     f"The winning proposal is {winner_name} (proposal {winning_proposal + 1})")


st.title("Voting System")

# Display list of proposals
st.write("Proposals: Best Presentation")
proposals = ballot.functions.getProposals().call()
for i, proposal in enumerate(proposals):
    st.write(f"{i+1}. {proposal}")

# Get voter address
voter_address = st.text_input("Enter your address")

# Give the voter the right to vote
give_right_to_vote = st.button("Give Right to Vote")
if give_right_to_vote:
    tx_hash = ballot.functions.giveRightToVote(voter_address).transact()
    st.write(f"Transaction Hash: {tx_hash.hex()}")

# Delegate vote
delegate_to = st.text_input("Delegate your vote to (enter address)")
delegate_vote = st.button("Delegate Vote")
if delegate_vote:
    tx_hash = ballot.functions.delegate(delegate_to).transact()
    st.write(f"Transaction Hash: {tx_hash.hex()}")

# Vote for proposal
vote_for_proposal = st.selectbox("Vote for Proposal", proposals)
vote = st.button("Vote")
if vote:
    proposal_index = proposals.index(vote_for_proposal)
    tx_hash = ballot.functions.vote(proposal_index).transact()
    st.write(f"Transaction Hash: {tx_hash.hex()}")

# Get winner
winner = ballot.functions.winnerName().call()
st.write(f"Winner: {winner}")

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"decision","type":"bytes32"}],"name":"voteForDecision","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"decision","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"decision","type":"bytes32"}],"name":"validDecision","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"decisionList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"decisionNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xaeca8ed9f30f076b8409e649bcefc4014dd96194');
decisions = {"Rama": "decision-1", "Nick": "decision-2", "Jose": "decision-3"}

function voteForDecision(name) {
  // vote
  contractInstance.voteForDecision(name, {from: web3.eth.accounts[0]}, function() {
    // update the tally
    count = contractInstance.totalVotesFor.call(name).toString();
    $("#" + name).html(count);
    
    console.log(count);
    console.log('voted for '+ name);

  });
}

$(document).ready(function() {
  // Tally existing Votes
  decisionNames = Object.keys(decisions);
    decisionNames.forEach(function (Name) {
      // foreach decision, get the name and find the votes
      $("#" + Name).html(contractInstance.totalVotesFor.call(Name).toString());
    })
    

});
fs = require('fs');
solc = require('solc');
Web3 = require('web3');
// Run a node: embark simulator, test rpc, or geth;
// putting this contract into an embark app will compile it and load to the node;
// otherwise this script will compile and load the contract to the node.

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('Voting.sol').toString();
compiledCode = solc.compile(code);
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
VotingContract = web3.eth.contract(abiDefinition);
byteCode = compiledCode.contracts[':Voting'].bytecode;
deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
console.log(deployedContract);
contractInstance = VotingContract.at(deployedContract.address);
console.log('hello', deployedContract.address) 
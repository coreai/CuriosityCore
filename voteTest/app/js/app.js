
name = 'Rama';


Voting.methods.voteForDecision(name).send({from: web3.eth.defaultAccount}, function() {
    console.log('Voted for' + name);

});

vote = Voting.methods.totalVotesFor.call(name).toString().length;

console.log('vote');
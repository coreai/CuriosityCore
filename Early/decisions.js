// Decisions
// Vision

// when making decisions one must know how important they are
var decision = {
    importance: 0,
    votes = 0,
    time = importance + votes
}

votes = decision.votes

// Importance base
function importanceBase( gain ) {
    if (gain > 0)
        decision.importance + 1
        if (gain.profit > 0)
            decision.importance + 2
            if (gain.direction > 0)
                decision.importance + 3
}


// Increase importance for above average voting
function importanceVotes(votes) {
    numVotes = count(votes)
    averageVotes = math.avg(votes)
    
    if (numVotes > averageVotes)
        decision.importance + 1 
}



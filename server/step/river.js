const action=require('./action')


function river(arrPoker,io,playersPosition,playerList,finalPlayers,foldPlayers,lastBet){
    console.log('river')
    io.sockets.emit('river',{arrPoker:arrPoker})
    action(playerList,playersPosition,0,lastBet,6,finalPlayers,foldPlayers,io)
}


module.exports=river
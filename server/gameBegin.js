const Player=require('./model/player')

const myEmitter=require('./emitter')

function begin(){
    console.log('开始')
    let arr=[]//所有的牌
    let pokerArr=[]//打乱的牌
    for(let i=0;i<52;i++){
        arr.push(i)
    }
    for(let i=0;i<52;i++){
        pokerArr.push(arr.splice( Math.floor(Math.random()*arr.length),1)[0])
    }
    Player.find({readyFlag:true},(err,res)=>{
        if(err){
            console.log("Error:" + err)
        }else {
            let players=res
            players.sort((player1,player2)=>{
                return player1.seatNum-player2.seatNum
            })
            let personnalPoker=new Array(players.length)
            // 发底牌
            for(let i=0;i<players.length;i++){
                personnalPoker[i]={
                    seatNum:players[i].seatNum,
                    bottomPokers:pokerArr.splice(0,2)
                }
            }
            console.log('sendPersonnalPoker')
            console.log('personnalPoker:'+personnalPoker)
            myEmitter.emit('sendPersonnalPoker',{
                personnalPoker:personnalPoker
            })
            myEmitter.emit('perflop',{pokerArr:pokerArr})
        }
    })
            
}

module.exports=begin
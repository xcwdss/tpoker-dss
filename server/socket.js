const Message=require('./model/message')
const myEmitter=require('./emitter')
const Player=require('./model/player')



function socket(io,playerList,finalPlayers){
    // 给每个人发送个人底牌
    myEmitter.on('sendPersonnalPoker',(data)=>{
        console.log('emit sendPersonnalPoker')
        let personnalPokerTemp=data.personnalPoker
        myEmitter.emit('sendPP',{personnalPoker:personnalPokerTemp})
        playerList.map((userinfo)=>{
            let seatNum=userinfo.seatNum
            let socketId=userinfo.socketId
            let bottomPokers=personnalPokerTemp.filter((elem)=>{
                return elem.seatNum===seatNum
            })[0].bottomPokers
            if(io.sockets.connected[socketId]){
                io.sockets.connected[socketId].emit('bottomPokers',bottomPokers)
            }
        })
    })
    // 告诉所有玩家获取玩家列表
    myEmitter.on("getPlayers",()=>{
        io.sockets.emit("getPlayers")
    })
    // 向所有玩家发送这个座位的玩家信息
    myEmitter.on("sendMyInfo",(seatNum)=>{
        console.log('sendMyInfo')
        Player.findOne({seatNum:seatNum},(err,res)=>{
            if(err){
                console.log(err)
            }else{
                let playerInfo=res
                let socketId=''
                playerList.forEach((elem)=>{
                    // 获取该玩家的socketId
                    if(elem.seatNum===seatNum){
                        socketId=elem.socketId
                    }
                })
                if(playerInfo){
                    console.log('如果该玩家还在玩家列表')
                    io.sockets.emit('sendPlayerInfo',playerInfo)
                }else{
                    console.log('如果该玩家不在玩家列表')
                    io.sockets.emit('sendPlayerInfo',{seatNum:seatNum})
                }
            }
        })
    })
    // 当有一个新的页面登录 就会触发这个事件
    io.on('connection',function(socketIo){
        // 打开了一个新的游戏窗口
        console.log('有人进入游戏'+socketIo.id)
        // 监听客户端用户登录的事件=>添加到playerList中
        socketIo.on('addPlayer',(data)=>{
            let userinfo= {
                socketId:socketIo.id,
                seatNum:data.seatNum,
                socketIo:socketIo,
                betNum:0,
                username:data.username
            }
            // 
            if(playerList.length!==0){
                let existFlag=true //true表示该座位没人
                //如果该座位上有人 更新玩家信息
                playerList.forEach((elem)=>{
                    if(elem.seatNum===userinfo.seatNum){
                        console.log('该座位上有人')
                        // 排序出错
                        existFlag=false
                        elem.socketId=userinfo.socketId
                        // 更新玩家信息
                        elem.socketIo=userinfo.socketIo
                        elem.username=userinfo.username
                    }
                })
                if(existFlag){
                    playerList.push(userinfo)
                }
            }else{
                playerList.push(userinfo)
            }
            myEmitter.emit('sendMyInfo',data.seatNum)
        })

        // 
        socketIo.on('takingAction',(data)=>{
            let seatNum=data.seatNum
            socketIo.broadcast.emit('actionFlag',{
                seatNum:seatNum,
            })
        })
        socketIo.on('sendMessage',(clientMsg)=>{
            let username=clientMsg.username
            let msg=clientMsg.msg
            let message=new Message({
                username:username,
                msg:msg
            })
            message.save(function(err,res){
                if(err){
                    console.log('err:'+err)
                }else{
                    console.log('用户消息存入成功')
                    //广播除自己的所有人
                    socketIo.broadcast.emit('receiveMsgSuccess',{
                        username:username,
                        msg:msg
                    })
                }
            })
        })
    })

}



module.exports=socket
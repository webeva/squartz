



/*import { Client, Entity, Schema, Repository } from 'redis-om';




class Message extends Entity {}
let schema = new Schema(
    Message,
    {
        communityId: {type: 'string'},
        channelId: {type:'string'},
        message: {type: 'string'},
        senderPublicKey: {type: 'string'},
        messageType: {type: 'string'},
        images: {type: 'string'},
        timestamp: {type: 'string'},
        replyId: {type:'string'}

    },
    {
        dataStructure:'JSON',
    }
)

export async function sendMessages(data){
    if(!data){
        console.log("No data provided")
        return
    }
    try{
        let client = new Client()

        await client.open('redis://localhost:6379')
        
       //const repository = client.fetchRepository(schema)
        //const message = repository.createEntity(data)
        //const id = await repository.save(message)
        //return id
    }catch(error){
        console.log(error)
        return
    }
    
}*/
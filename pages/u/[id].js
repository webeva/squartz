import { useSocket } from "../../contexts/socketProvider";
import { useEffect, useState} from "react";
import style from "../../styles/Chat.module.css"
import Link from "next/link"
import {useRouter} from "next/router"
export default function Home({data}) {
  const socket = useSocket();
  const router = useRouter();
  const [roomName, setRoomName] = useState()
  const [messages, setMessages] = useState({})
  
   /* Whenever we receive a message from socket run this */
   useEffect(() => {
    if (socket === undefined) return;
    socket.on('chat-message', data =>{
      appendMessage(data)
    }) 
  }, [socket]);
  
  
    async function sendMessage(){
      const message = document.getElementById("sendInput").value;
      
      appendMessage(message, roomName)
      socket.emit("send-chat-message", roomName, message )
      document.getElementById("sendInput").value = ""
      
    }
    
    function appendMessage(message, roomName){
      const data = {
        "V": 2,
        "community_id": roomName,
        "channel_id": "development",
        "message_id": "101",
        "sender_public_key": "testaccount",
        "message_type": "POST",
        "images": null,
        "timestamp": Date.now(),
        "reply_id": null,
        "replies": null,
        "message": message
}
  try{
    setMessages(messages => [...messages, data])
  }catch(error){
    setMessages(data)
  }
     
     
      
    }
    useEffect(()=>{
      setMessages(data)
      console.log(data)
        setRoomName(router.query.id)
    }, [])
    useEffect(()=>{
        setRoomName(router.query.id)
        setMessages(data)

    }, [router])
 
   

  return (
    <>
    <Link href="/u/chat1"><button>Chat 1</button></Link>
    <Link href="/u/chat2"><button>Chat 2</button></Link>
    <div id="messageContainer" className={style.messageContainer}>
      {messages?.length > 0 &&
        
        messages.map(function (element, index) {
        console.log(element.message)
          return (
            <div key={index}>{element.message}</div>
            
          )
        })
      }
    </div>
    <input  id="sendInput" style={{marginLeft:"43vw"}} placeholder="Click here" type="text"/>
    <button id="sendButton" onClick={()=> sendMessage()}>Send</button>
    </>
  )
}

export async function getServerSideProps(context) {
  const {id} = context.query;
  // Fetch data from external API
  try{
    const res = await fetch(`http://squadz-env.eba-vnv5e2ab.us-east-1.elasticbeanstalk.com/get-messages/${id}`)
    const data = await res.json()
  
    // Pass data to the page via props
    
    return { props: { data } }
  }catch(error){
    return {props: {"V":2,"community_id":"chat2","channel_id":"development","message_id":"101","sender_public_key":"testaccount","message_type":"POST","images":null,"timestamp":"time_now","reply_id":null,"replies":null,"message":"No message have been sent yet"}}
  }
 
  
  
}
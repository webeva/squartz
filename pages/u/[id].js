/* Community page */


//Import socket to use for real-time aspect 
import { useSocket } from "../../contexts/socketProvider";
//Import from react 
import { useEffect, useState, useRef } from "react";
//Import style
import style from "../../styles/Chat.module.css";
//Import from next 
import { useRouter } from "next/router";

//Import components 
import Navbar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import EmojiPicker from "../../components/EmojiPicker";

//Import APIs
import RedisApi from "../api/Redis";
import DesoApi from "../api/Deso";

//Export the community page 
export default function Home({ data, result }) {
  //Intialize socket and router
  const socket = useSocket();
  const router = useRouter();
  const redis = new RedisApi();
  const deso = new DesoApi();
  //Set up some variables
  const [roomName, setRoomName] = useState();
  const [messages, setMessages] = useState({});
  const [emojishow, setEmojiShow] = useState("none");
  const [path, setPath] = useState();
  const [image, setImage] = useState();
  const [state, setState] = useState(false)
  const [resc, setResc] = useState(true)
  const [nft, setNft] = useState()
  const inputFile = useRef(null);


  /* Whenever we receive a message from socket run this */
  useEffect(() => {
    if (socket === undefined) return; //If message is undefined return
    socket.on("chat-message", (data) => {
      //Check if the message was sent on this channel
      if (JSON.parse(data).channel_id == router.query.channel) {
        setMessages((messages) => [...messages, JSON.parse(data)]);
      }
    });
  }, [socket]);

  async function sendMessage() {
    const message = document.getElementById("sendInput").value;
    if(message && state == false){
    
      const channel = router.query.channel;
      const user = localStorage.getItem("SquadKey");
      const data = await fetch("https://squadz.spatiumstories.xyz/get-messages/" + user).then((res) => res.json()).then((data) => {return data;});
      appendMessage(message, roomName, channel, image, data.Name, data.Profile);
      socket.emit("send-chat-message",roomName,message,channel,image,user,data.Name,data.Profile);
      document.getElementById("sendInput").value = "";
      setImage();
    }else{
      alert("Cannot send message")
    }
  }

  function appendMessage(message, roomName, channel, image, name, profile) {
    const data = {
      V: 2,
      community_id: roomName,
      channel_id: channel,
      message_id: "101",
      sender_public_key: localStorage.getItem("SquadKey"),
      message_type: "POST",
      images: image,
      timestamp: Date.now(),
      reply_id: null,
      replies: null,
      message: message,
      Name: name,
      Profile: profile,
    };
    try {
      setMessages((messages) => [...messages, data]);
    } catch (error) {
      setMessages(data);
    }
  }
  useEffect(() => {
    setMessages(data);
    setRoomName(router.query.id);
    getPath(router.query.id);
  }, []);
  useEffect(() => {
    setRoomName(router.query.id);
    setMessages(data);
    getPath(router.query.id);
    setNft()
  }, [router]);
  async function getPath(id) {
    
    const name = await redis.getCommunity("$@community" + id);
    setPath(`${name.Name} > ${router.query.channel}`);
    const includes = name.Allowed.split("§").includes(localStorage.getItem("SquadKey"))
    if(name.Admin == localStorage.getItem("SquadKey")) return
    if(includes == true) return

      const data = JSON.parse(name.Channels)
      data.map(function(value){
        if(value.Name == router.query.channel){
          setState(value.ReadOnly)
          if(value.ReadOnly == true){
            setState(true)
            document.getElementById("sendInput").placeholder = "You do not have permission to talk in this chat"
          }else{
            setState(false)
            document.getElementById("sendInput").placeholder = "Click here to start chatting"
          }
          if(value.Type == "admin"){
           
            router.push(`/u/${router.query.id}?channel=Welcome`)
          }
          if(value.Type == "nft"){
            
            checkIfOwns(name.GatingDetails, value.ReadOnly, name.Deso)
          

          }
        }
        
       
      })

    
    
  }
  async function checkIfOwns(id, own, adminId){
    let owns = false
   
    const user = localStorage.getItem("deso_user_key")
    const nfts = await deso.getNFTForUser(user)
    Object.values(nfts['data']['NFTsMap']).forEach((nft) => {
      if (nft['PostEntryResponse']['PosterPublicKeyBase58Check'] === adminId) {
        owns = true;
      }
    });
    if(owns == true){
     
      setResc(true)
      if(own == true){
        setState(true)
        document.getElementById("sendInput").placeholder = "You do not have permission to talk in this chat"
      }else{
        setState(false)
        document.getElementById("sendInput").placeholder = "Click here to start chatting"
      }
      return
    }else{
      setResc(false)
      setNft(`https://diamondapp.com/nft/${id}`)
      document.getElementById("sendInput").placeholder = `To join this chat buy at least one NFT.`
      setState(true)
    }
  }
  function showemoji() {
    if (document.getElementById("emojiPicker").style.display == "none") {
      setEmojiShow("block");
    } else {
      setEmojiShow("none");
    }
  }
  function addEmoji(e) {
    document.getElementById("sendInput").value += e.emoji;
  }
  useEffect(() => {
    if (messages) {
      const messageContainer = document.getElementById("messageContainer");
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  function timeSince(date) {
    //Find the second the post was sent
    const secondsOfPost = Math.round(date / 1000);
    var timeDifference = new Date().getTime() - date;

    //Find the time difference between the two in seconds
    var seconds = timeDifference / 1000;

    //Find the difference in terms of days
    var d = Math.floor(seconds / (3600 * 24));
    //Find the difference in terms of hours
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    //Find the difference in terms of minutes
    var m = Math.floor((seconds % 3600) / 60);
    //Number of days that have passed
    var dDisplay = d > 0 ? d + (d == 1 ? " day ago " : " days ago ") : "";
    //Number of hours that have passed
    var hDisplay = h > 0 ? h + (h == 1 ? " hour ago " : " hours ago ") : "";
    //Number of minutes that have passed
    var mDisplay = m > 0 ? m + (m == 1 ? " minute ago " : " minutes ago ") : "";
    //If the message was sent one day ago return "Yesterday"
    if (d == 1) {
      dDisplay = "Yesterday";
      hDisplay = "";
      mDisplay = "";
    }
    if (dDisplay) {
      return dDisplay;
    } else if (hDisplay) {
      return hDisplay;
    } else if (mDisplay) {
      return mDisplay;
    } else {
      return "A few seconds ago";
    }
  }
  function checkIfEnter(e) {
    if (e.charCode == 13) {
      sendMessage();
    }
  }
  async function uploadImage() {
    const user = localStorage.getItem("deso_user_key");
    if (!user) {
      const response = await deso.login(2);
    } else {
      inputFile.current.click();
    }
  }
  const changeHandler = (event) => {
    //Get the selected image
    const img = event.target.files[0];
    getImageUrl(img);
  };
  async function getImageUrl(result) {
    const user = localStorage.getItem("deso_user_key");
    const JWT = await deso.getJwt(user);
    const link = await deso.uploadImage(user, JWT, result);
    setImage(link.ImageURL);
  }
  async function leave(){
    const uid = router.query.id
    const response = await redis.leaveCommunity(localStorage.getItem("SquadKey"), uid )
    router.push("/")
  }

  return (
    <>
      <Navbar></Navbar>
      <SideBar></SideBar>
      <div
        id="emojiPicker"
        style={{ display: emojishow, position: "absolute", right: "10px" }}
      >
        <EmojiPicker show={emojishow} addEmoji={(event) => addEmoji(event)} />
      </div>
      <input
        alt="uploadImage"
        type="file"
        accept="image/*"
        name="file"
        ref={inputFile}
        onChange={changeHandler}
        style={{ display: "none" }}
      />
      
      <div id="messageContainer" className={style.messageContainer}>
        <header className={style.topChat}>
          {path}
          <button className={style.leave} onClick={()=>leave()}>Leave</button>
          </header>
        
        {messages?.length > 0 &&
          messages.map(function (element, index) {
            if(resc == true){
              return (
                <div className={style.message} key={index}>
                  <img
                    className={style.profile}
                    src={result[index] ? result[index].Profile : element.Profile}
                    alt="Profile picture"
                  ></img>
  
                  <span className={style.span}>
                    <p className={style.name}>
                      {result[index] ? result[index].Name : element.Name}{" "}
                    </p>
                    <p className={style.date}>{timeSince(element.timestamp)}</p>
                    <p className={style.messages}>{element.message}</p>
                  </span>
                  <br></br>
                  {element.images && (
                    <img
                      src={element.images}
                      className={style.images}
                      alt="Image"
                    ></img>
                  )}
                </div>
              );
            }
            
          })}
      </div>

      <div className={style.imageContainer}>
        {image && (
          <>
            <div className={style.close} onClick={() => setImage()}>
              &times;
            </div>
            <img className={style.image} src={image} alt="Uploaded image"></img>
          </>
        )}
      </div>
      
      <div className={style.input}>
      
        <div className={style.inputContainer}>
          <input
            onKeyPress={(e) => checkIfEnter(e)}
            className={style.messageInput}
            id="sendInput"
            placeholder="Click here to start chatting"
            type="text"
            readOnly={state == false ? false : true}
          />
        </div>
        <button
          onClick={() => showemoji()}
          className={style.sendButton}
          id="emojiButton"
        >
          <img
            className={style.sendImage}
            src="/assets/svg/emoji.svg"
            alt="Emoji"
          ></img>
        </button>
        <button
          onClick={() => uploadImage()}
          className={style.sendButton}
          id="imageButton"
        >
          <img
            className={style.sendImage}
            src="/assets/svg/image.svg"
            alt="Image"
          ></img>
        </button>
        {state == false &&
          <button
          className={style.sendButton}
          id="sendButton"
          onClick={() => sendMessage()}
        >
          Send
        </button>
}
        {nft &&
          <button
          className={style.sendButton}
          id="sendButton"
          onClick={()=>router.push(nft)}
          
        >Buy Nft</button>
        }

        
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const channel = context.query.channel;
  // Fetch data from external API

  try {
    const res = await fetch(
      `https://squadz.spatiumstories.xyz/get-messages/${id}`
    );
    const data = await res.json();

    let finalValue = [];

    // Pass data to the page via props
    data.map(async function (value) {
      if (value.channel_id == channel) {
        finalValue.push(value);
      }
    });

    async function asyncFunction(value) {
      const response = await fetch(
        `https://squadz.spatiumstories.xyz/get-user-info/${value.sender_public_key}`
      );
      return response.json();
    }

    var userInfo = await Promise.all(
      finalValue.map((item) => asyncFunction(item))
    );

    return { props: { data: finalValue, result: userInfo } };
  } catch (error) {
    return { props: { data: {} } };
  }
}
//End of the community page

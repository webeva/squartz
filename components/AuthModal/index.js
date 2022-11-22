import Modal from "../Modal"
import { Context } from "../../contexts/modalsProvider"
import {AuthContext }  from "../../contexts/authProvider"
import { useContext } from "react"

import style from "./authModal.module.css"

import { useState } from "react"
import { useRouter } from "next/router"

import RedisApi from "../../pages/api/Redis"
import DesoApi from "../../pages/api/Deso"

export default function AuthModal() {
  const [show, setShow] = useContext(Context)
  const [auth, setAuth] = useContext(AuthContext)

  const [name, setName] = useState()
  const [uid, setUid] = useState()
  const [type, setType] = useState()

  const redis = new RedisApi
  const deso = new DesoApi

  const router = useRouter()


  async function login(level){
    const response = await deso.login(level).then(()=>{
      if(localStorage.getItem("deso_user_key")){
        setUid(localStorage.getItem("deso_user_key"))
        setType("DeSo")
      }
    })
  }
  async function metaMaskLogin(){
    if (window.ethereum) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          const account = accounts[0]
   
          setUid(await window.ethereum.request({
             method: 'eth_getEncryptionPublicKey',
             params: [account],
          }))
          setType("MetaMask")
                   
      } catch (error) {
          console.log({ error })
      }
   }
  }
  async function createUser(name, uid, type){
    const response = await redis.createNewUser(name, uid, type).then(res=>{
      document.getElementById("error").innerText = res.data
      localStorage.setItem("SquadKey", uid)
      localStorage.setItem("SquadKeyType", type)
      setShow(false)
      setAuth(true)
      router.push("/")

    })
     
    
   
  }
  return (
    <Modal show={show} hide={()=> setShow(false)} >
       {/* Edit inside this componenet and it should
       show up on the auth modal 
       
       You shouldn't have to touch anything outside of this
       modal. Simply click the sign up button to open the modal
       and then click anywhere outside the modal to close it. 
       
       Incase you want to make a close modal function just 
       setShow(false) should work. 
       
       If you want to do any css there is a file called authModal.module.css
       which I imported so that you could use. Css in nextjs is a bit 
       different; you have to treat it like an object. For example,
       if you created a class called background, you can apply it to 
       an element by doing className={style.background}
       
       Also notice that we do use global variables which you can access in 
       styles/global.css. Feel free to add any other variables if you feeel like 
       we might need the color in other parts of the app.

       Once you have finished we can figure out how to create a global context for the auth 
       state so that we can acess it in the other parts of the app.

       I hope this makes sense, if you have any more questions 
       about nextjs I will be sure to answer.*/}


       <input placeholder="Type in your name" type="text" onInput={(e)=>setName(e.target.value)}></input>
       <br></br><button onClick={() => login(2)}>Connect with DeSo</button><br></br>
       <button onClick={()=>metaMaskLogin()}>Connect with MetaMask</button>

       <p>Name: {name}</p>
       <p>UID:{uid}</p>

       <button onClick={()=>createUser(name, uid, type)}>Create new user</button>
       <p id="error"></p>

    </Modal>
  )
}

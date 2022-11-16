/* The rightbar componenet */

//Import teh style
import style from "./Rightbar.module.css"

//Import from react
import {useState, useEffect} from "react"
import { useRouter } from "next/router"

//Export the rightbar function
export default function Rightbar() {
  const router = useRouter()
  //Variable used to store the currently logged in user's username.
  const [username, setUsername] = useState("_______")
  //Onload get the username of the user
  useEffect(()=>{
    getUsername()
  }, [])
  //Function that gets the username based on a public key.
  async function getUsername(){
    setUsername("@Hi")
  }
  //Function to logout the user
  async function logout(){
    const user = localStorage.getItem("deso_user_key")
   /* const response = deso.logout(user).then(()=>{
      //Check if they actually logged out
      checkAuth()
    })*/
  }
  //Function that checks if a user is logged in or not
  function checkAuth(){
    const user = localStorage.getItem("deso_user_key")
    //If the user is not logged in reroute them to the home page
    if(!user){
      router.push("/home")
    }
  }
  //Return the JSX
  return (
    <div className={style.bar}>
      <img src={`https://diamondapp.com/api/v0/get-single-profile-picture/${localStorage.getItem("deso_user_key")}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`}  alt="Profile Picture"></img>
      <h1>{username}</h1>
      <p>{localStorage.getItem("deso_user_key").slice(0,9)}...{localStorage.getItem("deso_user_key").slice(9,18)}</p>
      
      <a href="https://desolabs.org/hackathon/2022">Vote</a> {/* Replace with the link when available */}
      <a href="#" onClick={()=>logout()}>Logout</a>
    </div>
  )
}

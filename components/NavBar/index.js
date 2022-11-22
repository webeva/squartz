/* The navbar of the page */

//Import the style
import style from "./navBar.module.css"
//Import the Navitem (Commnunities)
import NavItem from "../NavItem"
//Import Redis api
import RedisApi from "../../pages/api/Redis"
import { useEffect } from "react"


//Export the JSX
export default function Navbar() {
  const redis = new RedisApi()
  async function getData(){
    //console.log(await redis.getUserData())
  }
  useEffect(()=>{
    getData()
  }, [])
  return (
    <div className={style.menu}>
        <NavItem icon={"https://diamondapp.com/api/v0/get-single-profile-picture/BC1YLhTXEyhu4p8P8QAz8eMy6UMGrc9j6mK1xXHMKjdbv6o3q1j7WgR?fallback=https://diamondapp.com/assets/img/default_profile_pic.png"} text={"Wormals"}/> {/* Wormals Community */}
        <NavItem icon = {"https://images.deso.org/bda8fa59eef35225bf80a6e152314afb46e0d4c2f69623129937afd2d4d11592.webp"} text={"Seelz"}/> {/* Seelz Community */}
        <NavItem icon = {"https://diamondapp.com/api/v0/get-single-profile-picture/BC1YLhNySXmFdZDyuwT9V115PbbSB2dfx2Y4mKowBwGDYx7KDDE2Ycb?fallback=https://diamondapp.com/assets/img/default_profile_pic.png"} text={"EvaSocial"}/> {/* EvaSocial Community */}
        <NavItem icon={"https://diamondapp.com/api/v0/get-single-profile-picture/BC1YLjBvzHjemzgY4va55AzZ7VhRBLDmjxsfxRHQ9PybPARMQvtDH5N?fallback=https://diamondapp.com/assets/img/default_profile_pic.png"} text={"DeSoLabs"}/> {/* DeSoLabs Community */}
    </div>
  )
}
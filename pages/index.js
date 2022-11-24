import NavBar from "../components/NavBar"
import Link from "next/link"
import style from "../styles/Home.module.css"

export default function index() {
  return (
   <div className={style.background}>
      <NavBar/>
      <p className={style.text}>Click on a community to start chatting. Or <Link href="/discover" style={{color:"var(--primary-color)"}}>Join a new community</Link></p>
    </div>
  )
}

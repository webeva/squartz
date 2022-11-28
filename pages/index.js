/* Main page that is displayed when no community is selected */

//Import the NavBar
import NavBar from "../components/NavBar"
//Import Link from next/link
import Link from "next/link"
//Import the style
import style from "../styles/Home.module.css"

//Export the main page 
export default function index() {
  //Return the JSX
  return (
   <div className={style.background}>
      <NavBar/>
      <p className={style.text}>Click on a community to start chatting. Or <Link href="/discover" style={{color:"var(--primary-color)"}}>Join a new community</Link></p>
    </div>
  )
}
//End of the index page

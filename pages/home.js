/* Home page that is displayed when the user is not 
logged in. */

//Import the style
import style from "../styles/Home.module.css";
//Import Head to set the title and metadata of the page
import Head from "next/head";

//Export the home page
export default function home() {
  //Return the JSX
  return (
    <>
      <Head>
        <title>Squadz | Home</title>
      </Head>
      <div className={style.main}>
        <div className={style.left}>
          <h1>YOUR NFT COMMUNITY PORTAL</h1>
          <h2>
            Build, Engage Reward!<br></br>
            Build an engaged community by rewarding micro-actions all in one
            platform
          </h2>
        </div>
        <div className={style.right}></div>
      </div>
    </>
  );
}
//End of the home page

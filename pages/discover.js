/* Discover page which allows users to discover and 
join new communities */


//Import the style from Discover.module.css
import style from "../styles/Discover.module.css";

//Load the join community modal when we need it (dynamic)
import dynamic from "next/dynamic";
const JoinCommunity = dynamic(() => import("../components/JoinModal"));

//Load the context to change the join community modal state
import { Context } from "../contexts/modalsProvider";
import { useContext } from "react";

//Import head for title and metadata of the page
import Head from "next/head"

//Export the discover page with data as a param
export default function Discover({ data }) {
  const { join, current } = useContext(Context); 
  const [show, setShow] = join; //Join community modal state
  const [currentcom, setData] = current; //Current community state

  //Return the JSX
  return (
    <div style={{ overflowY: "scroll", height: "90vh" }}>
      <Head>
        <title>Squadz | Discover</title>
      </Head>
      <JoinCommunity />
      <h1 className={style.header}>Discover</h1>
      <p className={style.subText}>Communities</p>
      {data?.map(function (value) {
        return (
          <>
            <div className={style.design}>
              <img className={style.profile} src={value.Profile}></img>
              <p className={style.text}>
                {value.Name} {value.Restriction}
              </p>
              <button
                className={style.buttom}
                onClick={() => {
                  setShow(true), setData(value.UID);
                }}
              >
                Join
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

//Gets data in the server side (very fast)
export async function getServerSideProps() {
  //Fetch the community list
  const res = await fetch(`https://squadz.spatiumstories.xyz/get-community-list`);
  //Convert the data to JSON
  const data = await res.json();
  //Pass the data as a prop to the page
  return { props: { data: data } };
}
//End of the discover page

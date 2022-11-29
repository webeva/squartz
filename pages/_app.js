/* Main page of the Squadz website */

//Import style
import "../styles/globals.css";
//Import socket provider to wrap the entire app in
import { SocketProvider } from "../contexts/socketProvider";
//Import from Next
import { useRouter } from "next/router";
//Import from react 
import { useEffect, useState } from "react";

//Import components
import TopBar from "../components/TopBar";

//Import the contexts
import AuthValue from "../contexts/authProvider";
import ModalState from "../contexts/modalsProvider";

//Import Head to set website title and metadata
import Head from "next/head";

//Export the app page
function App({ Component, pageProps }) {
  //Intialize the router 
  const router = useRouter();
  
  const [roomName, setRoomName] = useState(); //Store room name
  const [auth, setAuth] = useState("loading"); //Store auth state

  //Change room name on route change
  useEffect(() => {
    setRoomName(router.query.id);
  }, [router]);

  /* When they first arrive on the site check if 
  they are logged in or not. If so reroute them to 
  the main page */
  useEffect(()=>{
    const user = localStorage.getItem("SquadKey");
    if (user) {
      //The user is logged in send them to the main page
      setAuth(true);
    } else {
      //The user is not logged in send them to the home page.
      if (router.pathname == "/home") {
        router.push("/home");
      } else if (router.pathname == "/discover") {
        router.push("/discover");
      } else {
        router.push("/home");
      }

      setAuth(false);
    }
  }, [])
  useEffect(() => {
    
    //Small delay to allow for the loading screen to load
    setTimeout(() => {
      
      
    }, 1000);
  }, []);

  //Check if the user logged in or out in between routes

  //Return the JSX
  return (
    <>
      <Head>
        <title>Squadz</title>
      </Head>
      <AuthValue>
        <ModalState>
          {/* Check if the app state is currently loading */}

          <>
            {auth ? (
              <SocketProvider id={roomName}>
                {auth == "loading" ? (
                  <div className="loading">
                    <img src="/assets/image/logo.png" alt="Loading"></img>
                  </div>
                ) : (
                  <div></div>
                )}

                <TopBar />
                <Component {...pageProps} />
              </SocketProvider>
            ) : (
              <>
                <TopBar />
                <Component {...pageProps} />
              </>
            )}
          </>
        </ModalState>
      </AuthValue>
    </>
  );
}

export default App;
//End of the app page
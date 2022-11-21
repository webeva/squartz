import "../styles/globals.css";
import { SocketProvider } from "../contexts/socketProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import TopBar from "../components/TopBar";

//Import the contexts
import AuthValue from "../contexts/authProvider";
import ModalState from "../contexts/modalsProvider";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [roomName, setRoomName] = useState();
  const [auth, setAuth] = useState("loading");
  useEffect(() => {
    setRoomName(router.query.id);
  }, [router]);

  /* When they first arrive on the site check if 
  they are logged in or not. If so reroute them to 
  the main page */

  useEffect(() => {
    const user = localStorage.getItem("deso_user_key");
    //Small delay to allow for the loading screen to load
    setTimeout(() => {
      if (user) {
        //The user is logged in send them to the main page
        setAuth(true);
      } else {
        //The user is not logged in send them to the home page.

        router.push("/home");
        setAuth(false);
      }
    }, 1000);
  }, []);

  //Check if the user logged in or out in between routes

  return (
    <>
      <AuthValue>
        <ModalState>
        {/* Check if the app state is currently loading */}
        {auth == "loading" ? (
          <div className="loading">Loading NFT Communities...</div>
        ) : (
          <>
            {auth ? (
              <SocketProvider id={roomName}>
                <Component {...pageProps} />
              </SocketProvider>
            ) : (
              <>
                <TopBar />
                <Component {...pageProps} />
              </>
            )}
          </>
        )}
        </ModalState>
      </AuthValue>
    </>
  );
}

export default App;

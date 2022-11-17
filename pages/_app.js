import '../styles/globals.css'
import { SocketProvider } from '../contexts/socketProvider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


function App({ Component, pageProps }) {
  const router = useRouter()
  const [roomName, setRoomName] = useState()
  const [auth, setAuth] = useState("loading")
  useEffect(()=>{
    setRoomName(router.query.id)
  }, [router])

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
        setAuth(false); 
        router.push("/home")
       
      }
    }, 1000);
  }, []);

  //Check if the user logged in or out in between routes
  useEffect(() => {
    const user = localStorage.getItem("deso_user_key");
    if (user) {
      setAuth(true); //true 
     
    } else {
      setAuth(false);
      router.push("/home")
    }
  }, [router]);

 
  return (
   <>
    {/* Check if the app state is currently loading */}
    {auth == "loading" ? (
        <div className="loading">Loading NFT Communities...</div>
      ) : (
        <>
        {auth ? (
    <SocketProvider id={roomName}>
       
      <Component {...pageProps} />
      
      
    </SocketProvider>
        ):(
          <div>Not logged in</div>
        )
        }
        </>
      )
    }
    </>
  )
}

export default App

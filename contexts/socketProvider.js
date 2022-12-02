/* Socket provider used for the client side */

//Import from react
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
//Import the socket.io client version
import io from "socket.io-client";
//Create a new contect
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("deso_user_key");
    const roomName = router.query.id;
    //Set up a new client with the server
    if (roomName) {
      const newSocket = io("https://squadz.spatiumstories.xyz/", {query: `chat=${roomName}`});
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [router]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

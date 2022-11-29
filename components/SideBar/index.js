import React, { useEffect, useState } from "react";
import style from "./sideBar.module.css";

import RedisApi from "../../pages/api/Redis";
import { useRouter } from "next/router";

export default function SideBar() {
  const redis = new RedisApi();
  const [channels, setChannels] = useState();
  const [admin, setAdmin] = useState(false)
  const [banner, setBanner] = useState("/assets/image/bannerPlaceholder.png");
  const router = useRouter();
  useEffect(() => {
    getChannels();
  }, [router]);

  async function getChannels() {
    const id = router.query.id;

    const response = await redis.getCommunity("$@community" + id);

    setChannels(JSON.parse(response.Channels));
    setBanner(response.Banner);
    const user = localStorage.getItem("SquadKey")
    if(user == response.Admin || response.Allowed.split("§").includes(user)){
      setAdmin(true)
    }
    
  }

  function joinChannel(value) {
    router.query.channel = value;
    router.push(router);
  }

  return (
    <div className={style.channels}>
      <img src={banner} alt="Banner" className={style.banner}></img>

      {channels != undefined &&
     
        
        channels?.map(function(value){
          
          
        
          if (value) {
            return (
              <>
              {value.Type != "admin" ? (
              <>
                <button
                key={value}
                onClick={() => joinChannel(value.Name)}
                className={style.messageChannel}
              >
                # {value.Name}
              </button>
              <br></br>
              </>
              ): (
                <>
                {admin &&
                <>
                  <button
                  key={value}
                  onClick={() => joinChannel(value.Name)}
                  className={style.messageChannel}
                >
                  # {value.Name}
                </button>
                <br></br>
                </>
                }
                </>
              )
             
              } 
              </>
            );
          }
          
        })}
    </div>
  );
}

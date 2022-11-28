import React, { useEffect, useState } from "react";
import style from "./sideBar.module.css";

import RedisApi from "../../pages/api/Redis";
import { useRouter } from "next/router";

export default function SideBar() {
  const redis = new RedisApi();
  const [channels, setChannels] = useState();
  const [banner, setBanner] = useState("/assets/image/bannerPlaceholder.png");
  const router = useRouter();
  useEffect(() => {
    getChannels();
  }, [router]);

  async function getChannels() {
    const id = router.query.id;

    const response = await redis.getCommunity("$@community" + id);

    setChannels(response.Channels.split("§"));
    setBanner(response.Banner);
  }

  function joinChannel(value) {
    router.query.channel = value;
    router.push(router);
  }

  return (
    <div className={style.channels}>
      <img src={banner} alt="Banner" className={style.banner}></img>

      {channels?.length > 0 &&
        channels?.map(function (value) {
          if (value) {
            return (
              <>
                <button
                  key={value}
                  onClick={() => joinChannel(value)}
                  className={style.messageChannel}
                >
                  # {value}
                </button>
                <br></br>
              </>
            );
          }
        })}
    </div>
  );
}

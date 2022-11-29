import Modal from "../Modal";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/modalsProvider";
import style from "./JoinModal.module.css";
import RedisApi from "../../pages/api/Redis";
import DesoApi from "../../pages/api/Deso";

import { useRouter } from "next/router";

export default function JoinModal() {
  const { join, current } = useContext(Context);
  const [show, setShow] = join;
  const [data, setData] = useState();
  const [currentCom, setCurrent] = current;
  const redis = new RedisApi();
  const deso = new DesoApi();
  const router = useRouter();

  useEffect(() => {
    getInformation(currentCom);
  }, [currentCom]);

  async function getInformation(id) {
    const response = await redis.getCommunity("$@community" + id);
    setData(response);
  }

  async function doesOwnNft(id, adminId) {
    //Return true if id owns an adminId NFT
    console.log(id, adminId);
  }

  async function joinCommunity() {
    const uid = localStorage.getItem("SquadKey");
    if (uid) {
      if (data.Restriction == "free") {
        document.getElementById("Join").innerText = "Joining";
        const response = await redis.joinCommunity(uid, currentCom).then((res) => {
          if(res == "Cannot join community again!"){
            alert("Cannot join community again!")
          }else{
            setShow(false);
            router.push(`/u/${currentCom}?channel=Welcome`);
          }
         
        });
      } else {
        const user = localStorage.getItem("deso_user_key");
        if (user) {
          const result = await doesOwnNft(user, data.Deso);
          console.log(result);
          if (result == true) {
            document.getElementById("Join").innerText = "Joining";
            const response = await redis
              .joinCommunity(uid, currentCom)
              .then(() => {
                setShow(false);
                router.push(`/u/${currentCom}?channel=Welcome`);
              });
          } else {
            alert("Must own at least one of the NFTs");
          }
        } else {
          alert("Requires DeSo login");
          const response = await deso.login(2);
        }
      }
    } else {
      alert("Log in to join a community!");
    }
  }

  return (
    <Modal
      show={show}
      hide={() => {
        setShow(false);
        setData(false);
      }}
    >
      <h1 className={style.main}>{data?.Name}</h1>
      <h2 className={style.req}>Requirements to Join:</h2>
      <ul className={style.reqi}>
        {data?.Restriction == "free" ? (
          <li>✔️ None</li>
        ) : (
          <li> Own at least one NFT</li>
        )}
      </ul>
      <div className={style.split}>
        <img
          alt="Image"
          className={style.image}
          src={
            data?.Profile ? data.Profile : "/assets/image/bannerPlaceholder.png"
          }
        ></img>
        <p className={style.des}>{data?.Description}</p>
      </div>

      <div className={style.bottom}>
        <button
          onClick={() => {
            setShow(false);
            setData(false);
          }}
          style={{ marginLeft: "45%" }}
        >
          Cancel
        </button>
        <button id="Join" onClick={() => joinCommunity()}>
          Join
        </button>
      </div>
    </Modal>
  );
}

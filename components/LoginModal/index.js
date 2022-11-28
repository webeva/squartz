import { useContext, useState } from "react";
import { Context } from "../../contexts/modalsProvider";
import { AuthContext } from "../../contexts/authProvider";

import Modal from "../Modal";

import AuthApi from "../../pages/api/Auth";
import DesoApi from "../../pages/api/Deso";

import { useRouter } from "next/router";
import style from "./loginModal.module.css";

export default function LoginModal() {
  const { login } = useContext(Context);
  const [show, setShow] = login;
  const [isAuth, setAuth] = useContext(AuthContext);

  const [text, setText] = useState();
  const auth = new AuthApi();
  const deso = new DesoApi();

  const router = useRouter();

  async function checkLogin(type) {
    if (type == "DeSo") {
      const request = await deso.login(2).then(async function () {
        const key = localStorage.getItem("deso_user_key");
        if (key) {
          const response = await auth.checkLogin(type, key);
          console.log(response);
          if (response.Logged == true) {
            setShow(false);
            setAuth(true);
            localStorage.setItem("SquadKey", response.UID);
            localStorage.setItem("SquadKeyType", "DeSo");
            router.push("/");
          } else {
            setText("This account doesn't exist!");
          }
        }
      });
    } else if (type == "MetaMask") {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];

          const key = await window.ethereum.request({
            method: "eth_getEncryptionPublicKey",
            params: [account],
          });
          const response = await auth.checkLogin(type, key);
          if (response.Logged == true) {
            setShow(false);
            setAuth(true);
            localStorage.setItem("SquadKey", response.UID);
            localStorage.setItem("SquadKeyType", "MetaMask");
            router.push("/");
          } else {
            setText("This account doesn't exist!");
          }
        } catch (error) {
          console.log({ error });
        }
      }
    }
  }

  return (
    <Modal show={show} hide={() => setShow(false)}>
      <h1 className={style.text}>Login to Squadz</h1>
      <br></br>
      <button
        className={style.connect}
        style={{ backgroundColor: "rgba(0,152,242,255)" }}
        onClick={() => checkLogin("DeSo")}
      >
        <img src="/assets/image/deso.png" alt="Deso"></img>
        Login with DeSo
      </button>
      <button
        className={style.connect}
        style={{ backgroundColor: "#f88414" }}
        onClick={() => checkLogin("MetaMask")}
      >
        <img src="/assets/image/metamask.png" alt="Metamask"></img>
        Login with MetaMask
      </button>
      <p id="error">{text}</p>
    </Modal>
  );
}

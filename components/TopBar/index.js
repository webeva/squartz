import React, { useEffect, useState } from "react";
import style from "./topbar.module.css";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext } from "react";
import { Context } from "../../contexts/modalsProvider";
import { AuthContext } from "../../contexts/authProvider";

import DesoApi from "../../pages/api/Deso";

const AuthModal = dynamic(() => import("../AuthModal"), {
  suspense: true,
});
const LoginModal = dynamic(() => import("../LoginModal"), {
  suspense: true,
});
const CreateCommunity = dynamic(() => import("../CreateCommunity"), {
  suspense: true,
});

export default function TopBar() {
  const { modal, login, community } = useContext(Context);
  const [show, setShow] = modal;
  const [loginShow, setLoginShow] = login;
  const [log, setLog] = useState(false)
  const [communityShow, setCommunityShow] = community;
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("/assets/image/uploadPlaceholder.png");
  const router = useRouter();
  const deso = new DesoApi();

  useEffect(() => {
    const user = localStorage.getItem("SquadKey");
    if (user) {
      setAuth(true);
      getUserData();
    } else {
      setAuth(false);
    }
  }, [router]);

  async function getUserData() {
    const user = localStorage.getItem("SquadKey");
    const response = await fetch(
      "https://squadz.spatiumstories.xyz/get-user-info/" + user
    )
      .then((response) => response.json())
      .then((data) => {
        setName(data.Name);
        setProfile(data.Profile);
      });
  }
  function logout() {
    localStorage.removeItem("SquadKey");
    localStorage.removeItem("SquadKeyType");
    setAuth(false);
    router.push("/home");
  }
  async function seeIfCommuniy() {
    if (localStorage.getItem("deso_user_key")) {
      setCommunityShow(true);
    } else {
      const response = await deso.login(2);
    }
  }
  function routeToHome(){
    const user = localStorage.getItem("SquadKey")
    if(user){
      router.push("/")
    }else{
      return
    }
  }

  return (
    <>
      <Suspense>
        <AuthModal></AuthModal>
        <LoginModal></LoginModal>
        <CreateCommunity></CreateCommunity>
      </Suspense>

      <nav className={style.nav}>
        <img
          className={style.logo}
          src="/assets/image/logo.png"
          alt="Logo goes here"
          onClick={() => routeToHome()}
        ></img>
        <ul className={style.navList}>
          {auth ? (
            <li className={style.navItem} onClick={() => seeIfCommuniy()}>
              Create
            </li>
          ) : (
            <div></div>
          )}
          <li className={style.navItem}>
            <Link href="/discover">Discover</Link>
          </li>
          {auth ? (
            <>
              <div className={style.dropContainer}>
                <img className={style.profile} src={profile} alt="Profile"></img>
                <li className={style.logged} onClick={()=> setLog(!log)}>{name}</li>
                <img className={style.down} src="/assets/svg/down.svg" alt="Down" onClick={()=> setLog(!log)}></img>
                <div className={style.dropdown} style={{display:log ? "block": "none"}}>
                  <ul>
                    <li onClick={() => logout()}>
                      <img src="/assets/svg/logout.svg" alt="Logout" />
                      Log out
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <li className={style.navItem}>
                <a onClick={() => setLoginShow(true)}>Login</a>
              </li>
              <li className={style.navItem}>
                <div onClick={() => setShow(true)} className={style.navButton}>
                  Sign up
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

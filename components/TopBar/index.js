import React, { useEffect, useState } from "react";
import style from "./topbar.module.css";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContext } from "react";
import { Context } from "../../contexts/modalsProvider";
import { AuthContext } from "../../contexts/authProvider";

const AuthModal = dynamic(() => import("../AuthModal"), {
  suspense: true,
});
const LoginModal = dynamic(()=> import("../LoginModal"), {
  suspense: true
})

export default function TopBar() {
  const {modal, login} = useContext(Context)
  const [show, setShow] = modal
  const [loginShow, setLoginShow] = login
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("SquadKey");
    if (user) {
      setAuth(true);
      getUserData()
    } else {
      setAuth(false);
    }
  }, []);

  async function getUserData(){
    const user = localStorage.getItem("SquadKey")
    const response = await fetch("https://eva-gun-node.herokuapp.com/get-user-info/" + user).then((response) => response.json())
    .then((data) => setName(data.Name));
  }
  function logout(){
    localStorage.removeItem("SquadKey")
    localStorage.removeItem("SquadKeyType")
    setAuth(false)
    router.push("/home")
  }

  return (
    <>
      <Suspense>
        <AuthModal></AuthModal>
        <LoginModal></LoginModal>
      </Suspense>

      <nav className={style.nav}>
        <img
          className={style.logo}
          src="/assets/image/logo.png"
          alt="Logo goes here"
          onClick={()=>router.push("/")}
        ></img>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <Link href="/discover">Discover</Link>
          </li>
          {auth ? (
            <>
            <div className={style.dropContainer}>
              <li className={style.logged}>{name}</li>
              <div className={style.dropdown}>
                <ul>
                  <li>
                    <img src="/assets/svg/setting.svg"/>
                    Settings
                  </li>
                  <li onClick={()=>logout()}>
                  <img src="/assets/svg/logout.svg"/>
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

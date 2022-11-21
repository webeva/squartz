import React from "react";
import style from "./topbar.module.css"

import dynamic from "next/dynamic"
import { Suspense, useState } from 'react'
import Link from "next/link"

import { useContext } from "react";
import { Context } from "../../contexts/modalsProvider";


const AuthModal = dynamic(()=> import("../AuthModal"), {
  suspense: true,
})

export default function TopBar() {
  const [show, setShow] = useContext(Context)
  console.log(show)
  return (
    <>
    <Suspense fallback={`Loading...`}>
      <AuthModal></AuthModal>
    </Suspense>

    <nav className={style.nav}>
      <img className={style.logo} src="./assets/logo.png" alt="Logo goes here"></img>
      <ul className={style.navList}>
        <li className={style.navItem}>
          <Link href="/discover">Discover</Link>
        </li>
        <li className={style.navItem}>
          <a onClick={()=> setShow(true)}>Login</a>
        </li>
        <li className={style.navItem}>
          <div onClick={() => setShow(true)} className={style.navButton}>
            Sign up
          </div>
        </li>
      </ul>
    </nav>
    </>
  );
}

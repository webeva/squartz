import React from 'react'
import Link from "next/link"
import style from "./sideBar.module.css"

export default function SideBar() {
  return (
    <div className={style.channels}>
      <Link href="/u/chat1"><button className={style.messageChannel}>Channel 1</button></Link>
      <Link href="/u/chat2"><button className={style.messageChannel}>Channel 2</button></Link>
    </div>
  )
}

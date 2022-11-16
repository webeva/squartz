/* NavItem or the community */

//Import the style
import style from "./navItem.module.css";
//Import the router from next router
import { useRouter } from "next/router";

export default function NavItem({ icon, text }) {
  //Intialize the router
  const router = new useRouter();
  //Return the JSX
  return (
    <div
      onClick={() => router.push(`/channel/${text}`)}
      className={style.navItem}
      style={{
        background: `url(${icon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <span className={style.navName}>{text}</span>
    </div>
  );
}

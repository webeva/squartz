/* NavItem or the community */

//Import the style
import style from "./navItem.module.css";
//Import the router from next router
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavItem({ icon, text, link }) {
  //Intialize the router
  const router = new useRouter();

  //Return the JSX
  return (
    <Link href={`/u/${link}?channel=Welcome`}>
      <div
        className={style.navItem}
        style={{
          background: `url(${icon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <span className={style.navName}>{text}</span>
      </div>
    </Link>
  );
}

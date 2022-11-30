/* The navbar of the page */

//Import the style
import style from "./navBar.module.css";
//Import the Navitem (Commnunities)
import NavItem from "../NavItem";
//Import Redis api
import RedisApi from "../../pages/api/Redis";
import { useEffect, useState } from "react";


//Export the JSX
export default function Navbar() {
  const redis = new RedisApi();
  const [communityList, setCommunityList] = useState();

  async function getData() {
    const user = localStorage.getItem("SquadKey");
    const communityList = await redis.getUserChat(user);
    setCommunityList(communityList);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={style.menu}>
      {communityList?.length > 0 &&
        communityList?.map(function (value) {
          
          const { Profile, Name, UID } = JSON.parse(value);
          return <NavItem icon={Profile} text={Name} link={UID} key={UID} />;
        })}
    </div>
  );
}

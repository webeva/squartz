import style from "./createCommunity.module.css";
import Modal from "../Modal";

import { Context } from "../../contexts/modalsProvider";
import { useContext, useState, useRef, useEffect } from "react";

import DesoApi from "../../pages/api/Deso";
import RedisApi from "../../pages/api/Redis";

import { useRouter } from "next/router";

export default function CreateCommunity() {
  const { community } = useContext(Context);
  const [show, setShow] = community;
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState();
  const inputFile = useRef(null);
  const inputFile2 = useRef(null);
  const deso = new DesoApi();
  const redis = new RedisApi();
  const router = useRouter();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [profile, setProfile] = useState("/assets/image/uploadPlaceholder.png");
  const [banner, setBanner] = useState();
  const [admin, setAdmin] = useState();
  const [restriction, setRestriction] = useState();

  function nextPage() {
    if (currentPage == 0) {
      const name = document.getElementById("name").value;
      const desc = document.getElementById("desc").value;
      if (!name || !desc) {
        setError("Please enter a valid input");
        return;
      }
      setName(document.getElementById("name").value);
      setDescription(document.getElementById("desc").value);
      setError("");
      setCurrentPage(1);
    } else if (currentPage == 1) {
      if (!profile || !banner) {
        setError("Please upload an image");
        return;
      }
      setError("");
      setCurrentPage(2);
      document.getElementById("next").innerText = "Create";
      document.getElementById("next").style.marginLeft = "28vw";
    } else if (currentPage == 2) {
      if (!restriction) {
        setError("Please select one option");
        return;
      }
      setError("");
      setAdmin(localStorage.getItem("SquadKey"));
      document.getElementById("next").innerText = "Creating...";
      document.getElementById("next").style.marginLeft = "26vw";
      document.getElementById("next").style.backgroundColor =
        "rgb(80, 85, 103)";
      createNewCommunity();
    }
  }
  async function createNewCommunity() {
    const id = createUID();
    const channels = [
      {Name: "Welcome", Type: "free", ReadOnly: true},
      {Name: "General", Type: "free", ReadOnly: false},
      {Name: "Rules", Type: "free", ReadOnly: true}
    ]
    const allowedUsers = ""
    const response = await redis.createNewCommunity(
        id,
        name,
        description,
        profile,
        banner,
        localStorage.getItem("SquadKey"),
        restriction,
        JSON.stringify(channels),
        localStorage.getItem("deso_user_key"),
        allowedUsers,
        ""

      )
      .then((res) => {
        console.log(res);
      });
    const uid = localStorage.getItem("SquadKey");
    const response2 = await redis
      .joinCommunity(uid, id)
      .then((res2) => console.log(res2));
    const data = {
      UID: id,
      Name: name,
      Profile: profile,
      Desc: description,
      Restriction: restriction,
    };
    const response3 = await redis.addCommunity(data);
    setShow(false);

    setName();
    setDescription();
    setProfile("/assets/image/uploadPlaceholder.png");
    setBanner();
    setBanner();
    setAdmin();
    setCurrentPage(0);
    document.getElementById("next").innerText = "Next";
    document.getElementById("next").style.marginLeft = "29vw";
    document.getElementById("next").style.backgroundColor =
      "rgba(48,52,69,255)";

    router.push(`/u/${id}?channel=Welcome`);
  }

  function createUID() {
    var length = 20,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  //On image button click, click on the input field.
  const onImageClick = () => {
    inputFile.current.click();
  };
  const onBannerClick = () => {
    inputFile2.current.click();
  };
  //Set the selected file as the image url
  const changeHandler = (event) => {
    //Get the selected image
    const img = event.target.files[0];

    getImageUrl(img);
  };
  //Set the selected file as the image url
  const changeHandler2 = (event) => {
    //Get the selected image
    const img = event.target.files[0];

    getImageUrlforBanner(img);
  };
  async function intialize() {
    const user = localStorage.getItem("deso_user_key");
    const JWT = await deso.getJwt(user);
  }
  useEffect(() => {
    intialize();
  }, []);
  async function getImageUrl(result) {
    const user = localStorage.getItem("deso_user_key");
    const JWT = await deso.getJwt(user);
    const link = await deso.uploadImage(user, JWT, result);
    setProfile(link.ImageURL);
  }
  async function getImageUrlforBanner(result) {
    const user = localStorage.getItem("deso_user_key");
    const JWT = await deso.getJwt(user);
    const link = await deso.uploadImage(user, JWT, result);
    setBanner(link.ImageURL);
    document.getElementById("banner").style.display = "block";
  }

  return (
    <Modal show={show} hide={() => setShow(false)}>
      {currentPage == 0 ? (
        <>
          <h1 className={style.text}>Create a community</h1>
          <input
            id="name"
            className={style.input}
            placeholder="Enter community name"
          ></input>
          <br></br>
          <textarea
            id="desc"
            className={style.textarea}
            placeholder="Enter community description"
          ></textarea>
        </>
      ) : (
        <>
          {currentPage == 1 ? (
            <div>
              <h1 className={style.text}>Upload images</h1>
              <input
                alt="uploadImage"
                type="file"
                accept="image/*"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
              />
              <input
                alt="uploadImage"
                type="file"
                accept="image/*"
                name="file"
                ref={inputFile2}
                onChange={changeHandler2}
                style={{ display: "none" }}
              />
              <img
                className={style.image}
                onClick={onImageClick}
                src={profile}
                alt="Image uploaded"
              ></img>
              <div className={style.upload} onClick={onBannerClick}>
                <p>Upload Banner</p>
              </div>
              <img
                id="banner"
                className={style.banner}
                src={banner}
                alt="Image uploaded"
              ></img>
            </div>
          ) : (
            <div>
              <h1 className={style.text}>Restriction</h1>
              <div className={style.dropdown}>
                <div className={style.options}>
                  <div onClick={() => setRestriction("free")}>
                    <h1>Free for all</h1>
                    <p>Allow anybody to join your community</p>
                  </div>
                  <div>
                    <h1 onClick={() => setRestriction("nft")}>NFT Gated</h1>
                    <p>
                      Restrict access to anybody that owns at least 1 one of
                      your NFT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <button id="next" className={style.next} onClick={() => nextPage()}>
        Next
      </button>
      <p className={style.error}>{error}</p>
    </Modal>
  );
}

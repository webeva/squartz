import Modal from "../Modal"
import { Context } from "../../contexts/modalsProvider"
import { useContext } from "react"

import style from "./authModal.module.css"
export default function authModal() {
  const [show, setShow] = useContext(Context)
  return (
    <Modal show={show} hide={()=> setShow(false)} >
       {/* Edit inside this componenet and it should
       show up on the auth modal 
       
       You shouldn't have to touch anything outside of this
       modal. Simply click the sign up button to open the modal
       and then click anywhere outside the modal to close it. 
       
       Incase you want to make a close modal function just 
       setShow(false) should work. 
       
       If you want to do any css there is a file called authModal.module.css
       which I imported so that you could use. Css in nextjs is a bit 
       different; you have to treat it like an object. For example,
       if you created a class called background, you can apply it to 
       an element by doing className={style.background}
       
       Also notice that we do use global variables which you can access in 
       styles/global.css. Feel free to add any other variables if you feeel like 
       we might need the color in other parts of the app.

       Once you have finished we can figure out how to create a global context for the auth 
       state so that we can acess it in the other parts of the app.

       I hope this makes sense, if you have any more questions 
       about nextjs I will be sure to answer.*/}
    </Modal>
  )
}

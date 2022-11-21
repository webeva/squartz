import style from "./Modal.module.css"
export default function Modal(props) {
  return (
    <div className={props.show ? style.modal : style.hide} onClick={()=>props.hide()}>
        <div className={style.modalContent} onClick={(e)=> e.stopPropagation()}>
            <div className={style.modalBody}>
                {props.children}
            </div>
        </div>
    </div>
  )
}

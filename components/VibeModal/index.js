import Modal from "../Modal"
import { useContext } from "react"
import { Context } from "../../contexts/modalsProvider"

export default function VibeModal() {
    const {vibe} = useContext(Context)
    const [vibeshow, setVibe] = vibe
    
  return (
    <Modal show={vibeshow} hide={()=> setVibe(false)}>
        <iframe id="vibe" title="View Vibehut Room" style={{borderWidth: "0px", maxWidth: "500px", height: "250px", width: "100%"}} src="https://vibehut.io/embed/rooms/638a144a0e9a3e0015387e28"></iframe>
    </Modal>
  )
}

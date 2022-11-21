/* Modal provider to keep track of the modal states throughout
the entire global context of the app */

import React, { useState } from "react";

const intialState = false //Authentication modal to sign up

export const Context = React.createContext()

const ModalState = ({children}) => {
    const [modalState, setModalState] = useState(intialState)
    return (
        <Context.Provider value={[modalState, setModalState]}>
            {children}
        </Context.Provider>
    )
}

export default ModalState;
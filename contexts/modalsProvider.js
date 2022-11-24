/* Modal provider to keep track of the modal states throughout
the entire global context of the app */

import React, { useState } from "react";

const intialState = false

export const Context = React.createContext()

const ModalState = ({children}) => {
    const [modalState, setModalState] = useState(intialState)
    const [loginModalState, setLoginModalState] = useState(intialState)
    return (
        <Context.Provider value={{modal: [modalState, setModalState], login:[loginModalState, setLoginModalState]}}>
            {children}
        </Context.Provider>
    )
}

export default ModalState;
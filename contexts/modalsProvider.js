/* Modal provider to keep track of the modal states throughout
the entire global context of the app */

import React, { useState } from "react";

const intialState = false;

export const Context = React.createContext();

const ModalState = ({ children }) => {
  const [modalState, setModalState] = useState(intialState);
  const [loginModalState, setLoginModalState] = useState(intialState);
  const [createModalState, setCreateModalState] = useState(intialState);
  const [community, setCommunity] = useState(intialState);
  const [currentCommunity, setCurrentCommunity] = useState(intialState);
  return (
    <Context.Provider
      value={{
        modal: [modalState, setModalState], //Current state of auth modal
        login: [loginModalState, setLoginModalState], //Current state of login modal
        community: [createModalState, setCreateModalState], //Current state of create community modal
        join: [community, setCommunity], //Curent state of join community modal
        current: [currentCommunity, setCurrentCommunity], //Current community (for discovery )
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ModalState;

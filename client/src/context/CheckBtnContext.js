import { createContext, useEffect, useState } from "react";

const CheckBtnContext = createContext();

function CheckBtnProvider({ children }) {

  const [checkedBtn, setCheckedBtn] = useState([]);

  const clicked = (e) => {
    const {name, id, value} = e.target;
    setCheckedBtn({...checkedBtn, [id]: true})
  }

  const checkArray = (id) => {
    setCheckedBtn([...checkedBtn, id])
  }

  const submitted = () => {
    setCheckedBtn([])
  }

  const btnValue = (id) => {

    if(checkedBtn[id] === true){
        return true
    }
    else if(checkedBtn[id] === false){
        return false
    }
  }

  return (
    <CheckBtnContext.Provider value={{ checkedBtn, clicked, submitted, btnValue, checkArray }}>
      {children}
    </CheckBtnContext.Provider>
  );
}

export { CheckBtnProvider, CheckBtnContext };

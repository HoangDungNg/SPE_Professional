import { createContext, useEffect, useState } from "react";

const CheckBtnContext = createContext();

function CheckBtnProvider({ children }) {

  const [checkedBtn, setCheckedBtn] = useState([]);


//   useEffect(() => {
//     console.log(checkedBtn)

//     // btnValue()

//   },[checkedBtn])

  const clicked = (e) => {
    const {name, id, value} = e.target;
    setCheckedBtn({...checkedBtn, [id]: true})
    console.log(checkedBtn)
    // setCheckedBtn()
  }

  const checkArray = (id) => {
    setCheckedBtn([...checkedBtn, id])
  }

  const submitted = () => {
    setCheckedBtn([])
  }

  const btnValue = (id) => {

    // checkedBtn[id]
    console.log(id)
    // setCheckedBtn({...checkedBtn, [id]: false})
    // console.log(checkedBtn)

    if(checkedBtn[id] === true){
        console.log(true)
        // console.log(checkedBtn[id])
        return true
    }
    else if(checkedBtn[id] === false){
        console.log(false)
        return false
    }
    // return true
    
  }

  return (
    <CheckBtnContext.Provider value={{ checkedBtn, clicked, submitted, btnValue, checkArray }}>
      {children}
    </CheckBtnContext.Provider>
  );
}

export { CheckBtnProvider, CheckBtnContext };

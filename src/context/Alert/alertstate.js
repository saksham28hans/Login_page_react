import { useState } from "react";
import alertcontext from "./alertcontext";

const AlertState = (props)=>{
    
    const [alerts, setalerts] = useState(null);

    const showAlert = (message,type)=>{
        setalerts({message : message,
        type : type});
     
        setTimeout(() => {
          setalerts(null);
        }, 3000);
       }

       return (
        <alertcontext.Provider value={{ alerts,showAlert }}>
            {props.children}
        </alertcontext.Provider>
    )
}

export default AlertState;


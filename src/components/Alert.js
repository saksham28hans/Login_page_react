import React, {useContext} from 'react';
import alertcontext from '../context/Alert/alertcontext';


export default function Alert(props) {
    const alcontext = useContext(alertcontext);
  const { alerts } = alcontext;
    const capitalize = (word)=>{
       let lcase = word.toLowerCase();
       if(lcase==='danger')
       lcase = "error";
       return lcase.charAt(0).toUpperCase() + lcase.slice(1);
    }
    return (
        <div style = {{height : '50px'}}>
      {alerts && <div>
            <div className={`alert alert-${alerts.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alerts.type)}:</strong> {alerts.message}.
            </div>
        </div>}
        </div>
    );
}

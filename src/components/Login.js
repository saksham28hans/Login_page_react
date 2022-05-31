import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import alertcontext from '../context/Alert/alertcontext';

const Login = () => {
 
  const alcontext = useContext(alertcontext);
  const { showAlert } = alcontext;
  const [credentials, setcredentials] = useState({email:"",password:""});
  const navigate = useNavigate();
  const onChange = (e)=>
  {
      setcredentials({...credentials, [e.target.name]:e.target.value})
  }

  const handleClick = async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5001/api/auth/login`, {
    method: 'POST',          
    headers: {
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({email:credentials.email,password: credentials.password}) // body data type must match "Content-Type" header
  });
  const json = await response.json(); // parses JSON response into native JavaScript objects
  if(json.success)
  {
   showAlert('Successfully Logged In','success');
   localStorage.setItem('token',json.authToken);
   navigate("/");
  }
  else
  {
    showAlert(json.error,'danger');
  }
  //e.preventDefault();
  }
  return (
    <div className='container my-5'>
      <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  );
}

export default Login;

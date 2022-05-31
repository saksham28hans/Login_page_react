import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import alertcontext from '../context/Alert/alertcontext';

const Signup = () => {

    const alcontext = useContext(alertcontext);
    const { showAlert } = alcontext;
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const [usertype, setusertype] = useState("student");
    const navigate = useNavigate();
    const onChange = (e)=>
    {
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }
    const handleCheckBox = (e)=>{
        setusertype(e.target.value);
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword} = credentials;
        if(password !== cpassword)
        {
            showAlert('Password does matches. Try Again','danger');
        }
        else
        {
            let roles = [];
            roles.push(usertype);
        const response = await fetch(`http://localhost:5001/api/auth/create`, {
          method: 'POST',          
          headers: {
            'Content-Type': 'application/json',
          },
         
          body: JSON.stringify({name,email,password,usertype,roles}) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if(json.success)
        {
         showAlert('Account Created Sucessfully','success');
         localStorage.setItem('token',json.authToken);
         navigate("/");
        }
        else
        {
            showAlert(json.error,'danger');
        }
        }
    }
  return (
    <div className='container my-5'>
      <form onSubmit={handleClick}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>        
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
  <label htmlFor="usertype" className="form-label">Register As:</label>
  <div>
  <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="usertype" id="inlineRadio1" value="student" checked={usertype==='student'} onChange={handleCheckBox}/>
  <label className="form-check-label" htmlFor="inlineRadio1">Student</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="usertype" id="inlineRadio2" value="teacher" checked={usertype==='teacher'} onChange={handleCheckBox}/>
  <label className="form-check-label" htmlFor="inlineRadio2">Teacher</label>
</div>
</div>
</div>
<div>
  <button type="submit" className="btn btn-primary mb-3 my-3 ">Submit</button>
  </div>
</form>
    </div>
  );
}

export default Signup;

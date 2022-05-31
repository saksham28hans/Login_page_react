import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import alertcontext from '../context/Alert/alertcontext';
import UserItem from './UserItem';
const Userdet = () => {
    const alcontext = useContext(alertcontext);
    const { showAlert } = alcontext;
    const navigate = useNavigate();
    const [users, setusers] = useState([]);
    const getusers = async () => {
        const response = await fetch(`http://localhost:5001/api/auth/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if (json.success) {
            setusers(json.user_det);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getusers();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line 
    }, []);

    const deleteRecord = async(id)=>{
        const response = await fetch(`http://localhost:5001/api/userdet/deleteuser/${id}`, {
            method: 'DELETE',          
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
        if(json.success)
        {
        const newusers = users.filter((user)=>{return user._id !== id});
        setusers(newusers);
        showAlert('Record Deleted Successfully','success');
        }
        else{
            showAlert(json.error,'danger');
        }
    }
    return (

        <div className="container my-5">
            <h2>List of Students and Teachers: </h2>
            <div className="container">
                {users.length === 0 && 'No Users to display'}
            </div>
            <table className="table my-3">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return <UserItem key={user._id} user={user} deleteRecord={deleteRecord} />
                    })}
                </tbody>
            </table>
        </div>

    );
}

export default Userdet;

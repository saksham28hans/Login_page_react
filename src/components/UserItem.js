import React from 'react';

const UserItem = (props) => {
    const capitalize = (word)=>{
        let lcase = word.toLowerCase();
        return lcase.charAt(0).toUpperCase() + lcase.slice(1);
     }
  return (
      <tr>
      <td>{props.user.name}</td>
      <td>{capitalize(props.user.usertype)}</td>
      <td><button className="btn btn-primary" style={{lineHeight:0.8}} onClick={()=>{props.deleteRecord(props.user._id)}}>Delete</button></td>
    </tr>
  );
}

export default UserItem;

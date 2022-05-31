import React from 'react';

const About = () => {
  return (
    <div className="container my-3">
      <h2>MyMegaMinds Internship Task</h2>
      <div className="my-3">
        <p>1. This application has Login and Signup feature.</p>
        <p>2. User can signup as Student or a Teacher and the role will be assigned to them accordingly.</p>
        <p>3. Admin user is created from Backend and only admin user has rights to delete/update user's account.</p>
        <p>4. Home page displays the users in the system and their type. Home page can only be accessed once the user has logged in.</p>
      </div>
    </div>
  );
}

export default About;

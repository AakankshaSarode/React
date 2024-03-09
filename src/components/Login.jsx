import React, { useState } from 'react';
import Header from './Header';
import { Link,useNavigate } from 'react-router-dom';
 import axios  from 'axios';

const Login = () => {
const navigate=useNavigate();
  const [username, setusername] = useState(" ");
  const [password, setpassword] = useState(" ");
  const handleApi = () => {
    console.log({ username, password });

    const url = " http://localhost:4000/login";
    const data = { username, password };
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          alert(res.data.message);
        

           if(res.data.token){
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userId',res.data.userId)
            navigate('/');
           }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SERVER ERROR");
      });
  };
  return (
    <div>
      <Header />
       welcome to login...
        <br />
        USERNAME
        <input type="text" value={username}
         onChange={(e)=>{
          setusername(e.target.value);
         }}/>
        <br />
    PASSWORD
        <input type="text" value={password}
         onChange={(e)=>{
          setpassword(e.target.value)
         }} />
        <br />
        <button onClick={handleApi}>LOGIN</button>
        <Link to="/signup">SIGNUP</Link>
    </div>
  );
}

export default Login;

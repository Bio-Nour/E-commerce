import { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const login = async()=>{
    console.log("login" ,formData);
    let responseData ;
    await fetch("http://localhost:3000/login" ,{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors
      )
    }

  }
  const signup = async()=>{
    console.log("sigin" ,formData);
    let responseData ;
    await fetch("http://localhost:3000/signup" ,{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors
      )
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Name" />
          ) : (
            <></>
          )}
          <input name="email" value={formData.email}onChange={changeHandler} type="email" placeholder="Email" />
          <input name="password" value={formData.password}onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} className="signup-btn">Continue</button>

        {/* check the state of the login */}
        {state==="Sign Up"? <p className="loginsignup-login">
          Already have an account? <span onClick={()=>{setState("Login")}}>login here</span>
        </p>:    <p className="loginsignup-login">
          Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span>
        </p>}
        
      
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p htmlFor="">By continue , I agree to the terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

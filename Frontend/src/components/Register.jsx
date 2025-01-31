import "./styles/Register.css";
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

function Register(){
  const [user, setUser] = useState({
    name : "",                                                                                                                                                                                                                                                                                                               
    email :"",
    password : ""
      
});
const [invalidtext, setInvalidtext] = useState("");

const navigate = useNavigate();

const changeHandler = (e) => {
  const { name, value } = e.target;
  setUser({ ...user, [name]: value });
  
  if(name==="password"&& value.length<8)
    {
      setInvalidtext("Password must contain 8 letters");
    }
    else if(name==="password"&&value.length>=8){
      setInvalidtext("");
    }
};
const gologin = ()=>{
  window.location.href=`/login`
}
  const submitHandler = async(e) => {
    e.preventDefault();
    console.log("submit handle");
    if(user.password.length<6) 
    {
        alert('password must contain 6 letters');
     }
    try{
        axios.post('https://safecyber-api.onrender.com/api/user-sign-up',user).then(res=>{
                alert("registered Succesfully!");
                 
 
                setUser({name:"",email:"",password:""});
              
               navigate('/home2', { state: { message: res.data.message } }); 

                
               
            }) 
           
    }
    catch(error){
        console.log('Error sending registration request',error);
    }
   
};
 

    return(
        <>
        <Header />
        <div class="div-register"> 
         <label class="label-register">this is register form</label><br></br>
        <form class="from-register" onSubmit={submitHandler} >
          <input class="input-register"  onChange={changeHandler} value={user.name} name='name' type='text' placeholder="enter name"  ></input><br></br>
          <input class="input-register"  onChange={changeHandler} value={user.email} name='email' type="email" placeholder='enter email:'></input><br></br>                                                                                                               
          <input class="input-register" onChange={changeHandler} value={user.password} name='password' type="password"  placeholder='enter password'></input>
          { invalidtext && <p className="register-error">{invalidtext}</p>}
          <button class="btn-register" type="submit">Submit</button>
        
        </form>     
        <p className="reg-to-log" onClick={gologin}>Already registered ? Click here to Login</p>   
        </div>
       
        </>
    )
}
export default Register;
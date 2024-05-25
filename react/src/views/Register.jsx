import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function Register() {
  
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post("/register", payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      }).catch(error => {
        const response = error.response;
        if(response && response.status === 422){
          setErrors(response.data.errors)
        }
      })
  }

    return (
      <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Register your account</h1>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}  
          </div>}
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={passwordConfirmationRef} type="password" placeholder="Confirm Password"/>
          <button className="btn btn-block">Register</button>
          <p className="message">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>
  </div>
    )
  }
  
  export default Register
  
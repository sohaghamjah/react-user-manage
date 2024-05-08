import { Link } from "react-router-dom";

function Register() {
    return (
      <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form>
          <h1 className="title">Register your account</h1>
          <input type="text" placeholder="Full Name"/>
          <input type="email" placeholder="Email Address"/>
          <input type="password" placeholder="Password"/>
          <input type="password" placeholder="Confirm Password"/>
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
  
import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form>
            <h1 className="title">Login into you account</h1>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button className="btn btn-block">Login</button>
            <p className="message">
              Not Registered? <Link to="/register">Create And Account</Link>
            </p>
          </form>
        </div>
    </div>
  )
}

export default Login

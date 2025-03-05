import { Link } from "react-router-dom"

export default function Login() {

    const onSubmit = (ev) => {
        ev.preventDefault()

    }

    return (
        <form onSubmit={onSubmit}>
        <h1 className="title">
            Log into your account
        </h1>
            <input type = "email" placeholder="Email"></input>
            <input type = "password" placeholder="Password"></input>
            <button className="btn btn-block">
                Login
            </button>
            <p className="message">
                Not Registered? <Link to = "/signup"> Create an account </Link>
            </p>
        </form> 
    )
} 
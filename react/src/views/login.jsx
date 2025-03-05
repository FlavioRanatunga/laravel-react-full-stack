import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axios-client";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log("Submitted Payload:", payLoad);  // Log to check what data is being sent

        axiosClient.post('/login', payLoad)
            .then(({ data }) => {
                console.log("Response Data:", data); // Log the response data
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status ==422) {
                    setErrors(response.data.errors)
                }
                    
            });

    }

    return (
        <form onSubmit={onSubmit}>
        <h1 className="title">
            Log into your account
        </h1>
        {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
        }
            <input ref={emailRef} type = "email" placeholder="Email"></input>
            <input ref={passwordRef} type = "password" placeholder="Password"></input>
            <button className="btn btn-block">
                Login
            </button>
            <p className="message">
                Not Registered? <Link to = "/signup"> Create an account </Link>
            </p>
        </form> 
    )
} 
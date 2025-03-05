import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axios-client";

export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value,
        };

        console.log("Submitted Payload:", payLoad);  // Log to check what data is being sent

        axiosClient.post('/signup', payLoad)
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
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Create an account
            </h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
            }

            <input ref={nameRef} placeholder="Full Name"></input>
            <input ref={emailRef} type="email" placeholder="Email Address"></input>
            <input ref={passwordRef} type="password" placeholder="Password"></input>
            <input ref={passwordConfirmRef} type="password" placeholder="Password Confirmation"></input>
            <button className="btn btn-block">
                Sign Up
            </button>
            <p className="message">
                Already Registered? <Link to="/login"> Sign In </Link>
            </p>
        </form>
    );
}

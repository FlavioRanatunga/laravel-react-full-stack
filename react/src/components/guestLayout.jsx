import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GuestLayout() {
    const { token } = useStateContext();
    const [animationClass, setAnimationClass] = useState("fadeInDown");

    useEffect(() => {
        setAnimationClass("fadeInDown");
        const timer = setTimeout(() => {
            setAnimationClass("");
        }, 1000); // Duration of the animation

        return () => clearTimeout(timer);
    }, []);

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className={`login-signup-form animated ${animationClass}`}>
            <div className={`form animated fadeInUp`}>
                <Outlet />
            </div>
        </div>
    );
}
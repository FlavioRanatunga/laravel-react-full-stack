import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate, Link } from "react-router-dom";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
            .catch(err => {
                console.error("Logout Error:", err.response ? err.response.data : err.message);
            });
    };

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(err => {
                console.error("User Fetch Error:", err.response ? err.response.data : err.message);
            });
    }, []);

    if (!token) {
        return <Navigate to="login" />;
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard"> Dashboard </Link>
                <Link to="/users"> Users </Link>
            </aside>
            <div className="content">
                <header>
                    <div className="header-left">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="header-right">
                        <span>{user.name}</span>
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <div className="ribbon">
                    <div className="ribbon-content">
                        <p>Welcome to the Dashboard</p>
                        <button className="btn">Get Started</button>
                    </div>
                </div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
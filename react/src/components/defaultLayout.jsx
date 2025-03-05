import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import { Navigate, Link } from "react-router-dom";



export default function DefaultLayout() {

    const {user, token} = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault()
    }

    if(!token)
    {
        return <Navigate to = "login"/>
    }

    return (
        <div id = "defaultLayout">
            <aside>
                <Link to ="/dashboard"> Dashboard </Link>
                <Link to ="/users"> Users </Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                    <div>
                        User Info
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>  
        </div>
    )
}
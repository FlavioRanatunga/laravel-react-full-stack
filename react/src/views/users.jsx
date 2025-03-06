import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data); // Assuming the data is in the 'data' property
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error fetching users:', error);
            });
    };

    const onDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            axiosClient.delete(`/users/${user.id}`)
                .then(() => {
                    console.log("Delete Success");
                    getUsers();
                })
                .catch(() => {
                    console.error("Delete Error");
                });
        } else {
            console.log("Delete Cancelled");
            return;
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/users/${user.id}`} className="btn btn-edit">Edit</Link>
                                        &nbsp;
                                        <button onClick={ev => onDelete(user)} className="btn btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
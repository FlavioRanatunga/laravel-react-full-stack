import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                    console.log('User data:', data); // Log the response data
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error fetching user data:', error);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);

        const request = user.id
            ? axiosClient.put(`/users/${user.id}`, user)
            : axiosClient.post('/users', user);

        request
            .then(({ data }) => {
                setLoading(false);
                console.log('User saved:', data);
                navigate('/users');
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.response?.data?.errors || {});
                console.error('Error saving user:', error);
            });
    };

    return (
        <>
            {user.id ? (
                <h1>Edit User</h1>
            ) : (
                <h1>Create User</h1>
            )}
            <div className="card animated fadeInDown">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={user.name}
                                onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={user.email}
                                onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <input
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                onChange={(ev) => setUser({ ...user, password_confirmation: ev.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-save">Save</button>
                        </div>
                    </form>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
            </div>
        </>
    );
}
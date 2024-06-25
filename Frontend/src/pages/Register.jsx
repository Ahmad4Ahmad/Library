import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToken } from "../auth/useToken";

export default function Register()
{
    const [token, setToken] = useToken();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const register = async (event) =>
    {
        event.preventDefault();
        const userData = {name, email, password};
        try
        {
            const response = await axios.post("http://localhost:5000/api/users/register", userData, {withCredentials: true});
            const {token} = response.data;
            setToken(token);
            navigate("/");
        }
        catch (error)
        {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <h2>Register</h2>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <div className="form-control">
                    <label htmlFor="name"><span className="label">User Name:</span></label>
                    <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="email"><span className="label">Email:</span></label>
                    <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="pass"><span className="label">Password:</span></label>
                    <input type="password" id="pass" name="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="confirm-pass"><span className="label">Confirm Password:</span></label>
                    <input type="password" id="confirm-pass" name="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}></input>
                </div>
                <button className="form-btn" disabled={!name || !email || !password || password !== confirmPassword} onClick={register}>Register</button>
                <span className="note">
                    <span>
                        Already have an account?&nbsp;
                        <Link to={"/signin"}>Sign In</Link>
                    </span>
                </span>
            </div>
        </div>
    );
}
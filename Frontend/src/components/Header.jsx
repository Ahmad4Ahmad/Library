import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";
import { useState } from "react";
import "./Header.css";

function Header()
{
    const [user, setUser] = useState(useUser());
    const navigate =  useNavigate();
    const onSignOut = () =>
    {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <header className="header">
            <Link to={"/"}>
                <img src="https://res.cloudinary.com/dvhclgitc/image/upload/v1704483450/Assets/logo_itgftq.png" alt="logo" className="logo" />
            </Link>
            <div className="btn">
                {user ? 
                    <>
                        <Link to="/profile" className="name"><p>{user.name}</p></Link>
                        <button onClick={onSignOut}>Sign Out</button>
                    </>
                    :
                    <>
                        <Link to={"/signin"}><button>Sign In</button></Link>
                        <Link to={"/register"}><button className="alt">Register</button></Link>
                    </>
                }
            </div>
        </header>
    );
}

export default Header;
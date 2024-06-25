import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar()
{
    return (
        <nav className="sidebar">
            <Link to="/profile">
                <p className="bar-item button">Profile</p>
            </Link>
            <Link to="/editprofile">
                <p className="bar-item button">Edit Profile</p>
            </Link>
            <Link to="/addbook">
                <p className="bar-item button">Add Book</p>
            </Link>
            <Link to="/uploads">
                <p className="bar-item button">Uploads</p>
            </Link>
        </nav>
    );
}

export default Sidebar;
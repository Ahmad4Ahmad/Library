import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer()
{
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                </li>
                <li>
                    <Link to={"/about"}>About</Link>
                </li>
                <li>
                    <Link to={"/contact-us"}>Contact us</Link>
                </li>
            </ul>
            <p>© Copyright {year} Library <br></br> All Rights Reserved.</p>
        </div>
    );
}
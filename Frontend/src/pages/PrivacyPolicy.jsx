import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Privacy()
{
    return (
        <>
            <Header></Header>
            <br></br>
            <br></br>
            <div style={{"margin": "60px auto", "width": "60%"}}>
                <h1>Privacy Policy</h1>
                <h3>Last updated: 30 January, 2024</h3>
                <p>
                    Thank you for using our LIBRARY. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use our Service.
                </p>
                <h2>Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul>
                    <li>
                        <p>
                            <strong>Personal Information:</strong> When you create an account 
                            or use certain features of the Service, we may collect personally 
                            identifiable information, such as your name, email address, and any 
                            other information you provide voluntarily.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Usage Data:</strong> We may collect information about your use of the Service, such as the
                            pages you visit, the features you use, and how you interact with the Service.
                        </p>
                    </li>
                </ul>
                <h2>How We Use Your Information</h2>
                <p>We may use the information we collect for various purposes, including:</p>
                <ul>
                    <li>
                        <p>To provide, maintain, and improve the Service.</p>
                    </li>
                    <li>
                        <p>
                            To personalize your experience and deliver content and product offerings relevant to your interests.
                        </p>
                    </li>
                    <li>
                        <p>To respond to your comments, questions, and requests.</p>
                    </li>
                    <li>
                        <p>To monitor and analyze usage patterns and trends.</p>
                    </li>
                </ul>
                <h2>Disclosure of Your Information</h2>
                <p>We may share your information with third parties for the following purposes:</p>
                <ul>
                    <li>
                        <p>With your consent.</p>
                    </li>
                    <li>
                        <p>To comply with legal obligations.</p>
                    </li>
                    <li>
                        <p>To protect and defend our rights and property.</p>
                    </li>
                </ul>
                <h2>Security</h2>
                <p>
                    We are committed to protecting the security of your information. While no method of transmission over the Internet or electronic
                    storage is 100% secure, we implement reasonable security measures to protect your information.
                </p>
                <h2>Your Choices</h2>
                <p>You may choose not to provide certain information, but it may limit your ability to use certain features of the Service.</p>
                <h2>Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Please review this page periodically for any changes.</p>
                <h2>Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please <Link to={"/contact-us"}>contact us</Link></p>
            </div>
            <Footer></Footer>
        </>
    );
}
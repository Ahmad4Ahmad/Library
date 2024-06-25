import About from "./pages/About";
import Book from "./pages/Book";
import Contact from "./pages/ContactUs";
import Home from "./pages/Home";
import Privacy from "./pages/PrivacyPolicy";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Layout from "./components/Layout";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import AddBook from "./pages/AddBook";
import Uploads from "./pages/Uploads";
import Library from "./pages/Library";
import EditBook from "./pages/EditBook";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/signin" element={<SignIn></SignIn>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/book/:bookId" element={<Book></Book>}></Route>
                <Route path="/privacy-policy" element={<Privacy></Privacy>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/contact-us" element={<Contact></Contact>}></Route>
                <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
                <Route path="/profile" element={<PrivateRoute/>}>
                    <Route path="/profile" element={<Layout><UserProfile></UserProfile></Layout>}/>
                </Route>
                <Route path="/editprofile" element={<PrivateRoute/>}>
                    <Route path="/editprofile" element={<Layout><EditProfile></EditProfile></Layout>}></Route>
                </Route>
                <Route path="/changepassword" element={<PrivateRoute/>}>
                    <Route path="/changepassword" element={<ChangePassword></ChangePassword>}></Route>
                </Route>
                <Route path="/resetpassword/:resetToken" element={<ResetPassword></ResetPassword>}></Route>
                <Route path="/addbook" element={<PrivateRoute/>}>
                    <Route path="/addbook" element={<Layout><AddBook></AddBook></Layout>}></Route>
                </Route>
                <Route path="/uploads" element={<PrivateRoute/>}>
                    <Route path="/uploads" element={<Layout><Uploads></Uploads></Layout>}></Route>
                </Route>
                <Route path="/library/:author" element={<Library></Library>}></Route>
                <Route path="/uploads/editbook/:bookId" element={<PrivateRoute/>}>
                    <Route path="/uploads/editbook/:bookId" element={<Layout><EditBook></EditBook></Layout>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../auth/useToken";
import { Link, useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile()
{
    const navigate = useNavigate();
    const initialState = 
    {
        name: "",
        email: "",
        photo: ""
    };

    const [token] = useToken();
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");
    useEffect(() =>
    {
        async function getUserData()
        {
            const response = await axios.get("http://localhost:5000/api/users/getuser", {headers: {Authorization: token}});
            setProfile(response.data);
        }

        getUserData();
    }, []);

    const handleInputChange = (event) =>
    {
        const {name, value} = event.target;
        setProfile({...profile, [name]: value});
    };

    const handleImageChange = (event) =>
    {
        setProfileImage(event.target.files[0]);
    };

    const saveProfile = async (event) =>
    {
        event.preventDefault();
        try
        {
            let imageURL;
            if (profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png"))
            {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", "dvhclgitc");
                image.append("upload_preset", "rtllee3x");
                image.append("folder", "/Users");
                const response = await fetch("https://api.cloudinary.com/v1_1/dvhclgitc/image/upload", {method: "post", body: image});
                const imgData = await response.json();
                imageURL = imgData.url.toString();
            }

            const formData = 
            {
                name: profile.name,
                email: profile.email,
                photo: profileImage ? imageURL : profile.photo
            }

            await axios.patch("http://localhost:5000/api/users/updateuser", formData, {headers: {Authorization: token}});
            navigate("/profile");
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={saveProfile}>
                <div className="form-edit">
                    <div className="form-control">
                        <label htmlFor="email"><span className="label">Email Address:</span></label>
                        <input value={profile.email} type="email" name="email" onChange={handleInputChange} disabled></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name"><span className="label">User Name:</span></label>
                        <input value={profile.name} type="text" id="name" name="name" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="file"><span className="label">Photo:</span></label>
                        <input type="file" id="file" name="file" onChange={handleImageChange}></input>
                    </div>
                    <span className="note">
                        <span>
                            <Link to={"/changepassword"}>Change password?</Link>
                        </span>
                    </span>
                    <div className="btn-edit">
                        <button type="submit">edit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
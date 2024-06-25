import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";
import "./UserProfile.css";

function UserProfile()
{
    const [token] = useToken();
    const [profile, setProfile] = useState(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() =>
    {
        async function getUserData()
        {
            const response = await axios.get("http://localhost:5000/api/users/getuser", {headers: {Authorization: token}});
            setProfile(response.data);
        }

        getUserData();
    }, []);

    const deleteAccount = async (id) =>
    {
        try
        {
            profile.uploads.map(async (bookId) =>
            {
                await axios.delete(`http://localhost:5000/api/books/${bookId}`, {headers: {Authorization: token}});
            })
            await axios.delete(`http://localhost:5000/api/users/deleteuser/${id}`, {headers: {Authorization: token}});
            setOpenConfirmationModal(false);
            localStorage.removeItem("token");
            navigate("/");
        }
        catch (error)
        {
            console.error(error);
        }
    };

    return (
        <>
            <div className="avatar">
                <img className="avatar-photo" src={profile?.photo} alt="avatar" />
            </div>
            <div className="user-data">Name: {profile?.name}</div>
            <div className="user-data">Email: {profile?.email}</div>
            <span className="note">
                <span onClick={() => setOpenConfirmationModal(true)}>
                    Delete Account
                </span>
            </span>
            {openConfirmationModal && <ConfirmationModal message={"Are you sure you want to delete your account?"} title={"Delete Account"} delete={() => deleteAccount(profile._id)} setOpenModal={setOpenConfirmationModal}></ConfirmationModal>}
        </>
    );
}

export default UserProfile;
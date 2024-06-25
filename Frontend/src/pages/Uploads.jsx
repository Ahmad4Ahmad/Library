import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToken } from "../auth/useToken";
import "./Uploads.css";

function Uploads()
{
    const [token] = useToken();
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState("");
    const [uploads, setUploads] = useState([]);
    useEffect(() => 
    {
        const getUploads = async () =>
        {
            try
            {
                const response = await axios.get("http://localhost:5000/api/users/uploads", {headers: {Authorization: token}});
                setUploads(response.data);
            }
            catch (error) 
            {
                console.error(error);
            };
        };

        getUploads();
    }, []);

    const handleDelete = (bookId) =>
    {
        setOpenConfirmationModal(true);
        setBookToDelete(bookId);
    };

    const deleteBook = async () =>
    {
        try
        {
            const response = await axios.delete(`http://localhost:5000/api/books/${bookToDelete}`, {headers: {Authorization: token}});
            setUploads(response.data);
            setOpenConfirmationModal(false);
        }
        catch (error) 
        {
            console.error(error);
        };
    };

    return (
        <div className="uploads">
            {uploads?.length === 0 ? (<p>No books found</p>) : 
            (
                uploads?.map((book) => 
                {
                    const {_id, title} = book;
                    return (
                        <div className="booklist-item" key={_id}>
                            <Link to={`/book/${_id}`}><p>{title}</p></Link>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="delete" height="30" viewBox="0 96 960 960" width="30" onClick={() => handleDelete(_id)} cursor={"pointer"}>
                                    <path fill="red" d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/>
                                </svg>
                                <Link to={`/uploads/editbook/${_id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
                                        <path fill="#0376b8" d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                })
            )}
            {openConfirmationModal && <ConfirmationModal message={"Are you sure you want to delete this book?"} title={"Delete Book"} delete={deleteBook} setOpenModal={setOpenConfirmationModal}></ConfirmationModal>}
        </div>
    );
}

export default Uploads;
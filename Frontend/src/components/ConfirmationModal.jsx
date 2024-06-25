import "./ConfirmationModal.css";

function ConfirmationModal(props)
{
    const handleModal = (event) =>
    {
        if (event.target.className === "modal")
        {
            props.setOpenModal(false);
        }

        return;
    };

    return (
        <div className="modal" onClick={handleModal}>
            <div className="modal-container">
                <div className="modal-header">
                    <p>{props.title}</p>
                    <svg cursor={"pointer"} onClick={() => props.setOpenModal(false)} xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <div className="modal-body">
                    <p className="message">{props.message}</p>
                    <div className="modal-footer">
                        <button onClick={() => props.delete()}>Delete</button>
                        <button className="alt" onClick={() => props.setOpenModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;
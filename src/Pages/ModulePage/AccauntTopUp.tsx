import {AccauntTopUpStyle} from "./AccauntTopUpStyle";

const AccauntTopUpModal = ({onClose}) => {
    return (
        <div>
            <div className="modal" style={AccauntTopUpStyle.module}>
                <div className="modal-content" style={AccauntTopUpStyle.modalContent}>
                    <div className="modal-header">
                        <h2 className="modal-title">Поповнення</h2>
                        <button className="modal-close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Поповнення рахунку</p>
                    </div>
                </div>
            </div>  
        </div>
    )
}
    
export default AccauntTopUpModal;
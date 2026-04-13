import {useEffect} from "react";
import {AccauntTopUpStyle} from "./steles.ts";

const AccauntTopUpModal = ({onClose}) => {
    useEffect(() => {
        const prevBody = document.body.style.overflow;
        const prevHtml = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevBody;
            document.documentElement.style.overflow = prevHtml;
        };
    }, []);

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
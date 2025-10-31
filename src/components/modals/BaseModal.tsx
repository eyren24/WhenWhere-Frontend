import Modal from 'react-modal';
import '../../assets/css/modals/baseModal.css';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    width?: string; // tipo "500px"
}

export const BaseModal = ({ isOpen, onClose, children, title, width = "500px" }: BaseModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="base-modal"
            overlayClassName="base-modal-overlay"
            ariaHideApp={false}
            contentLabel={title || "Modale"}
            style={{
                content: {
                    maxWidth: width,
                },
            }}
        >
            {title && <h2 className="base-modal-title">{title}</h2>}
            {children}
        </Modal>
    );
};

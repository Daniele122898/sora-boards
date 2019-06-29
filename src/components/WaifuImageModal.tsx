import React from 'react';
import Modal from 'react-modal';

const WaifuImageModal = ({modalOpen, onModalClose, imageUrl} :
    { modalOpen: boolean, onModalClose: () => void, imageUrl: string}) => (
    <Modal
        isOpen={modalOpen}
        onRequestClose={onModalClose}
        contentLabel="Show Waifu Image"
        closeTimeoutMS={100}
        className="modal-waifu"
        style={{
            overlay: {
              backgroundColor: 'rgb(136, 136, 136, 0.50)'
            },
        }}
    >
        <img src={imageUrl} alt="Image" />
    </Modal>
);

export default WaifuImageModal;
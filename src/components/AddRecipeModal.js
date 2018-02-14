import React from 'react';
import Modal from 'react-modal';
import CreateRecipe from './CreateRecipe';

const AddRecipeModal = (props) => {
    return (
        <Modal 
            isOpen={props.open}
            contentLabel="Add Recipe"
            closeTimeoutMS={200}
            shouldCloseOnOverlayClick={true}
            className='modal'
        >
            {props.children}
        </Modal>
    );
}

export default AddRecipeModal;
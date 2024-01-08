import React from 'react';
import { useModal } from '../../context/Modal';

function OpenCommentDelete({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <i id="comment-delete" className='fa-solid fa-trash' onClick={onClick}>{buttonText}</i>
  );
}

export default OpenCommentDelete;

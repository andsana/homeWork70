import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import {selectContact, selectDeleteLoading, selectShowModal, showModal} from '../../store/contactSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Link} from 'react-router-dom';
import {deleteContact} from '../../store/contactThunks';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const isShow = useAppSelector(selectShowModal);
  const contact = useAppSelector(selectContact);

  const onInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';

  let modalContent = null;

  if (contact) {
    const image = contact.photo || imageUrl;
    const imageStyle = {
      background: `url(${image}) no-repeat center center / cover`,
      overflow: 'hidden',
    };

    modalContent = (
      <>
        <Backdrop show={isShow} onClick={() => dispatch(showModal(contact))} />
        <div className="modal show" style={{ display: isShow ? 'block' : 'none' }} onClick={() => dispatch(showModal(contact))}>
          <div className="modal-dialog" onClick={onInnerClick}>
            <div className="modal-content">
              <div className="modal-body">
                <div className="row g-0">
                  <div className="col-md-4" style={imageStyle} />
                  <div className="col-md-8 text-center">
                    <h4 className="modal-title">{contact.name}</h4>
                    <p className="modal-text">Phone: {contact.phone}</p>
                    <p className="modal-text">Email: {contact.email ? contact.email : 'Not available'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link to={'/edit-contact/' + contact.id} className="btn btn-primary"  onClick={() => dispatch(showModal(contact))}>Edit</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {dispatch(deleteContact(contact.id)); dispatch(showModal(contact));}}
                  disabled={deleteLoading ? deleteLoading === contact.id : false}
                >
                  {deleteLoading && deleteLoading === contact.id && <ButtonSpinner />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{modalContent}</>;
};

export default Modal;

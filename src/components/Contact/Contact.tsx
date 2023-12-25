import React from 'react';
import {Contact} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {showModal} from "../../store/contactSlice";

interface Props {
  contact: Contact;
}

const Contact: React.FC<Props> = ({contact}) => {
  const dispatch = useAppDispatch();
  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
  const image = contact.photo || imageUrl;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`,
    overflow: 'hidden',
  };

  return (
    <div className="card mb-3" style={{maxWidth: "300px"}} onClick={() => dispatch(showModal(contact))}>
      <div className="row g-0">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-text">{contact.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
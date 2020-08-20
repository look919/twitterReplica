import React, { useState, Fragment } from 'react';
import Input from '../../smallParts/Input';

import { EditProfilePhoto } from '../../../img/Svgs';

const EditProfile = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    at: '',
    photo: '',
    backgroundImage: '',
    description: '',
    link: '',
    city: '',
    loading: false,
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onPhotoChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };
  const onBackgroundChange = (e) => {
    setFormData({
      ...formData,
      backgroundImage: e.target.files[0],
    });
  };

  const handleUpdate = () => {
    console.log('test');
  };

  if (!profile) return null;

  return (
    <div className='editProfile'>
      <div className='editProfile__heading'>
        <h2 className='heading-2'>Edit your profile</h2>
        <button
          onClick={handleUpdate}
          className='btn editProfile__heading__btn'
        >
          Update
        </button>
      </div>
      <Input
        type='text'
        name='name'
        text={profile.name}
        value={formData.name}
        onChange={onChange}
        length={50}
      />
      <Input
        type='text'
        name='at'
        text={profile.at}
        value={formData.at}
        onChange={onChange}
        length={50}
      />
      <div className='input-container'>
        <input
          type='file'
          className='input--file'
          accept='image/*'
          text={'Photo'}
          onChange={onPhotoChange}
          id={'photo'}
        />
        <label htmlFor={'photo'} className='input label'>
          <EditProfilePhoto className={'input--file__icon'} />{' '}
          <span className='input--file__text'>
            {formData.photo
              ? `Choosed: ${formData.photo.name}`
              : 'Choose photo'}
          </span>
        </label>
        <p className='input-container__p'>Photo</p>
      </div>
      <div className='input-container'>
        <input
          type='file'
          accept='image/*'
          className='input--file'
          text={'Background Photo'}
          onChange={onBackgroundChange}
          id={'background'}
        />
        <label htmlFor={'background'} className='input label'>
          <EditProfilePhoto className={'input--file__icon'} />{' '}
          <span className='input--file__text'>
            {formData.photo
              ? `Choosed: ${formData.backgroundImage.name}`
              : 'Choose background photo'}
          </span>
        </label>
        <p className='input-container__p'>Background Photo</p>
      </div>

      <Input
        type='text'
        name='description'
        text={'Bio'}
        value={formData.description}
        onChange={onChange}
        length={240}
      />
      <Input
        type='text'
        name='city'
        text={'City'}
        value={formData.city}
        onChange={onChange}
        length={50}
      />
      <Input
        type='website'
        name='link'
        text={'WWW'}
        value={formData.link}
        onChange={onChange}
        length={50}
      />
    </div>
  );
};

export default EditProfile;


import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';

const Registration = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRegisterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <button onClick={handleRegisterClick}>Register</button>

      {showModal && <RegistrationForm onClose={handleCloseModal} />}
    </div>
  );
};

export default Registration;

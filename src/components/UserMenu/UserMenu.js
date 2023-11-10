import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const navigate = useNavigate();

  const handleLogout = () => {};

  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;

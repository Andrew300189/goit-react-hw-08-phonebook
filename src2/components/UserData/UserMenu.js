// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../redux/authSlice'; // Замените путь на соответствующий
// import { selectUserEmail } from '../redux/authSlice'; // Замените путь на соответствующий

// const UserMenu = () => {
//   const dispatch = useDispatch();
//   const userEmail = useSelector(selectUserEmail); // Предполагается, что у вас есть селектор для получения почты пользователя из хранилища

//   const handleLogout = () => {
//     dispatch(logoutUser())
//       .unwrap()
//       .then(/* обработка успешного выхода из учетной записи */)
//       .catch(/* обработка ошибки выхода из учетной записи */);
//   };

//   return (
//     <div>
//       <p>{userEmail}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default UserMenu;

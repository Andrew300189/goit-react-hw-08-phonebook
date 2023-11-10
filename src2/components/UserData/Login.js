// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../redux/authSlice';

// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       // обработка ошибки, если поля не заполнены
//       return;
//     }

//     dispatch(loginUser({ email, password }))
//       .unwrap()
//       .then((/* обработка успешного входа пользователя */) => {
//         // перенаправление на защищенную страницу после успешного входа
//       })
//       .catch((/* обработка ошибки входа пользователя */) => {
//         // обработка ошибки входа
//       });
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

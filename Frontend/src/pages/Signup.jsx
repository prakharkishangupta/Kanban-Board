// import { useState } from "react";
// import api from "../api/axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const submit = async () => {
//     await api.post("/user/signup", form);
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      
//       <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-10">
        
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Create Account
//         </h2>

//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="auth-input"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email Address"
//           className="auth-input mt-4"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         {/* Password */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="auth-input mt-4"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         {/* Button */}
//         <button
//           onClick={submit}
//           className="auth-button mt-6"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

 

  const { name, email, password } = formData;

  const onChange = (e) => {
    
      setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    console.log("formData : ", formData);
    console.log("name, email, password : ", name, email, password);
    // data.append('name', name);
    // data.append('email', email);
    // data.append('password', password);
    // console.log("data : ", data.name);
    try {
      const res = await api.post('/user/signup', {name, email, password}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      toast.success("Login successful!");
      navigate('/login');
      // Handle success (e.g., display a success message or redirect)
    } catch (err) {
      console.error(err.response.data);
      // Handle error (e.g., display error messages)
    }
  };

  return (
    <>
    <div className="flex items-center justify-center py-40">
      <form onSubmit={onSubmit} className=" items-center justify-center border border-white space-y-3  px-6 py-3 rounded-md  w-[50vh]">
        <h1><span className="font-bold text-3xl text-blue-500">Kanban Board</span></h1>
        <h2 className="text-2xl font-semibold items-center">Create an <span className="text-blue-600">Account</span> </h2>
        <div className="space-y-3">
          
            {/* Name */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" name="name" value={formData.name}
              onChange={onChange}
              className="grow" placeholder="Name" required />
            </label>
          
            {/* Email */}
            <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" name="email" value={formData.email}
              onChange={onChange} className="grow" placeholder="Email" required />
          </label>
          
          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" name="password"
              value={formData.password}
              onChange={onChange} className="grow" placeholder="password" required />
          </label>

          
          
        </div>
        <div className=" flex justify-center">
            
            <input type="submit" value="Signup" className="text-white bg-blue-600 cursor-pointer rounded-lg w-full py-2" />
        </div>
        <p>Already have an Account? <span onClick={()=> navigate('/login')} className="text-blue-600 cursor-pointer underline" >Login</span></p>
      </form>
    </div>

    </>
  );
};

export default Signup;

import React, { useState } from 'react'


 const Login = ({onLogin}) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("")
  const [error,setError]=useState("");
  
   const handleSubmit = (e) => {
    e.preventDefault();
     
    if(!email || !password){
        setError("Email & password are required");
        return;
    }
     const token = "mock-token-12345";

    localStorage.setItem("token", token);

    onLogin(); 

   };

  return (
 
      <div className="p-15 m-10">
        <h2 className='text-2xl ml-20 mt-20  text-slate-700 font-bold'>Login</h2>

        <form className='m-5 mt-0 w-full p-10 m-7rounded-md ' onSubmit={handleSubmit} >
         
          <input className="m-3 px-10  py-2 border border-slate-300 text-sm rounded-md outline-none" type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} /> <br />

          <input className="m-3  px-10 py-2 border border-slate-300 text-sm rounded-md outline-none" type="text" placeholder='Enter Username' value={username} onChange={(e)=> setUsername(e.target.value)} /> <br />


           <input className="m-3 px-10 py-2 border border-slate-300 text-sm rounded-md outline-none" type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} /> <br />


            {error && <p className='text-red-700'>{error}</p>}
            <button className="btn bg-blue-300 text-white p-2 m-2 rounded w-30px"  type='submit'>Login</button>
          
        </form>
      </div>


 
  )
}

export default Login

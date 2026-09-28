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
 <div className='w-full h-screen flex flex-wrap justify-center items-center backdrop-blur-sm bg-black/30'>
  <div className='w-full text-center'>
         <div className='w-full max-w-md mx-auto border border-gray-60x rounded-lg  backdrop-blur-sm bg-white'>
        <h2 className='text-2xl  mt-10 text-slate-700 font-bold'>Login</h2>

        <form className=' w-full rounded-md ' onSubmit={handleSubmit} >
         
          <input className="m-3 px-10  py-2 border border-slate-400 text-sm rounded-md outline-none" type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} /> <br />

          <input className="m-3  px-10 py-2 border border-slate-400 text-sm rounded-md outline-none" type="text" placeholder='Enter Username' value={username} onChange={(e)=> setUsername(e.target.value)} /> <br />


           <input className="m-3 px-10 py-2 border border-slate-400 text-sm rounded-md outline-none" type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} /> <br />


            {error && <p className='text-red-700'>{error}</p>}
            <button className="btn bg-slate-800 text-white p-3 m-2 rounded w-30px"  type='submit'>Login</button>
          
        </form>
        </div>
    </div>
</div>

 
  )
}

export default Login

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
 
      <div className="Login">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} />

          <input type="text" placeholder='Enter Username' value={username} onChange={(e)=> setUsername(e.target.value)} />


           <input type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)} />

            {error && <p>{error}</p>}
            <button type='submit'>Login</button>
        </form>
      </div>


 
  )
}

export default Login

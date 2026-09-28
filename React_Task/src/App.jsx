import { useState,useEffect } from 'react';
import Form from "./Form";
import List from "./List";
import Login from "./Login";
import useUsers from "./hook/useUsers";


const App = ()=> {

  const [isLogin,setLogin]=useState(!!localStorage.getItem("token"));

  const [edit,setEdit] = useState(null);
  const {getUser} = useUsers();
 
  useEffect(()=>{
    if(isLogin){
      getUser();
    }
  },[isLogin]);

  const handleLogin =()=>{
    setLogin(true);
  };

  if(!isLogin){
    return <Login onLogin={handleLogin}/>;
  }
  return (
     <div className='h-screen lg:flex  bg-black text-white '>
       <div className='lg:w-1/2 bg-black/30'>
       <h1 className='text-4xl font-bold'>User Management</h1>

      <button className='px-5 py-2 m-2  h-10 cursor-pointer active:scale-95 bg-red-500  text-xs rounded font-bold text-white' onClick={()=>{
          localStorage.removeItem('token') 
        setLogin(false)
        }}>Logout
        </button> 
  
      <Form edit={edit} setEdit={setEdit} />
        </div>
        <div className='lg:w-1/2'>
      <List setEdit={setEdit}/> </div>
    </div>
  )
}

export default App

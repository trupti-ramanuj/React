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
    <div className='container'>
      <h1>User Management</h1>

        <button onClick={()=>{
          localStorage.removeItem('token') 
        setLogin(false)
        }}>Logout
        </button>
  
      <Form edit={edit} setEdit={setEdit} />
      <List setEdit={setEdit}/>
    </div>
  )
}

export default App

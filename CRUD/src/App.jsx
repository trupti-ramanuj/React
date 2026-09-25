import { useEffect, useState } from 'react'
import { Data } from './Data';

function App() {
   const [data,setData] = useState([]);

   const [email,SetEmail] = useState('')

   const [username,SetUsername] = useState('')

   const [password,SetPassword] = useState('')

   const [firstname,SetFirstname] = useState('')

   const [lastname,SetLastname] = useState('')


   const [phone,SetPhone] = useState('')
      
   const [id,setId]=useState('')
   
   const[update,setUpdate]= useState(false)
   
   useEffect(()=>{
    setData(Data)
   },[]);


    const handleSave=(e)=>{
      let error = "";
      if(email === "")
         error += 'email name is requard'
      
      if(username === "")
         error += 'username name is requard'
           
      if(password === "")
         error += 'password name is requard'
      
      if(firstname === "")
         error += 'firstname is requard'
      
      if(lastname === "")
         error += 'lastname is requard'
      
      if(phone <= 0)
         error += 'phone is requard'
       
        if(error === ''){
         
          e.preventDefault();
      const dt = [...data];
      const newObject = {
        
    "id": Data.length + 1,
    "email": firstname,
    "username": lastname,
    "password": password,
    "firstname": firstname,
    "lastname": lastname,
    "phone": phone,
  
  }

      dt.push(newObject);
      setData(dt);
}

      else{
        alert(error);
      }
    
   }

   const handleUpdate=()=>{
     const index =data.map((item)=>{
             return item.id
     }).indexOf(id);
     const dt= [...data];
      dt[index].email = email;
      dt[index].username = username;
      dt[index].password = password;
      dt[index].firstname = firstname;
      dt[index].lastname = lastname;

      setData(dt);
      handleClear();
   }
   const handleClear=()=>{
    setId(0);
    SetEmail('');
    SetUsername('');
    SetPassword('');
    SetFirstname('');
    SetLastname('');
    SetPhone('');
    setUpdate(false);
   }
   
    const handleEdite=(id)=>{
       const dt = data.filter(item => item.id === id)
       if(dt !== undefined){
        setUpdate(true)
        SetEmail(dt[0].email);
        SetUsername(dt[0].username);
        SetPassword(dt[0].password);
        SetFirstname(dt[0].firstname);
        SetLastname(dt[0].lastname);
        SetPhone(dt[0].phone);

       }
   }

   
    const handleDelete=(id)=>{
 
    if(id>0){
      if(window.confirm("Are You sure to delete this item ?")){
      const dt = data.filter(item => item.id !== id);
      setData(dt)
      }
    }
   }
  return (
    <>
    <div className=' d-flex flex-column '>

       <label className='p-1' >Email:
          <input type="email" placeholder='Enter email' onChange={(e)=>SetEmail(e.target.value)} value={email}/>
        </label>
         <label className='p-1' >User Name:
          <input type="text" placeholder='Enter User name' onChange={(e)=>SetUsername(e.target.value)} value={username}/>
        </label>
         <label className='p-1'>Password:
          <input type="password" placeholder='Enter password'onChange={(e)=>SetPassword(e.target.value)} value={password}/>
        </label>
        
        <label className='p-1'>First Name:
          <input type="text" placeholder='Enter First name' onChange={(e)=>SetFirstname(e.target.value)}  value={firstname}/>
        </label>
         <label className='p-1'>Last Name:
          <input type="text" placeholder='Enter Last name' onChange={(e)=>SetLastname(e.target.value)} value={lastname}/>
        </label>
         <label className='p-1'>Phone No.:
          <input type="number" placeholder='Enter First name' onChange={(e)=>SetPhone(e.target.value)} value={phone}/>
        </label>
        <div> 
           {
            !update ?
             <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button>
             :
              <button className='btn btn-primary' onClick={()=>handleUpdate()}>Update</button>

           }
          
          <button className='btn btn-danger' onClick={()=>handleClear(item.id)}>Clear</button>
        </div>
        
    </div>

      <table className='table table-hover'>
        <thead>
        <tr>
          <td>Sr.No</td>
          <td>Id</td>
          <td>Email</td>
          <td>User Name</td>
          <td>PassWord</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Phone No.</td>
          <td>Actions</td>
        </tr>
        </thead>
        <tbody>
          {
            data.map((item,index)=>{
              return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button className='btn btn-primary' onClick={()=>handleEdite(item.id)}>Edit</button>&nbsp;
                      <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App

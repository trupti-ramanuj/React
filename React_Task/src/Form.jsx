import { useState,useEffect } from "react";
import useUsers from "./hook/useUsers";

const Form =({edit,setEdit})=>{

    const {add,update}=useUsers();
    const [form, setForm]=useState({
        name : "",
        email:"",
        username:"",
        phone:"",

    });

    useEffect(()=>{
        if(edit){
            setForm({
                name: edit?.name,
                email:edit?.email,
                username:edit?.username,
                phone:edit?.phone,
            });
        }
    },[edit]);

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(
            
            !form.email ||
            !form.username ||
            !form.phone
        ){
            alert("All fields are required");
            return;
        }
        if(edit){
            await update(edit?.id,{
                ...form,
                id:edit?.id,
            });
            setEdit(null);
        }else{
            await add(form);
        }
        setForm({
            name:"",
            email:"",
            username:"",
            phone:""
        });
    }
    return(
      <form onSubmit={handleSubmit} className='p-10 gap-4 flex-col lg:w-1/2 items-start p-10' >
            <h2  className='leading-tight text-lg font-bold'>{edit?"Edit":"Add"}</h2>
            <input className=' px-5 text-black w-full font-medium py-2 border-2 outline-none rounded' name="name" placeholder="Name" value={form.username} onChange={handleChange}/> 
            <input className='mt-5 px-5 text-black w-full font-medium py-2 border-2 outline-none rounded' name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className='mt-5 px-5 text-black w-full font-medium py-2 border-2 outline-none rounded' name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <input className='mt-5 px-5 text-black w-full font-medium py-2 border-2 outline-none rounded' name="phone" placeholder="phone" value={form.phone} onChange={handleChange}/>

            <button className="btn bg-blue-600 text-white p-3 w-20 m-2 rounded" type="submit">{edit?"Update":"Add"}</button>

            {edit && ( <button className="btn bg-red-600 text-white p-3 rounded" type="submit" onClick={()=>setEdit(null)}> Cancel</button>)}

        </form>
    )
}

export default Form
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
        <form className="bg-yellow-200 m-5 p-4  " onSubmit={handleSubmit}>
            <h2 className="text-2xl">{edit?"Edit":"Add"}</h2>
            <input className="mt-1 px-3 py-2 border border-slate-300 text-sm rounded-md outline-none" name="name" placeholder="Name" value={form.username} onChange={handleChange}/>
            <input className="mt-1 px-3 py-2 border border-slate-300 text-sm rounded-md outline-none" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className="mt-1 px-3 py-2 border border-slate-300 text-sm rounded-md outline-none" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <input className="mt-1 px-3 py-2 border border-slate-300 text-sm rounded-md outline-none" name="phone" placeholder="phone" value={form.phone} onChange={handleChange}/>

            <button className="btn bg-blue-300 text-white p-2 m-2 rounded" type="submit">{edit?"Update":"Add"}</button>

            {edit && ( <button className="btn bg-red-300 text-white p-2 rounded" type="submit" onClick={()=>setEdit(null)}> Cancel</button>)}

        </form>
    )
}

export default Form
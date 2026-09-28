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
                name: edit.name,
                email:edit.email,
                username:edit.username,
                phone:edit.phone,
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
            !form.name ||
            !form.email ||
            !form.username ||
            !form.phone
        ){
            alert("All fields are required");
            return;

        }
        if(edit){
            await update(edit.id,{
                ...form,
                id:edit.id,
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
        <form onSubmit={handleSubmit}>
            <h2>{edit?"Edit":"Add"}</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <input name="phone" placeholder="phone" value={form.phone} onChange={handleChange}/>

            <button type="submit">{edit?"Update":"Add"}</button>

            {edit && ( <button type="button" onClick={()=>setEdit(null)}> Cancel</button>)}

        </form>
    )
}

export default Form
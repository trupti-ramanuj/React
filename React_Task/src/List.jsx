import useUsers from "./hook/useUsers";

const List = ({setEdit})=>{
    const { users, loading, error, deleteUser } = useUsers();

    if(loading){
        return <h3>Loding users</h3>
    }
    if(error){
        return <h3>{error}</h3>
    }
    if(users?.length === 0){
        return <h3>No user</h3>
    }
    return(
        <div className=" p-15 m-10">
            <h2 className="text-2xl">User List</h2>
            {users?.map((user)=>(
                <div className="border border-black  m-5 p-5" key={user?.id}>
                    <h3>{user?.name}</h3>

                    <p>
                        <b>Email:</b>{user?.email}
                    </p>
                    <p>
                        <b>Username:</b>{user?.username}
                    </p>
                    <p>
                        <b>Phone:</b>{user?.phone}

                    </p>

                    <button className="btn bg-blue-300 text-white p-2 m-2 rounded"  onClick={()=>setEdit(user)}>Edit</button>
                    <button className="btn bg-red-300 text-white p-2 rounded" onClick={()=>deleteUser(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}
export default List
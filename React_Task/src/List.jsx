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
        <div>
            <h2>User List</h2>
            {users.map((user)=>(
                <div className="user-card" key={user.id}>
                    <h3>{user.name}</h3>

                    <p>
                        <b>Email:</b>{user.email}
                    </p>
                    <p>
                        <b>Username:</b>{user.username}
                    </p>
                    <p>
                        <b>Phone:</b>{user.phone}

                    </p>

                    <button onClick={()=>setEdit(user)}>Edit</button>
                    <button onClick={()=>deleteUser(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}
export default List

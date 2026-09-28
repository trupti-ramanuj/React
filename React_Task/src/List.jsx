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
        <div className="h-[95%]  overflow-auto ">
            <h2 className='text-4xl font-bold'>User List</h2>
            <div  className=' flex flex-wrap items-start justify-start gap-2 mt-6'>
            {users?.map((user)=>(
                <div key={user} className=" flex justify-between flex-col items-start relative h-55 w-50 rounded-xl text-black pt-9 pb-4 px-4 bg-white">
                <div className="w-50 h-55 border border-black  m-2 p-2" key={user?.id}>
                    <h3 className='leading-tight text-lg font-bold'>{user?.name}</h3>

                    <p className='mt-1 leading-tight text-xs font-semibold text-gray-600'>
                        <b>Email:</b>{user?.email}
                    </p>
                    <p className='mt-2 leading-tight text-xs font-semibold text-gray-600'>
                        <b>Username:</b>{user?.username}
                    </p>
                    <p className='mt-2 leading-tight text-xs font-semibold text-gray-600'>
                        <b>Phone:</b>{user?.phone}
                    </p>

                    <button  className='w-full cursor-pointer active:scale-95 bg-blue-500 py-1 text-xs rounded font-bold text-white'  onClick={()=>setEdit(user)}>Edit</button>
                    <button  className='w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white' onClick={()=>deleteUser(user.id)}>Delete</button>
                </div>
                </div>
            ))}</div>
        </div>
    )
}
export default List
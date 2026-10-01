import Card from "./Card";

function UserList({
  users,
  onEdit,
  onAdd,
  onDelete,
  deletingId,
}) {
  

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <Card  key={user.id}  user={user}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
          deleting={
            String(deletingId) === String(user.id)
          } />
     
      ))}
         
    </div>
  );
}

export default UserList;

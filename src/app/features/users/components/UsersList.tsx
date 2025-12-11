import { useGetUsers } from "../hooks/useGetUsers";
import { UserCard } from "./UserCard";

export const UsersList = () => {
  const { data: users, isLoading } = useGetUsers();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

import { UsersList } from "../components/UsersList";

export const UsersPage = () => {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UsersList />
    </section>
  );
}

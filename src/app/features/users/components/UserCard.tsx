import type { User } from "../types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="p-4 rounded-2xl shadow border border-neutral-200">
      <h3 className="font-semibold text-lg">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  );
}

import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="w-full border-b border-neutral-200 flex items-center justify-between p-4">
      <h1 className="font-semibold text-xl">PESV CONTROL</h1>
      <Button isIconOnly variant="light" color="danger">
        <LogOut className="size-4" />
      </Button>
    </nav>
  );
};

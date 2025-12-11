import { Link } from "react-router";

export const ReadxPresentation = () => {
  return (
    <main className="grid place-content-center gap-6 h-full">
      <img src="/Readx Icon.svg" alt="ReaDx Logo" className="w-32 mx-auto"/>
      <h1 className="text-2xl font-bold text-center">Welcome to Readx SPA</h1>
      <Link className="underline text-[#7828C8] text-center text-sm" to="users">
        Go to Example Users Page
      </Link>
    </main>
  );
};

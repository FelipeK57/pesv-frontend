import { HeroUIProvider } from "@heroui/react";
import { QueryProvider } from "./providers/query-provider";
import { RouterProvider } from "./router/router";

export const App = () => {
  return (
    <QueryProvider>
      <HeroUIProvider>
        <RouterProvider />
      </HeroUIProvider>
    </QueryProvider>
  );
};

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../configs/queryClient";
import { PropsWithChildren } from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

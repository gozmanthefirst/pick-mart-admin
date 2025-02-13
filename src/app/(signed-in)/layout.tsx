// External Imports
import { ReactNode } from "react";

// Local Imports
import { Container } from "@/shared/components/container";
import { Header } from "@/shared/components/header";

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <Container className="flex flex-1 flex-col">{children}</Container>
    </div>
  );
};

export default AdminLayout;

"use client";

import { UserRole } from "@prisma/client";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface Props {
  role: UserRole;
}

const ChangeRoleForm = ({ role }: Props) => {
  const { pending } = useFormStatus();
  const newRole =
    role === UserRole.CUSTOMER ? UserRole.BUSINESS : UserRole.CUSTOMER;

  return (
    <form>
      <Button isLoading={pending} className="bg-red-600 hover:bg-red-500">
        Transform to {newRole.toLowerCase()} account
      </Button>
    </form>
  );
};

export default ChangeRoleForm;

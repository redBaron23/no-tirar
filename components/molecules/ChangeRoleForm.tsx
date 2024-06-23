"use client";

import { useAction } from "next-safe-action/hooks";
import { UserRole } from "@prisma/client";
import { Button } from "../ui/button";
import { updateUser } from "@/app/actions/user/updateUser";
interface Props {
  role: UserRole;
}

const ChangeRoleForm = ({ role }: Props) => {
  const { execute, result, status } = useAction(updateUser);

  const currentRole = result?.data?.role || role;

  const newRole =
    currentRole === UserRole.CUSTOMER ? UserRole.BUSINESS : UserRole.CUSTOMER;

  const isLoading = status === "executing";

  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        isLoading={isLoading}
        onClick={() => execute({ newRole })}
        className="bg-red-600 hover:bg-red-500"
      >
        Transform to {newRole.toLowerCase()} account
      </Button>
      {result?.data?.role && (
        <p className="text-center text-base">
          El nuevo role es{" "}
          <strong>{result?.data?.role.toLocaleLowerCase()}</strong>
          <br />
          desconectarse y conectarse nuevamente para que tenga efecto
        </p>
      )}
    </div>
  );
};

export default ChangeRoleForm;

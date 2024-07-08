"use client";

import { updateUser } from "@/app/actions/user/updateUser";
import { UserRole } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
interface Props {
  role: UserRole;
}

const ChangeRoleForm = ({ role }: Props) => {
  const { execute, result, isExecuting } = useAction(updateUser);

  const currentRole = result?.data?.role || role;

  const newRole =
    currentRole === UserRole.CUSTOMER ? UserRole.BUSINESS : UserRole.CUSTOMER;

  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        isLoading={isExecuting}
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

import ChangeRoleForm from "@/components/molecules/ChangeRoleForm";
import { auth } from "@/lib/auth";

export default async function Settings() {
  const session = await auth();

  if (!session) {
    return;
  }

  return (
    <div className="flex h-full flex-col items-center gap-8 pt-8 text-2xl">
      <h1>Settings </h1>
      <div className="flex flex-col gap-4">
        <ChangeRoleForm role={session.user.role} />
      </div>
    </div>
  );
}

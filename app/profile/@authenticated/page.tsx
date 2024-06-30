import BusinessProfile from "@/components/templates/BusinessProfile";
import CustomerProfile from "@/components/templates/CustomerProfile";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export default async function Page() {
  const session = await auth();

  if (session?.user.role === UserRole.BUSINESS) {
    return <BusinessProfile />;
  }
  return <CustomerProfile />;
}

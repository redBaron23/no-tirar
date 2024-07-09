import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

const UserAvatar = async () => {
  const session = await auth();
  const firstNameLetter = session?.user?.name ? session?.user?.name[0] : "U";

  return (
    <Avatar>
      <AvatarImage src={session?.user?.image || ""} />
      <AvatarFallback>{firstNameLetter}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

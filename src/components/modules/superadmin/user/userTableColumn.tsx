import { Column } from "@/components/shared/ManagementTable";
import { formatDate } from "@/lib/formatters";
import { UserInfo } from "@/types/user.interface";
import UserCell from "@/components/shared/UserCell";

const getUserProfile = (user: UserInfo) => {
  return {
    name: user?.name || "Unknown",
    email: user?.email || user.email,
    photoUrl: user?.avatarUrl || undefined,
  };
};

export const userTableColumn: Column<UserInfo>[] = [
  {
    header: "User",
    accessor: (user) => {
      const { name, email, photoUrl } = getUserProfile(user);
      return <UserCell name={name} email={email} photoUrl={photoUrl} />;
    },
  },
  {
    header: "Role",
    accessor: (user) => user.role,
  },
  {
    header: "Created",
    accessor: (user) => formatDate(user.createdAt),
  },
];

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import { getMe } from "@/services/auth/getMe";
import { UserInfo } from "@/types/user.interface";
import { getNavMainItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utiles";
import Image from "next/image";

const DashboardSidebar = async () => {
  const userInfo = await getMe();

  const navMainItems = getNavMainItemsByRole((userInfo as UserInfo).role);

  const defaultDashboardPath = getDefaultDashboardRoute(userInfo!.role);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground dark:hover:bg-gray-800"
            >
              <Link href={defaultDashboardPath} className="flex items-center gap-2 group">
                <div className="relative w-9 h-9">
                  <Image
                    src="/logo.png"
                    alt="EduFlow Logo"
                    width={36}
                    height={36}
                    className="rounded"
                  />
                </div>
                <span className="font-bold text-xl bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  EduFlow
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userInfo={userInfo!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;

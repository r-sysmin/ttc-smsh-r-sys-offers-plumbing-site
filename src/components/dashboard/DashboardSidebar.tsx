import Logo from "@/components/Logo";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  Briefcase,
  DollarSign,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  User,
  Users
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const adminItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Contacts", url: "/dashboard/contacts", icon: Mail },
  { title: "Quotes", url: "/dashboard/quotes", icon: DollarSign },
  { title: "Service Inquiries", url: "/dashboard/service-inquiries", icon: MessageSquare },
  { title: "Blogs", url: "/dashboard/blogs", icon: FileText },
  { title: "Careers", url: "/dashboard/careers", icon: Briefcase },
  { title: "Applications", url: "/dashboard/applications", icon: Users },
  { title: "Profile", url: "/dashboard/profile", icon: User },
];

const userItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Quotes", url: "/dashboard/my-quotes", icon: DollarSign },
  { title: "My Inquiries", url: "/dashboard/my-inquiries", icon: MessageSquare },
  { title: "Profile", url: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAdmin, loading, signOut } = useAuth();

  const items = isAdmin ? adminItems : userItems;

  const isActive = (path: string) => currentPath === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-60"} border-r border-gray-200 transition-all duration-300`}
      collapsible="icon"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        {!collapsed && (
          <Link to="/">
            <Logo />
          </Link>
        )}
        <SidebarTrigger className={collapsed ? "mx-auto" : ""} />
      </div>

      <SidebarContent className="pt-4 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            {loading ? "Loading..." : isAdmin ? "Admin Menu" : "User Menu"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white"
                      activeClassName=" text-primary-foreground"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto mb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Site">
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted text-muted-foreground"
                  >
                    <Home className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>Back to Site</span>}
                  </Link>

                </SidebarMenuButton>
                <SidebarMenuButton asChild tooltip="Logout">
                  <div onClick={handleSignOut} className="text-destructive/80 flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer hover:text-destructive">
                    <LogOut className="size-4" />
                    <span>Log out</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

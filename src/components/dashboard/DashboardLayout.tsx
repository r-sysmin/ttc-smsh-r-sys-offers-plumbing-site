import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";

// Admin-only dashboard sub-routes. Non-admin authenticated users are
// redirected away from these to their user overview.
const ADMIN_ONLY_PATHS = [
  "/dashboard/contacts",
  "/dashboard/quotes",
  "/dashboard/service-inquiries",
  "/dashboard/blogs",
  "/dashboard/careers",
  "/dashboard/applications",
];

export function DashboardLayout() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    // Client-side admin guard (defense-in-depth; RLS is the real enforcer).
    const isAdminRoute = ADMIN_ONLY_PATHS.some((p) =>
      location.pathname.startsWith(p),
    );
    if (isAdminRoute && !isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, isAdmin, location.pathname, navigate]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isAdminRoute = ADMIN_ONLY_PATHS.some((p) =>
    location.pathname.startsWith(p),
  );
  if (isAdminRoute && !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-100">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header with Menu Trigger */}
          <header className="md:hidden sticky top-0 z-10 flex items-center gap-2 border-b bg-white border-gray-200 p-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

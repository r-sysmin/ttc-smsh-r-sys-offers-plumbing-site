import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Calendar, Shield, User } from "lucide-react";

export default function DashboardProfile() {
  const { user, isAdmin } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile(user?.id);

  if (!user) return null;

  const userInitials = user.email?.slice(0, 2).toUpperCase() || "U";
  const userName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A";
  const userPhone = profile?.phone || user.user_metadata?.phone || "N/A";

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-primary">Profile</h1>
        <p className="text-black mt-1">
          Manage your account information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="bg-white border border-gray-200 md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.user_metadata?.avatar_url} alt={userName} />
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{userName}</h3>
              <p className="text-sm text-muted-primary">{user.email}</p>
              {isAdmin && (<div className="mt-4 flex items-center gap-2">
                <Shield className={`h-4 w-4 ${isAdmin ? "text-primary" : "text-muted-primary"}`} />
                <span className={`text-sm font-medium ${isAdmin ? "text-primary" : "text-muted-primary"}`}>
                  {isAdmin ? "Administrator" : "User"}
                </span>
              </div>)}

            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="bg-white border border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Details
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-muted-primary">Full Name</Label>
                <p className="font-medium mt-1">{userName}</p>
              </div>
              <div>
                <Label className="text-muted-primary">Email Address</Label>
                <p className="font-medium mt-1">{user.email}</p>
              </div>
              <div>
                <Label className="text-muted-primary">Member Since</Label>
                <p className="font-medium mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-primary" />
                  {createdAt}
                </p>
              </div>
              <div>
                <Label className="text-muted-primary">Contact Number</Label>
                <p className="font-medium mt-1">{userPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

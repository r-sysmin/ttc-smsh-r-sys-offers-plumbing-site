import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useJobApplications, useUpdateJobApplication } from "@/hooks/useJobApplications";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  reviewed: "outline",
  interviewed: "default",
  hired: "default",
  rejected: "destructive",
};

const DashboardApplications = () => {
  const { data: applications, isLoading } = useJobApplications();
  const updateApplication = useUpdateJobApplication();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Job Applications</h1>

      <Card className="bg-white border-gray-200">
        <CardHeader><CardTitle>All Applications ({applications?.length || 0})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-300 hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications?.map((app) => (
                <TableRow key={app.id} className="border-gray-200 hover:bg-black/5">
                  <TableCell className="font-medium">{app.full_name}</TableCell>
                  <TableCell>{app.job_title}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>
                    <Select
                      value={app.status}
                      onValueChange={(value) => updateApplication.mutate({ id: app.id, status: value })}
                    >
                      <SelectTrigger className="w-32 border-gray-200">
                        {app.status}
                      </SelectTrigger>
                      <SelectContent className="border-gray-200">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{format(new Date(app.created_at), "MMM d, yyyy")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardApplications;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDeleteServiceInquiry, useServiceInquiries, useUpdateServiceInquiry } from "@/hooks/useServiceInquiries";
import { format } from "date-fns";
import { MessageSquare, Phone, Trash2, User } from "lucide-react";
import { useState } from "react";

const getStatusBadge = (status: string) => {
    switch (status) {
        case "new":
            return <Badge className="bg-blue-500">New</Badge>;
        case "contacted":
            return <Badge className="bg-yellow-500">Contacted</Badge>;
        case "resolved":
            return <Badge className="bg-green-500">Resolved</Badge>;
        case "closed":
            return <Badge variant="secondary">Closed</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

export default function DashboardServiceInquiries() {
    const { data: inquiries, isLoading } = useServiceInquiries();
    const updateInquiry = useUpdateServiceInquiry();
    const deleteInquiry = useDeleteServiceInquiry();
    const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

    const handleStatusChange = async (id: string, status: string) => {
        await updateInquiry.mutateAsync({ id, status });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this inquiry?")) {
            await deleteInquiry.mutateAsync(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Service Inquiries</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage service inquiries from customers
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                        Total: {inquiries?.length || 0}
                    </Badge>
                    <Badge className="bg-blue-500 text-sm">
                        New: {inquiries?.filter(i => i.status === "new").length || 0}
                    </Badge>
                </div>
            </div>

            <Card className="bg-white border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        All Service Inquiries
                    </CardTitle>
                    <CardDescription>View and manage customer service inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading inquiries...</p>
                        </div>
                    ) : inquiries && inquiries.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-gray-200">
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Note</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inquiries.map((inquiry) => (
                                        <TableRow key={inquiry.id} className="hover:bg-black/5 border-gray-200">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{inquiry.full_name}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium text-primary">
                                                    {inquiry.service_name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span>{inquiry.phone}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {inquiry.note ? (
                                                    <div className="max-w-xs">
                                                        <p className="text-sm text-muted-foreground truncate">
                                                            {inquiry.note}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-muted-foreground">
                                                    {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={inquiry.status}
                                                    onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                                                >
                                                    <SelectTrigger className="w-[130px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="new">New</SelectItem>
                                                        <SelectItem value="contacted">Contacted</SelectItem>
                                                        <SelectItem value="resolved">Resolved</SelectItem>
                                                        <SelectItem value="closed">Closed</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(inquiry.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-semibold text-black/80 mb-2">No inquiries yet</h3>
                            <p className="text-muted-foreground">
                                Service inquiries will appear here when customers submit them.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

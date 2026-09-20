import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useUserServiceInquiries } from "@/hooks/useServiceInquiries";
import { format } from "date-fns";
import { Clock, MessageSquare, Phone, Wrench } from "lucide-react";

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

export default function UserServiceInquiries() {
    const { user } = useAuth();
    const { data: inquiries, isLoading } = useUserServiceInquiries(user?.id);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary">My Service Inquiries</h1>
                    <p className="text-muted-foreground mt-1">
                        View and track your service inquiry requests
                    </p>
                </div>
            </div>

            <Card className="bg-white border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Your Service Inquiries
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                            <p className="text-muted-foreground">Loading your inquiries...</p>
                        </div>
                    ) : inquiries && inquiries.length > 0 ? (
                        <div className="space-y-4">
                            {inquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className="border border-gray-200 rounded-xl p-4 bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Wrench className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-primary">
                                                        {inquiry.service_name}
                                                    </h3>
                                                    <p className="text-sm text-secondary">
                                                        Request submitted
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground ml-[52px]">
                                                <span className="flex items-center gap-1">
                                                    <Phone className="h-4 w-4" />
                                                    {inquiry.phone}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                                                </span>
                                            </div>

                                            {inquiry.note && (
                                                <div className="ml-[52px]">
                                                    <p className="text-sm text-muted-foreground">
                                                        <span className="font-medium">Your Note:</span> {inquiry.note}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            {getStatusBadge(inquiry.status)}
                                            <span className="text-xs text-muted-foreground">
                                                {inquiry.status === "new" && "We'll contact you soon"}
                                                {inquiry.status === "contacted" && "We've reached out to you"}
                                                {inquiry.status === "resolved" && "Issue resolved"}
                                                {inquiry.status === "closed" && "Request closed"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-semibold text-black/80 mb-2">No service inquiries yet</h3>
                            <p className="text-muted-foreground mb-6">
                                You haven't submitted any service inquiries yet. Browse our services to get started.
                            </p>
                            <a
                                href="/services"
                                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                            >
                                Browse Services
                            </a>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

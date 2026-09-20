/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useAllQuoteRequests, useDeleteQuoteRequest, useUpdateQuoteRequestStatus } from "@/hooks/useQuoteRequests";
import { Calendar, Clock, DollarSign, Mail, Phone, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  contacted: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const urgencyColors: Record<string, string> = {
  emergency: "bg-red-100 text-red-700",
  urgent: "bg-amber-100 text-amber-700",
  standard: "bg-blue-100 text-blue-700",
};

export default function DashboardQuotes() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { data: quoteRequests, isLoading } = useAllQuoteRequests();
  const updateQuoteStatus = useUpdateQuoteRequestStatus();
  const deleteQuoteRequest = useDeleteQuoteRequest();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, loading, navigate]);

  const handleDeleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return;

    try {
      await deleteQuoteRequest.mutateAsync(id);
      toast.success("Quote request deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete quote request");
    }
  };

  const handleQuoteStatusChange = async (id: string, status: string) => {
    try {
      await updateQuoteStatus.mutateAsync({ id, status });
      toast.success("Status updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Quote Requests</h1>
        <p className="text-black mt-1">
          Manage customer quote requests
        </p>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            All Quotes ({quoteRequests?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-primary">Loading...</div>
          ) : quoteRequests && quoteRequests.length > 0 ? (
            <div className="space-y-4">
              {quoteRequests.map((quote) => (
                <div
                  key={quote.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary">{quote.full_name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${urgencyColors[quote.urgency] || "bg-gray-100 text-gray-700"}`}>
                        {quote.urgency}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary">{quote.service_title}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-primary">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {quote.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {quote.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {quote.estimated_hours} hrs
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(quote.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-primary">
                      Complexity: {quote.complexity_label}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-bold text-primary">
                      ${quote.estimated_min} - ${quote.estimated_max}
                    </p>
                    <div className="flex items-center gap-3">
                      <select
                        value={quote.status}
                        onChange={(e) => handleQuoteStatusChange(quote.id, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer ${statusColors[quote.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-primary">
              No quote requests yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

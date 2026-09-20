import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useUserQuoteRequests } from "@/hooks/useQuoteRequests";
import { format } from "date-fns";
import { Clock, DollarSign, Plus, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "reviewed":
      return <Badge className="bg-blue-500">Reviewed</Badge>;
    case "approved":
      return <Badge className="bg-green-500">Approved</Badge>;
    case "completed":
      return <Badge className="bg-primary">Completed</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function UserQuotes() {
  const { user } = useAuth();
  const { data: quotes, isLoading } = useUserQuoteRequests(user?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Quotes</h1>
          <p className="text-muted-foreground mt-1">
            View and track your quote requests
          </p>
        </div>
        <Link to="/quote">
          <Button className="rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Request Quote
          </Button>
        </Link>
      </div>

      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Your Quote Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your quotes...</p>
            </div>
          ) : quotes && quotes.length > 0 ? (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
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
                            {quote.service_title}
                          </h3>
                          <p className="text-sm text-secondary">
                            {quote.complexity_label}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pl-13">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {quote.estimated_hours} hours
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${quote.estimated_min} - ${quote.estimated_max}
                        </span>
                        <span className="capitalize">{quote.urgency} service</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(quote.status)}
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(quote.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  {quote.notes && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Notes:</span> {quote.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-black/80 mb-2">No quotes yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't requested any quotes yet. Get started by requesting your first quote.
              </p>
              <Link to="/quote">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Request Your First Quote
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useAllBlogs } from "@/hooks/useBlogs";
import { useAllContacts } from "@/hooks/useContacts";
import { useJobApplications } from "@/hooks/useJobApplications";
import { useAllQuoteRequests, useUserQuoteRequests } from "@/hooks/useQuoteRequests";
import { useServiceInquiries } from "@/hooks/useServiceInquiries";
import { Briefcase, Clock, DollarSign, FileText, Mail, MessageSquare, Users } from "lucide-react";

function AdminOverview() {
  const { data: contacts } = useAllContacts();
  const { data: quoteRequests } = useAllQuoteRequests();
  const { data: blogs } = useAllBlogs();
  const { data: applications } = useJobApplications();
  const { data: serviceInquiries } = useServiceInquiries();

  const newContacts = contacts?.filter(c => c.status === "new").length || 0;
  const pendingQuotes = quoteRequests?.filter(q => q.status === "pending").length || 0;
  const publishedBlogs = blogs?.filter(b => b.published).length || 0;
  const pendingApplications = applications?.filter(a => a.status === "pending").length || 0;
  const newInquiries = serviceInquiries?.filter(i => i.status === "new").length || 0;

  const stats = [
    {
      title: "Total Contacts",
      value: contacts?.length || 0,
      description: `${newContacts} new this week`,
      icon: Mail,
    },
    {
      title: "Quote Requests",
      value: quoteRequests?.length || 0,
      description: `${pendingQuotes} pending`,
      icon: DollarSign,
    },
    {
      title: "Service Inquiries",
      value: serviceInquiries?.length || 0,
      description: `${newInquiries} new`,
      icon: MessageSquare,
    },
    {
      title: "Job Applications",
      value: applications?.length || 0,
      description: `${pendingApplications} pending`,
      icon: Briefcase,
    },
    {
      title: "Blog Posts",
      value: blogs?.length || 0,
      description: `${publishedBlogs} published`,
      icon: FileText,
    },
  ];

  const recentContacts = contacts?.slice(0, 5) || [];
  const recentQuotes = quoteRequests?.slice(0, 5) || [];
  const recentApplications = applications?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
        <p className="text-black mt-1">
          Monitor your business metrics and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Recent Contacts
            </CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContacts.length > 0 ? (
                recentContacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {contact.full_name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contact.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.service || "General Inquiry"}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(contact.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No contacts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Recent Quote Requests
            </CardTitle>
            <CardDescription>Latest quote requests from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuotes.length > 0 ? (
                recentQuotes.slice(0, 3).map((quote) => (
                  <div key={quote.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{quote.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{quote.service_title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">
                        ${quote.estimated_min} - ${quote.estimated_max}
                      </p>
                      <p className="text-xs text-muted-foreground">{quote.urgency}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No quote requests yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Recent Job Applications
            </CardTitle>
            <CardDescription>Latest career applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.length > 0 ? (
                recentApplications.slice(0, 3).map((application) => (
                  <div key={application.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-secondary">
                        {application.full_name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{application.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{application.job_title}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        application.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                          application.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {application.status}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No applications yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserOverview() {
  const { user } = useAuth();
  const { data: userQuotes } = useUserQuoteRequests(user?.id);

  const totalQuotes = userQuotes?.length || 0;
  const pendingQuotes = userQuotes?.filter(q => q.status === "pending").length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
        <p className="text-black mt-1">
          View your activity and manage your account
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              My Quotes
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalQuotes === 0 ? "No quote requests yet" : `${totalQuotes} total quote${totalQuotes > 1 ? 's' : ''}`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingQuotes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingQuotes === 0 ? "All requests processed" : `${pendingQuotes} awaiting review`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account Status
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground mt-1">
              Your account is in good standing
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <a href="/quote" className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-black/5 transition-colors">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Request a Quote</p>
                <p className="text-sm text-muted-foreground">Get an estimate for your project</p>
              </div>
            </a>
            <a href="/contact" className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-black/5 transition-colors">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Contact Us</p>
                <p className="text-sm text-muted-foreground">Get in touch with our team</p>
              </div>
            </a>
            <a href="/services" className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-black/5 transition-colors">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">View Services</p>
                <p className="text-sm text-muted-foreground">Explore what we offer</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardOverview() {
  const { isAdmin, loading } = useAuth();

  return (
    <>
      {!loading && (isAdmin ? <AdminOverview /> : <UserOverview />)}
    </>
  );
}

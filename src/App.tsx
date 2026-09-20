import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import QuoteCalculator from "./pages/QuoteCalculator";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";

// Dashboard pages
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import DashboardApplications from "./pages/dashboard/DashboardApplications";
import DashboardBlogs from "./pages/dashboard/DashboardBlogs";
import DashboardCareers from "./pages/dashboard/DashboardCareers";
import DashboardContacts from "./pages/dashboard/DashboardContacts";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardQuotes from "./pages/dashboard/DashboardQuotes";
import DashboardServiceInquiries from "./pages/dashboard/DashboardServiceInquiries";
import UserQuotes from "./pages/dashboard/UserQuotes";
import UserServiceInquiries from "./pages/dashboard/UserServiceInquiries";

// Create QueryClient outside component to prevent recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes  
      refetchOnWindowFocus: false, // Prevent refetch when switching browser tabs
      refetchOnMount: false, // Don't refetch on mount if data exists
      refetchOnReconnect: false, // Don't refetch on network reconnect
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:slug" element={<Career />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/quote" element={<QuoteCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard Routes - Using Layout Route */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="contacts" element={<DashboardContacts />} />
            <Route path="quotes" element={<DashboardQuotes />} />
            <Route path="service-inquiries" element={<DashboardServiceInquiries />} />
            <Route path="blogs" element={<DashboardBlogs />} />
            <Route path="careers" element={<DashboardCareers />} />
            <Route path="applications" element={<DashboardApplications />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="my-quotes" element={<UserQuotes />} />
            <Route path="my-inquiries" element={<UserServiceInquiries />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

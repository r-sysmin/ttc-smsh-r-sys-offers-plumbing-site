import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ChevronDown, LayoutDashboard, LogOut, Menu, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
const navLinks = [{
  name: "Home",
  href: "/",
  isRoute: true
}, {
  name: "About",
  href: "/about",
  isRoute: true
}, {
  name: "Service",
  href: "/services",
  isRoute: true
}, {
  name: "Work",
  href: "/work",
  isRoute: true
}, {
  name: "Blogs",
  href: "/blog",
  isRoute: true
}, {
  name: "Pages",
  href: "#",
  hasDropdown: true
}];
const pagesDropdownLinks = [{
  column: 1,
  links: [{
    name: "Home",
    href: "/"
  }, {
    name: "Service",
    href: "/services"
  }, {
    name: "Service Details",
    href: "/services"
  }, {
    name: "Work",
    href: "/work"
  }, {
    name: "Work Details",
    href: "/work"
  }]
}, {
  column: 2,
  links: [{
    name: "About Us",
    href: "/about"
  }, {
    name: "Career Details",
    href: "/career"
  }, {
    name: "Blog",
    href: "/blog"
  }, {
    name: "Blog Details",
    href: "/blog"
  }, {
    name: "Contact Us",
    href: "/contact"
  }]
}, {
  column: 3,
  links: [{
    name: "Pricing",
    href: "/pricing"
  }, {
    name: "Privacy Policy",
    href: "/privacy-policy"
  }, {
    name: "404 Error",
    href: "/404"
  }, {
    name: "Dashboard",
    href: "/dashboard"
  }, {
    name: "Quote",
    href: "/quote"
  }]
}];
const FlipLink = ({
  children,
  hasDropdown,
  href,
  isRoute,
  onClick,
  isActive,
  isDark = false
}: {
  children: string;
  hasDropdown?: boolean;
  href: string;
  isRoute?: boolean;
  onClick?: () => void;
  isActive?: boolean;
  isDark?: boolean;
}) => {
  const content = <>
    <span className={`block transition-transform duration-300 group-hover:-translate-y-full ${isDark ? 'text-white' : 'text-[#595B67]'}`}>
      {children}
    </span>
    <span className={`absolute inset-0 flex items-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 ${isDark ? 'text-white' : 'text-[#595B67]'}`}>
      {children}
    </span>
    {hasDropdown && <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 ${isActive ? 'rotate-180' : ''} ${isDark ? 'text-white' : 'text-[#595B67]'} `} />}
  </>;
  if (hasDropdown) {
    return <button onClick={onClick} className={`group relative overflow-hidden flex items-center gap-1 transition-colors duration-300 font-bold h-6`}>
      {content}
    </button>;
  }
  if (isRoute) {
    return <Link to={href} className={`group relative overflow-hidden flex items-center gap-1  transition-colors duration-300 font-bold h-6`}>
      {content}
    </Link>;
  }
  return <a href={href} className={`group relative overflow-hidden flex items-center gap-1   transition-colors duration-300 font-bold h-6`}>
    {content}
  </a>;
};
const DropdownFlipLink = ({
  children,
  href,
  onClick,
  isDark = false
}: {
  children: string;
  href: string;
  onClick?: () => void;
  isDark?: boolean;
}) => {
  return <Link to={href} onClick={onClick} className="group relative overflow-hidden flex items-center text-primary hover:text-primary transition-colors duration-300 font-medium h-6">
    <span className={`block transition-transform duration-300 group-hover:-translate-y-full ${isDark ? 'text-[#595B67]' : 'text-white'}`}>
      {children}
    </span>
    <span className={`absolute inset-0 flex items-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 ${isDark ? 'text-[#595B67]' : 'text-white'}`}>
      {children}
    </span>
  </Link>;
};
const FlipButton = ({
  children,
  isDark = false,
  props
}: {
  children: React.ReactNode;
  isDark?: boolean;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return <Button variant="nav-cta" size="default" className={`group relative overflow-hidden ${isDark ? '' : 'bg-white border-secondary text-black'}`} {...props}>
    <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
      {children}
    </span>
    <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
      {children}
    </span>
  </Button>;
};
const Header = ({
  isDark = false
}: {
  isDark?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handlePagesClick = () => {
    setIsPagesDropdownOpen(!isPagesDropdownOpen);
  };
  const closeDropdown = () => {
    setIsPagesDropdownOpen(false);
  };

  const { user, loading, signOut } = useAuth();
  const { data: profile } = useUserProfile(user?.id);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  return <header className={`relative z-50 backdrop-blur-md bg-primary ${isDark ? 'bg-opacity-0' : 'bg-white'}`}>
    <div className="container">
      <div className="flex items-center justify-between h-20">
        <Link to="/">
          <Logo isDark={isDark} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => <FlipLink key={link.name} hasDropdown={link.hasDropdown} href={link.href} isRoute={link.isRoute} onClick={link.hasDropdown ? handlePagesClick : undefined} isActive={link.hasDropdown && isPagesDropdownOpen} isDark={isDark}>
            {link.name}
          </FlipLink>)}
        </nav>
        <div className="hidden lg:flex gap-3">
          {/* CTA Button & Cart */}
          <Link to="tel:+111222333444" className="hidden lg:flex">
            <FlipButton isDark={isDark}>
              <Phone className="h-4 w-4" />
              Call +(111)222-333-444</FlipButton>
          </Link>
          <div className="hidden grow items-center justify-end gap-6 lg:flex">
            {!user ? (
              <FlipButton
                isDark={isDark}
                props={{
                  onClick: () => navigate("/auth"),

                }}
              >
                Sign In
              </FlipButton>
            ) : (
              <HoverCard
                openDelay={0}
              >
                <HoverCardTrigger asChild>
                  <div
                    className="group relative flex items-center gap-0.5 rounded-xl"
                  >
                    <div className="size-9 cursor-pointer">
                      <div className={` flex size-full items-center justify-center rounded-full ${isDark ? "bg-accent" : "bg-primary text-white "}`}>
                        {user.email?.slice(0, 2).toUpperCase() || "U"}
                      </div>
                    </div>
                    <div
                      className={`flex h-full min-h-9 cursor-pointer items-center rounded-sm ${isDark ? "group-hover:bg-[#0c133b]/80" : "group-hover:bg-[#f8f8f8]"}`}
                    >
                      <ChevronDown className={`${isDark ? "text-white" : "text-primary"} size-4`} />
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  side="bottom"
                  align="end"
                  className={`box-shadow bg-[#0c133b] min-w-65 rounded-lg border p-2 ${isDark
                    ? "border-gray/20 "
                    : "border-gray"
                    }`}
                >
                  <div className="flex flex-col gap-1">
                    <div
                      className="flex items-center gap-3 rounded-[10px] p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="bg-primary text-white flex size-10 min-h-10 min-w-10 items-center justify-center rounded-full">
                        {user.email?.slice(0, 2).toUpperCase() || "U"}
                      </div>
                      <div className="flex items-center">
                        <div className="flex flex-col gap-1">
                          <span
                            className="max-w-45 truncate leading-6.5 font-medium text-white"
                          >
                            {profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0]}
                          </span>
                          <span
                            className="max-w-45 truncate text-sm leading-6 text-white/70"
                          >
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`m-[1.5px] h-px w-full bg-white/20`}
                    />
                    <Link
                      to="/dashboard"
                      className={`flex items-center gap-2 rounded-[10px] p-2 hover:bg-white/10`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <LayoutDashboard className={`mr-2 h-4 w-4 text-white`} />
                      <span
                        className="cursor-pointer text-sm leading-5 tracking-[-0.084px] text-white"
                      >
                        Dashboard
                      </span>
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className={`flex items-center gap-2 rounded-[10px] p-2 hover:bg-white/10`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <User className={`mr-2 h-4 w-4 text-white`} />
                      <span
                        className="cursor-pointer text-sm leading-5 tracking-[-0.084px] text-white"
                      >
                        Profile
                      </span>
                    </Link>
                    <div
                      className={`m-[1.5px] h-px w-full bg-white/20`}
                    />
                    <button
                      className="flex items-center gap-2 rounded-[10px] p-2 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSignOut();
                      }}
                    >
                      <LogOut className="mr-2 size-4 text-white" />
                      <span
                        className="text-sm leading-5 tracking-tight text-white"
                      >
                        Logout
                      </span>
                    </button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>


        {/* Mobile Menu Button */}
        <button className={`lg:hidden ${isDark ? 'text-white' : 'text-[#595B67]'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Pages Dropdown */}
      <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 rounded-lg shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${isPagesDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${isDark ? "bg-white" : "bg-primary"}`} style={{
        width: '600px'
      }}>
        <div className="p-8 rounded-none">
          <div className="grid grid-cols-3 gap-x-12 gap-y-4">
            {pagesDropdownLinks.map(column => <div key={column.column} className="flex flex-col gap-4">
              {column.links.map(link => <DropdownFlipLink key={link.name} href={link.href} onClick={closeDropdown} isDark={isDark}>
                {link.name}
              </DropdownFlipLink>)}
            </div>)}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && <div className="lg:hidden py-4 border-t border-white/10">
        <nav className="flex flex-col gap-4">
          {navLinks.map(link => link.isRoute ? <Link key={link.name} to={link.href} className={`flex items-center gap-1 ${isDark ? 'text-white' : 'text-[#595B67]/80'} hover:text-[#595B67] transition-colors duration-300 text-sm font-medium py-2`}>
            {link.name}
            {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
          </Link> : <a key={link.name} href={link.href} className={`flex items-center gap-1 ${isDark ? 'text-white' : 'text-[#595B67]/80'} hover:text-[#595B67] transition-colors duration-300 text-sm font-medium py-2`}>
            {link.name}
            {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
          </a>)}
          <Button variant="hero" size="default" className="mt-4">
            <Phone className="h-4 w-4 mr-2" />
            Call +(1)578-365-379
          </Button>
        </nav>
      </div>}
    </div>

    {/* Backdrop to close dropdown */}
    {isPagesDropdownOpen && <div className="fixed inset-0 z-[-1]" onClick={closeDropdown} />}
  </header >;
};
export default Header;
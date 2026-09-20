import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
const FlipButton = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <Button variant="nav-cta" size="default" className="group relative overflow-hidden">
    <span className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
      <Phone className="h-4 w-4" />
      {children}
    </span>
    <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
      <Phone className="h-4 w-4" />
      {children}
    </span>
  </Button>;
};
const FlipLink = ({
  children,
  href
}: {
  children: string;
  href: string;
}) => {
  return <a href={href} className="group relative overflow-hidden block text-white/60 hover:text-tertiary transition-colors text-sm h-5">
    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
      {children}
    </span>
    <span className="absolute inset-0 flex items-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
      {children}
    </span>
  </a>;
};
const footerLinks = {
  company: [{
    name: "About Us",
    href: "/about"
  }, {
    name: "Our Team",
    href: "/about"
  }, {
    name: "Careers",
    href: "/career"
  }, {
    name: "Contact",
    href: "/contact"
  }],
  services: [{
    name: "Plumbing",
    href: "/services"
  }, {
    name: "Faucet Repairs",
    href: "/services/faucet-leak-repairs"
  }, {
    name: "Installation",
    href: "/services"
  }, {
    name: "Maintenance",
    href: "/services"
  }],
  resources: [{
    name: "Blog",
    href: "/blog"
  }, {
    name: "FAQ",
    href: "/faq"
  }, {
    name: "Privacy Policy",
    href: "/privacy-policy"
  },]
};
const socialLinks = [{
  icon: Facebook,
  href: "#"
}, {
  icon: Twitter,
  href: "#"
}, {
  icon: Instagram,
  href: "#"
}, {
  icon: Linkedin,
  href: "#"
}];
const Footer = () => {
  return <footer className="bg-[#0c133b] pt-16 pb-8">
    <div className="container-custom section-padding">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Logo isDark />
          <p className="text-white/60 mt-4 mb-6 max-w-sm">
            Professional plumbing services you can trust. Available 24/7 for all your plumbing needs.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => <a key={index} href={social.href} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-tertiary hover:text-primary transition-colors">
              <social.icon className="h-5 w-5" />
            </a>)}
          </div>

          <div className="mt-6">
            <Link to="tel:+1578365379">
              <FlipButton>Call +(1)578-365-379</FlipButton>
            </Link>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h6 className="text-white font-semibold mb-4">Company</h6>
          <ul className="space-y-3">
            {footerLinks.company.map(link => <li key={link.name}>
              <FlipLink href={link.href}>{link.name}</FlipLink>
            </li>)}
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h6 className="text-white font-semibold mb-4">Services</h6>
          <ul className="space-y-3">
            {footerLinks.services.map(link => <li key={link.name}>
              <FlipLink href={link.href}>{link.name}</FlipLink>
            </li>)}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h6 className="text-white font-semibold mb-4">Contact</h6>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
              <a href="tel:(111)222-333-444" className="text-white/60 text-sm">(111) 222-333-444</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
              <a href="mailto:info@aquafix.com" className="text-white/60 text-sm">info@aquafix.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
              <a href="https://www.google.com/maps/place/123+Main+Street,+New+York,+NY+10001" className="text-white/60 text-sm" target="_blank" rel="noopener noreferrer">
                123 Main Street,
                <br />
                New York, NY 10001
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Aquafix. All rights reserved. Designed by Lovable.
          </p>
          <div className="flex gap-6">
            {footerLinks.resources.slice(2).map(link => <a key={link.name} href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
              {link.name}
            </a>)}
          </div>
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;
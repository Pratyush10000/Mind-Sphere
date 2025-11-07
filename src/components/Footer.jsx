import { Link } from "react-router-dom";
import { Heart, Mail, FileText, History, BookOpen, Home } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
              <Heart className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MindSphere
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your comprehensive mental health assessment platform. Track your wellness journey with personalized insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/questionnaire" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mental Health Info
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Crisis Resources
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@mindsphere.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@mindsphere.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground">
                If you're in crisis, please contact:
              </p>
              <p className="text-xs font-semibold text-destructive mt-2">
                988 - Suicide & Crisis Lifeline
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MindSphere. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlockRenderer from '../components/BlockRenderer';
import { Loader2 } from 'lucide-react';
import Logo from '../components/Logo';

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // API Fetch
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const searchSlug = slug || 'home'; // default to home if no slug
        // Ensure slug format is correct. If slug is "about", fetch "about"
        const response = await fetch(`${API_URL}/api/v1/pages/slug/${searchSlug}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setPage(result.data);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error('Failed to fetch page:', error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!page) {
    if (!slug || slug === 'home') {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-background p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <Logo className="w-8 h-8 opacity-90" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Welcome to RenewCred!</h1>
          <p className="text-muted-foreground max-w-md text-lg">
            Your CMS is connected and running perfectly, but you don't have a homepage set up yet.
          </p>
          <div className="p-6 bg-card border border-border shadow-sm rounded-2xl max-w-lg w-full text-left space-y-4 mt-4">
            <h3 className="font-semibold text-foreground text-lg border-b border-border/50 pb-2">How to fix this:</h3>
            <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
              <li>Open your Admin Panel (<code>http://localhost:5173</code>).</li>
              <li>Click <strong>"Create New Page"</strong>.</li>
              <li>Set the Page Title exactly to <strong>"Home"</strong> (which makes the slug <code>home</code>).</li>
              <li>Add your content and hit Save!</li>
            </ol>
            <a 
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Go to Admin Panel
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-background">
        <h1 className="text-4xl font-bold text-foreground">404 - Page Not Found</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist or is not published yet.</p>
        <Link to="/" className="text-primary hover:underline font-medium mt-2">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-gray-200/50 py-4 transition-all">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-6xl">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-sm group-hover:shadow-md transition-all">
              <Logo className="w-5 h-5 opacity-90" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">RenewCred</span>
          </Link>
          <nav className="space-x-8 hidden md:block">
            <Link to="/" className="text-sm text-foreground/70 hover:text-primary font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-foreground/70 hover:text-primary font-medium transition-colors">About</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <BlockRenderer blocks={page.blocks} />
      </main>
      
      <footer className="border-t border-gray-200/50 py-10 text-center text-muted-foreground bg-gray-50/50">
        <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo className="w-4 h-4 text-primary/50" />
            <p className="text-sm font-medium">&copy; {new Date().getFullYear()} RenewCred CMS.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

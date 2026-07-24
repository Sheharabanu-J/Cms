import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../Logo';

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/pages', label: 'Pages', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 glass bg-card/60 border-r border-border/50 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="p-8 border-b border-border/30 flex items-center space-x-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Logo className="w-6 h-6 opacity-90" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">RenewCred</h1>
          <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Admin Panel</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto relative z-10">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-medium transition-all group relative overflow-hidden ${
                isActive 
                  ? 'text-primary shadow-sm' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={20} className={`relative z-10 transition-transform ${isActive ? '' : 'group-hover:scale-110'}`} strokeWidth={isActive ? 2 : 1.5} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border/30 relative z-10">
        <button className="flex items-center space-x-3 px-4 py-3.5 w-full rounded-2xl text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-all group font-medium">
          <LogOut size={20} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

import { Menu, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <header className="glass bg-card/60 border-b border-border/50 h-[4.5rem] flex items-center justify-between px-8 sticky top-0 z-30">
      <button className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-2 rounded-xl hover:bg-muted/50">
        <Menu size={24} />
      </button>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center space-x-6">
        <button className="text-muted-foreground hover:text-primary transition-colors relative group p-2 rounded-xl hover:bg-primary/5">
          <Bell size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive border-2 border-card rounded-full"></span>
          <div className="absolute inset-0 rounded-xl bg-primary/10 scale-0 group-hover:scale-100 transition-transform origin-center" />
        </button>
        <div className="flex items-center space-x-3 cursor-pointer group pl-2 border-l border-border/50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md group-hover:shadow-lg transition-all group-hover:-translate-y-0.5">
            A
          </div>
          <div className="hidden md:flex flex-col">
            <span className="font-semibold text-sm leading-none text-foreground group-hover:text-primary transition-colors">Admin User</span>
            <span className="text-xs text-muted-foreground mt-1 font-medium">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

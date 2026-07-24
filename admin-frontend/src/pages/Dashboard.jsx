import { FileText, Users, Eye, TrendingUp, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative overflow-hidden bg-card/60 glass p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group"
  >
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    <div className="flex items-center space-x-4 relative z-10">
      <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl text-primary border border-primary/10">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline space-x-2 mt-1">
          <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
          {trend && <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{trend}</span>}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-8 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Overview
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Activity size={14} className="text-primary" /> Here's what's happening with your CMS today.
          </p>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pages" value="24" icon={FileText} trend="+12%" delay={0.1} />
        <StatCard title="Total Views" value="45.2K" icon={Eye} trend="+5.4%" delay={0.2} />
        <StatCard title="Active Users" value="12" icon={Users} delay={0.3} />
        <StatCard title="Bounce Rate" value="42%" icon={TrendingUp} trend="-2.1%" delay={0.4} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 glass bg-card/50 p-6 rounded-3xl border border-border/50 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-foreground">Recent Pages</h3>
            <button className="text-sm text-primary hover:underline font-medium">View all</button>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                variants={itemVariants}
                key={i} 
                className="flex items-center justify-between p-4 bg-background/50 hover:bg-background/80 rounded-2xl border border-border/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <FileText size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Getting Started Guide {i}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Last edited 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs rounded-full font-semibold border border-emerald-500/20">
                    Published
                  </span>
                  <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass bg-card/50 p-6 rounded-3xl border border-border/50 shadow-sm flex flex-col"
        >
          <h3 className="font-semibold text-lg mb-6 text-foreground">Quick Actions</h3>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <Link to="/pages/new" className="block w-full relative overflow-hidden group text-left px-5 py-4 bg-primary text-primary-foreground font-medium rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center justify-between">
                <span>+ Create New Page</span>
                <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
            <Link to="/pages" className="w-full flex items-center justify-between px-5 py-4 glass bg-background/50 hover:bg-background font-medium rounded-2xl transition-all text-foreground border border-border/50 hover:-translate-y-0.5">
              <span>Manage Pages</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </Link>
            <Link to="/settings" className="w-full flex items-center justify-between px-5 py-4 glass bg-background/50 hover:bg-background font-medium rounded-2xl transition-all text-foreground border border-border/50 hover:-translate-y-0.5">
              <span>Site Settings</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

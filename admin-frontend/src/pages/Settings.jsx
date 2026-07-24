import { Save, Globe, Paintbrush, Shield, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully (Mock)', {
      icon: '✨',
      style: {
        borderRadius: '10px',
        background: 'var(--card)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)',
      },
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Paintbrush },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your site configuration</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full md:w-64 space-y-2"
        >
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                idx === 0 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 glass bg-card/60 rounded-3xl border border-border/50 shadow-sm p-8 space-y-8"
        >
          <div className="border-b border-border/50 pb-6">
            <h3 className="text-xl font-semibold text-foreground">General Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">Update your website's basic information.</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Site Name</label>
              <input
                type="text"
                defaultValue="RenewCred CMS"
                className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Site Description</label>
              <textarea
                defaultValue="A modern Headless CMS platform."
                rows={4}
                className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all text-foreground resize-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border/50 flex justify-end">
            <button 
              onClick={handleSave}
              className="flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

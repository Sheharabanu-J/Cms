import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Edit, Trash2, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPages, deletePage } from '../store/slices/pagesSlice';
import toast from 'react-hot-toast';

export default function Pages() {
  const dispatch = useDispatch();
  const { pages, loading } = useSelector((state) => state.pages);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await dispatch(deletePage(id)).unwrap();
        toast.success('Page deleted successfully');
      } catch (error) {
        toast.error(error || 'Failed to delete page');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Pages</h1>
          <p className="text-muted-foreground mt-1">Manage your website content</p>
        </div>
        <Link 
          to="/pages/new"
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span>Create Page</span>
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 glass bg-card/60 p-4 rounded-2xl border border-border/50 shadow-sm"
      >
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search pages..." 
            className="w-full bg-background/50 border border-border/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-background/50 border border-border/50 rounded-xl text-sm font-medium hover:bg-background transition-colors w-full sm:w-auto justify-center">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass bg-card/60 rounded-3xl border border-border/50 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          {loading && pages.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Loading pages...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider">
                  <th className="p-5 font-semibold">Page Title</th>
                  <th className="p-5 font-semibold">Slug</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold">Last Edited</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <motion.tbody 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="divide-y divide-border/30"
              >
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-5 text-center text-muted-foreground">No pages found. Create one!</td>
                  </tr>
                ) : pages.map((page) => (
                  <motion.tr 
                    variants={itemVariants}
                    key={page._id} 
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center space-x-4">
                        <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                          <FileText size={18} strokeWidth={1.5} />
                        </div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{page.title}</span>
                      </div>
                    </td>
                    <td className="p-5 text-muted-foreground text-sm font-mono bg-background/20 rounded-md py-1 px-2 mx-5 my-3 inline-block mt-4">{page.slug}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold border ${
                        page.status === 'published' 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }`}>
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-5 text-muted-foreground text-sm">{new Date(page.updatedAt || page.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-background/50 hover:bg-background border border-transparent hover:border-border/50 text-muted-foreground hover:text-primary rounded-lg transition-all">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(page._id)}
                          className="p-2 bg-background/50 hover:bg-background border border-transparent hover:border-destructive/30 text-muted-foreground hover:text-destructive rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}

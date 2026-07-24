import { useState } from 'react';
import BlockEditor from '../components/Editor/BlockEditor';
import { Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../store/slices/pagesSlice';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.pages);

  const handleSave = async () => {
    if (!title) {
      return toast.error('Title is required');
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const pageData = {
      title,
      slug,
      status: 'published', // publish by default for testing
      blocks: [
        {
          type: 'html_embed',
          order: 0,
          visibility: true,
          data: {
            html: content
          }
        }
      ]
    };

    try {
      await dispatch(createPage(pageData)).unwrap();
      toast.success('Page saved successfully!');
      navigate('/pages');
    } catch (error) {
      toast.error(error || 'Failed to save page');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/pages" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft size={20} className="text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create New Page</h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save size={18} />
          <span>{loading ? 'Saving...' : 'Save Page'}</span>
        </button>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground text-lg font-semibold"
            placeholder="Enter page title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Page Content</label>
          <BlockEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}

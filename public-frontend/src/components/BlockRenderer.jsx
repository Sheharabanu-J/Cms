import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function BlockRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (!block.visibility) return null;

        switch (block.type) {
          case 'hero':
            return (
              <div key={index} className="py-20 text-center bg-primary/5 rounded-3xl mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{block.data.title}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{block.data.subtitle}</p>
                {block.data.buttonText && (
                  <Link to="/about" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    {block.data.buttonText}
                  </Link>
                )}
              </div>
            );
            
          case 'paragraph':
          case 'markdown':
            return (
              <div key={index} className="prose prose-lg max-w-none text-gray-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {block.data.text}
                </ReactMarkdown>
              </div>
            );

          case 'math_inline':
            return <InlineMath key={index} math={block.data.equation} />;

          case 'math_display':
            return <BlockMath key={index} math={block.data.equation} />;

          case 'image':
            return (
              <figure key={index} className="my-8">
                <img 
                  src={block.data.url} 
                  alt={block.data.caption || 'Image'} 
                  className="rounded-xl shadow-lg w-full object-cover max-h-[600px]" 
                />
                {block.data.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-3">{block.data.caption}</figcaption>
                )}
              </figure>
            );

          case 'quote':
            return (
              <blockquote key={index} className="p-6 my-6 border-l-4 border-primary bg-primary/5 rounded-r-lg italic text-xl text-gray-800">
                "{block.data.text}"
                {block.data.author && <footer className="mt-4 text-sm font-semibold text-gray-600">— {block.data.author}</footer>}
              </blockquote>
            );

          case 'table':
            // Render basic table, expecting block.data to contain markdown table or html
            return (
              <div key={index} className="overflow-x-auto my-8">
                <div dangerouslySetInnerHTML={{ __html: block.data.html }} className="prose max-w-none" />
              </div>
            );

          case 'html_embed':
            return (
              <div key={index} className="my-8" dangerouslySetInnerHTML={{ __html: block.data.html }} />
            );

          default:
            return (
              <div key={index} className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 my-4">
                Unsupported block type: {block.type}
              </div>
            );
        }
      })}
    </div>
  );
}

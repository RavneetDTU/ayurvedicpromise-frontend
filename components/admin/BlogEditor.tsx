'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { Blog } from '@/types';
import { uploadImage } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Save,
  Globe,
  UploadCloud,
  FileText
} from 'lucide-react';

interface BlogEditorProps {
  initialBlog?: Blog | null;
  token: string;
  onSave: (data: {
    title: string;
    category: string;
    content_en: string;
    content_hi?: string;
    content_hinglish?: string;
    excerpt?: string;
    featured_image_url?: string;
    status: 'draft' | 'published';
  }) => Promise<void>;
  loading: boolean;
}

const CATEGORIES = ['PCOS', 'Hair Fall', 'Weight Loss', 'Diet', 'Lifestyle'];

export const BlogEditor: React.FC<BlogEditorProps> = ({ 
  initialBlog, 
  token, 
  onSave, 
  loading 
}) => {
  const [activeTab, setActiveTab] = useState<'en' | 'hi' | 'hinglish'>('en');

  // Form Fields State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('PCOS');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  // Contents State (as JSON strings or empty objects)
  const [contentEn, setContentEn] = useState('{}');
  const [contentHi, setContentHi] = useState('{}');
  const [contentHinglish, setContentHinglish] = useState('{}');

  // Editor Instances
  const editorEn = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension
    ],
    content: initialBlog ? (JSON.parse(initialBlog.content_en || '{}')) : '',
    onUpdate: ({ editor }) => {
      setContentEn(JSON.stringify(editor.getJSON()));
    }
  });

  const editorHi = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension
    ],
    content: initialBlog?.content_hi ? (JSON.parse(initialBlog.content_hi)) : '',
    onUpdate: ({ editor }) => {
      setContentHi(JSON.stringify(editor.getJSON()));
    }
  });

  const editorHinglish = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension
    ],
    content: initialBlog?.content_hinglish ? (JSON.parse(initialBlog.content_hinglish)) : '',
    onUpdate: ({ editor }) => {
      setContentHinglish(JSON.stringify(editor.getJSON()));
    }
  });

  // Load Initial Blog Values if Editing
  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title);
      setExcerpt(initialBlog.excerpt || '');
      setCategory(initialBlog.category || 'PCOS');
      setCoverImageUrl(initialBlog.featured_image_url || '');
      setIsPublished(initialBlog.status === 'published');
      setContentEn(initialBlog.content_en || '{}');
      setContentHi(initialBlog.content_hi || '{}');
      setContentHinglish(initialBlog.content_hinglish || '{}');

      if (editorEn && initialBlog.content_en) {
        try { editorEn.commands.setContent(JSON.parse(initialBlog.content_en)); } catch { /* ignore */ }
      }
      if (editorHi && initialBlog.content_hi) {
        try { editorHi.commands.setContent(JSON.parse(initialBlog.content_hi)); } catch { /* ignore */ }
      }
      if (editorHinglish && initialBlog.content_hinglish) {
        try { editorHinglish.commands.setContent(JSON.parse(initialBlog.content_hinglish)); } catch { /* ignore */ }
      }
    }
  }, [initialBlog, editorEn, editorHi, editorHinglish]);

  const activeEditor = useMemo(() => {
    if (activeTab === 'hi') return editorHi;
    if (activeTab === 'hinglish') return editorHinglish;
    return editorEn;
  }, [activeTab, editorEn, editorHi, editorHinglish]);

  // Toolbar Handlers
  const toggleBold = () => activeEditor?.chain().focus().toggleBold().run();
  const toggleItalic = () => activeEditor?.chain().focus().toggleItalic().run();
  const toggleH2 = () => activeEditor?.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleH3 = () => activeEditor?.chain().focus().toggleHeading({ level: 3 }).run();
  const toggleBulletList = () => activeEditor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => activeEditor?.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => activeEditor?.chain().focus().toggleBlockquote().run();
  
  const setLink = () => {
    if (!activeEditor) return;
    const previousUrl = activeEditor.getAttributes('link').href;
    const url = window.prompt('Enter Link Destination URL:', previousUrl || 'https://');
    
    if (url === null) return;
    if (url === '') {
      activeEditor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    activeEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Inline Media Reference
  const inlineImageInputRef = useRef<HTMLInputElement>(null);
  const triggerInlineImageUpload = () => inlineImageInputRef.current?.click();
  
  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeEditor) return;

    try {
      const res = await uploadImage(file, token);
      activeEditor.chain().focus().setImage({ src: res.url, alt: file.name }).run();
    } catch {
      alert('Inline image upload failed. Please try again.');
    }
  };

  // Cover Image Media Handlers
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const res = await uploadImage(file, token);
      setCoverImageUrl(res.url);
    } catch {
      alert('Cover image upload failed.');
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('English Title is required.');
      return;
    }

    const payload: {
      title: string;
      category: string;
      excerpt?: string;
      featured_image_url?: string;
      status: 'draft' | 'published';
      content_en: string;
      content_hi?: string;
      content_hinglish?: string;
    } = {
      title: title.trim(),
      category,
      excerpt: excerpt.trim() || undefined,
      featured_image_url: coverImageUrl || undefined,
      status: isPublished ? 'published' : 'draft',
      content_en: contentEn,
    };

    // Only submit languages that have some content (i.e. not empty object '{}')
    if (contentHi && contentHi !== '{}') {
      payload.content_hi = contentHi;
    }
    if (contentHinglish && contentHinglish !== '{}') {
      payload.content_hinglish = contentHinglish;
    }

    await onSave(payload);
  };

  return (
    <div className="flex flex-col gap-6 text-left font-admin max-w-5xl">
      
      {/* Action Save Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {initialBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">Configure categories, cover photos, and translate bodies</p>
        </div>
        <Button
          onClick={handleSave}
          isLoading={loading}
          className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 border-0 font-admin text-sm px-6 py-2.5"
        >
          <Save className="h-4 w-4" />
          Save Article
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Editor & Tabs */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          
          {/* Translation Selection Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-2 flex items-center gap-1">
              <Globe className="h-4 w-4" /> Localization:
            </span>
            {(['en', 'hi', 'hinglish'] as const).map((tab) => {
              const isSelected = activeTab === tab;
              const tabLabels = { en: 'English (EN)', hi: 'हिन्दी (HI)', hinglish: 'Hinglish' };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold focus:outline-none transition-all ${
                    isSelected 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>

          {/* Title Ingestion (Required for EN, optional or mapped for HI/Hinglish) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="blog-title" className="text-xs text-slate-500 font-bold uppercase tracking-wide">
              Article Title ({activeTab.toUpperCase()}) *
            </label>
            <input
              id="blog-title"
              type="text"
              placeholder={`Enter ${activeTab} title...`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
            />
          </div>

          {/* TipTap Rich Text Area */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500 font-bold uppercase tracking-wide">
              Article Content ({activeTab.toUpperCase()})
            </label>

            {/* Editor Container */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
              
              {/* ToolBar */}
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1 items-center">
                <button 
                  onClick={toggleBold} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('bold') ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button 
                  onClick={toggleItalic} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('italic') ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button 
                  onClick={toggleH2} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('heading', { level: 2 }) ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={toggleH3} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('heading', { level: 3 }) ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Heading 3"
                >
                  <Heading3 className="h-4 w-4" />
                </button>
                <span className="w-px h-5 bg-slate-200 mx-1" />
                <button 
                  onClick={toggleBulletList} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('bulletList') ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </button>
                <button 
                  onClick={toggleOrderedList} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('orderedList') ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <button 
                  onClick={toggleBlockquote} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('blockquote') ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Blockquote"
                >
                  <Quote className="h-4 w-4" />
                </button>
                <span className="w-px h-5 bg-slate-200 mx-1" />
                <button 
                  onClick={setLink} 
                  className={`p-1.5 rounded text-slate-500 hover:bg-slate-200 ${activeEditor?.isActive('link') ? 'bg-slate-200 text-slate-800' : ''}`}
                  title="Insert Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
                <button 
                  onClick={triggerInlineImageUpload}
                  className="p-1.5 rounded text-slate-500 hover:bg-slate-200"
                  title="Insert Inline Image"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
                
                {/* Hidden File Input for TipTap Inline Upload */}
                <input 
                  type="file" 
                  ref={inlineImageInputRef}
                  onChange={handleInlineImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Editor Workspace */}
              <div className="flex-1 p-4 overflow-y-auto min-h-[350px] focus-within:outline-none">
                {activeEditor && (
                  <EditorContent 
                    editor={activeEditor} 
                    className="font-body text-slate-700 leading-relaxed text-sm h-full outline-none prose max-w-none focus:outline-none" 
                  />
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Settings & Metadata */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Metadata Settings */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" /> Article Settings
            </h3>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="blog-category" className="text-xs text-slate-400 font-semibold">
                Category
              </label>
              <select
                id="blog-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Excerpt Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="blog-excerpt" className="text-xs text-slate-400 font-semibold">
                Article Excerpt (SEO Meta Description)
              </label>
              <textarea
                id="blog-excerpt"
                placeholder="Write a brief, catchy summary of the article..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[90px] resize-none"
              />
            </div>
          </div>

          {/* Cover Photo */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Featured Cover Image
            </h3>

            {coverImageUrl ? (
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={coverImageUrl}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => setCoverImageUrl('')}
                  className="text-xs font-semibold text-red-500 hover:underline text-left"
                >
                  Remove Cover Image
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-lg p-6 cursor-pointer select-none transition-all group">
                <UploadCloud className={`h-8 w-8 text-slate-300 group-hover:text-slate-500 mb-2 ${isUploadingCover ? 'animate-bounce' : ''}`} />
                <span className="text-xs font-bold text-slate-700">
                  {isUploadingCover ? 'Uploading Cover...' : 'Upload Featured Image'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">Recommended: 1200 x 675 px</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  disabled={isUploadingCover}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Publish Toggle */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Publish Settings
            </h3>
            
            <label className="flex items-center gap-3 py-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="accent-slate-800 h-4 w-4 rounded"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-700">Set as Published</span>
                <span className="text-[10px] text-slate-400 mt-0.5">If unchecked, this remains a draft in the index.</span>
              </div>
            </label>
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  Tag, 
  ChevronRight, 
  X,
  Share2,
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogsData';
import { BlogPost } from '../types';

interface BlogPageProps {
  onNavigate: (view: string, serviceSlug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cold Email & Deliverability', 'Account Security', 'Developer & SMTP', 'Student & EDU Deals'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50/60 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Base & Best Practices
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-slate-950 tracking-tight">
            Email Deliverability & Account Guides
          </h1>
          <p className="text-sm text-slate-600">
            Master account warmups, SMTP App Passwords, proxy management, and student software perks.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 hover:border-red-300 hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                    {post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.date}</span>
                </div>

                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Read Full Article Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                    {selectedPost.category} • {selectedPost.readTime}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>By {selectedPost.author}</span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                <div className="pt-4 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-400 block mb-2">TAGS & TOPICS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contextual Service Recommendations based on Article Topic */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                    Recommended Accounts for this Setup:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.id === '1' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'aged-gmail-app-passwords');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Aged Gmail with App Passwords (SMTP)</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'usa-aged-gmail-2000-2016');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>USA Vintage Gmail (2000–2016)</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                      </>
                    )}
                    {selectedPost.id === '2' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'fresh-usa-pva-gmail');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Fresh USA PVA Gmail (Physical SIM)</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'iphone-created-gmail');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>iPhone iOS Created Gmail</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                      </>
                    )}
                    {selectedPost.id === '3' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'aged-gmail-app-passwords');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Pre-Configured App Password Accounts</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'aged-hotmail-outlook');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Aged Hotmail & Outlook (IMAP/POP3)</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                      </>
                    )}
                    {selectedPost.id === '4' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'edu-email-accounts');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Active .EDU Student Email Accounts</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onNavigate('service-detail', 'github-student-pack-edu');
                          }}
                          className="text-xs font-bold text-slate-800 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>GitHub Student Developer Pack .EDU</span>
                          <ArrowRight className="w-3 h-3 text-blue-600" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Direct Action Promo */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">Need Aged or App-Password Gmails?</h4>
                    <p className="text-xs text-slate-400">Order verified accounts with 72h replacement guarantee.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onNavigate('shop');
                    }}
                    className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
                  >
                    View Account Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

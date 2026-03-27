
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ApplicationPage } from './pages/Application';
import { AdminPage } from './pages/Admin';
import { Rules } from './pages/Rules';
import { Mods } from './pages/Mods';
import { Application, ModSuggestion } from './types';
import { Lock } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [applications, setApplications] = useState<Application[]>([]);
  const [modSuggestions, setModSuggestions] = useState<ModSuggestion[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const DISCORD_LINK = "https://discord.gg/TwSNfFr7";

  // Load from localStorage on mount
  useEffect(() => {
    const savedApps = localStorage.getItem('stable_applications');
    if (savedApps) {
      setApplications(JSON.parse(savedApps));
    }

    const savedMods = localStorage.getItem('stable_mod_suggestions');
    if (savedMods) {
      setModSuggestions(JSON.parse(savedMods));
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('stable_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('stable_mod_suggestions', JSON.stringify(modSuggestions));
  }, [modSuggestions]);

  const handleNavigate = (page: string) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleApply = (newAppData: Omit<Application, 'id' | 'status' | 'submittedAt'>) => {
    const newApp: Application = {
      ...newAppData,
      id: Math.random().toString(36).substring(2, 9),
      status: 'Pending',
      submittedAt: Date.now()
    };
    setApplications(prev => [...prev, newApp]);
  };

  const updateAppStatus = (id: string, status: 'Accepted' | 'Denied') => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const deleteApp = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleSuggestMod = (newModData: Omit<ModSuggestion, 'id' | 'submittedAt'>) => {
    const newMod: ModSuggestion = {
      ...newModData,
      id: Math.random().toString(36).substring(2, 9),
      submittedAt: Date.now()
    };
    setModSuggestions(prev => [...prev, newMod]);
  };

  const deleteModSuggestion = (id: string) => {
    if (confirm('Are you sure you want to delete this suggestion?')) {
      setModSuggestions(prev => prev.filter(mod => mod.id !== id));
    }
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCode === '654321') {
      setIsAdminMode(true);
      setShowAdminModal(false);
      setAdminCode('');
      handleNavigate('admin');
    } else {
      alert('Incorrect access code.');
      setAdminCode('');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'rules' && <Rules />}
        {currentPage === 'mods' && <Mods onSuggest={handleSuggestMod} />}
        {currentPage === 'application' && <ApplicationPage onSubmit={handleApply} />}
        {currentPage === 'admin' && (
          isAdminMode ? (
            <AdminPage 
              applications={applications} 
              modSuggestions={modSuggestions}
              onUpdateStatus={updateAppStatus} 
              onDelete={deleteApp} 
              onDeleteModSuggestion={deleteModSuggestion}
            />
          ) : (
            <div className="pt-48 text-center min-h-screen">
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Access Restricted</h1>
              <p className="text-gray-400 mb-8">This area is reserved for server administrators.</p>
              <button 
                onClick={() => handleNavigate('home')} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md"
              >
                Go Home
              </button>
            </div>
          )
        )}
      </main>

      {/* Custom Admin Auth Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAdminModal(false)}></div>
          <div className="relative glass w-full max-w-md p-10 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-center text-white uppercase tracking-tight mb-2">Admin Access</h2>
            <p className="text-center text-gray-400 text-sm mb-8">Please enter the security code to proceed.</p>
            
            <form onSubmit={handleAdminAuthSubmit} className="space-y-6">
              <input 
                autoFocus
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-gray-400 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-md"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="py-16 border-t border-white/5 bg-[#080808] px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-30">
            <span className="font-bold text-xs tracking-widest text-white uppercase">CREATE 80ct</span>
            <span className="text-[10px] text-gray-600">© 2024. All rights reserved.</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
              <button onClick={() => handleNavigate('rules')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => handleNavigate('rules')} className="hover:text-white transition-colors">Terms & Rules</button>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#5865F2] transition-colors">Discord</a>
            </div>
            
            {/* Hidden Admin Button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowAdminModal(true);
              }}
              className="mt-4 text-[10px] text-white/5 hover:text-white/40 hover:bg-white/5 px-2 py-1 rounded transition-all uppercase font-black tracking-widest cursor-pointer"
              aria-label="Admin Access"
            >
              System Access
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

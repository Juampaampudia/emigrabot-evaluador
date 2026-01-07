import React, { useState } from 'react';
import { EvaluatorChat } from './components/features/EvaluatorChat';
import { EvaluationResult } from './components/features/EvaluationResult';
import { CaseList } from './components/dashboard/CaseList';
import { Bot, LayoutDashboard, Sparkles, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/Button';
import { useLanguage, LANGUAGES } from './lib/LanguageContext';
import { ProLoginModal } from './components/features/ProLoginModal';

type View = 'chat' | 'results' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showProLogin, setShowProLogin] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleChatComplete = () => {
    setCurrentView('results');
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Login Modal - Kept in codebase but triggers are currently deactivated */}
      {showProLogin && <ProLoginModal onClose={() => setShowProLogin(false)} />}

      {/* Navbar - Updated to Corporate Dark Blue */}
      <nav className="bg-primary border-b border-white/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('chat')}>
              <div className="bg-white/10 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">emigr<span className="text-secondary">AI</span> BOT EVALUADOR</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentView('chat')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'chat' || currentView === 'results' ? 'text-white' : 'text-blue-200 hover:text-white'}`}
              >
                <Bot size={18} />
                {t('nav_evaluator')}
              </button>
              {/* Gestión - Desactivado temporalmente (solo para agencias) */}
              {/* <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'text-white' : 'text-blue-200 hover:text-white'}`}
              >
                <LayoutDashboard size={18} />
                {t('nav_management')}
              </button> */}

              <div className="h-6 w-px bg-white/20 mx-2"></div>
              
              {/* Language Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 200)}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                >
                  <span className="text-lg">{currentLang.flag}</span>
                  <span className="uppercase">{currentLang.code}</span>
                  <ChevronDown size={14} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 overflow-hidden animate-fade-in">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-3 ${language === lang.code ? 'bg-blue-50 text-primary font-bold' : 'text-gray-700'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Area Profesional - Inactivo por solicitud */}
              <Button 
                size="sm" 
                variant="secondary" 
                className="font-bold opacity-50 cursor-not-allowed"
                disabled
              >
                {t('nav_professional')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-3">
               {/* Mobile Lang Selector */}
               <button 
                  onClick={() => {
                    // Simple cycle for mobile
                    const currentIndex = LANGUAGES.findIndex(l => l.code === language);
                    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
                    setLanguage(LANGUAGES[nextIndex].code);
                  }}
                  className="text-white font-bold text-sm bg-white/10 px-2 py-1 rounded flex items-center gap-1"
                >
                  <span>{currentLang.flag}</span>
                  <span className="uppercase">{currentLang.code}</span>
                </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-white/10 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-primary">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => { setCurrentView('chat'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-white/10"
              >
                {t('nav_evaluator')}
              </button>
              {/* Gestión - Desactivado temporalmente (solo para agencias) */}
              {/* <button
                onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-white/10"
              >
                {t('nav_management')}
              </button> */}
              {/* Area Profesional Mobile - Inactivo */}
              <button
                disabled
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 opacity-50 cursor-not-allowed"
              >
                {t('nav_professional')}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'chat' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                {t('hero_title')}
              </h1>
              <p className="text-lg text-text-secondary">
                {t('hero_subtitle')}
              </p>
            </div>
            <EvaluatorChat onComplete={handleChatComplete} />
          </div>
        )}

        {currentView === 'results' && (
          <div className="animate-fade-in space-y-6">
             <div className="flex justify-between items-center max-w-4xl mx-auto mb-4">
              <button onClick={() => setCurrentView('chat')} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
                 ← {language === 'es' ? 'Volver' : 'Back'}
              </button>
             </div>
            <EvaluationResult />
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{t('dash_title')}</h1>
              <Button>{t('dash_new')}</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              {/* Stats Cards */}
              {[
                { label: t('dash_active'), val: '24', color: 'text-primary', bg: 'bg-blue-50' },
                { label: t('dash_approved'), val: '12', color: 'text-green-600', bg: 'bg-green-50' },
                { label: t('dash_pending'), val: '8', color: 'text-secondary', bg: 'bg-orange-50' },
                { label: t('dash_success_rate'), val: '94%', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                    <Sparkles size={20} className={stat.color} />
                  </div>
                </div>
              ))}
            </div>
            <CaseList />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            {t('footer')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

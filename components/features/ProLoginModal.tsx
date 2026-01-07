import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Lock, Building2 } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

interface ProLoginModalProps {
  onClose: () => void;
}

export const ProLoginModal: React.FC<ProLoginModalProps> = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md relative overflow-hidden shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <div className="bg-primary p-6 text-white text-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={24} className="text-secondary" />
          </div>
          <h2 className="text-2xl font-bold">{t('login_title')}</h2>
          <p className="text-blue-200 text-sm mt-1">{t('login_desc')}</p>
        </div>

        <div className="p-6 space-y-4 bg-white">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('login_email')}</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="lawyer@firm.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('login_pass')}</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-gray-500">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-primary hover:underline">{t('login_forgot')}</a>
          </div>

          <Button className="w-full mt-2" size="lg" onClick={onClose}>
            <Lock size={16} className="mr-2" /> {t('login_btn')}
          </Button>
          
          <div className="text-center mt-4">
             <p className="text-xs text-gray-400">Protected by EmigraAI Secure Auth</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Share2, Palette } from 'lucide-react';
import logoImg from '../assets/images/fraccionamente_logo_1793745577677.jpg';
import { Language, Translations } from '../utils/i18n';

interface PromoKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: Translations;
  onToast: (msg: string) => void;
}

export const PromoKitModal: React.FC<PromoKitModalProps> = ({
  isOpen,
  onClose,
  lang,
  t,
  onToast,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const promoTexts = lang === 'ru' ? [
    {
      title: 'Для мессенджеров и соцсетей (кратко)',
      text: '🚀 Откройте для себя FraccionaMente! Интерактивная платформа для освоения дробей с геймификацией, визуальной лабораторией и рекордами. 🍕➗ © 2026 Prof. Liliana Alvarez. Mg. Domi 1- Todos los derechos reservados.- Попробуйте прямо сейчас!',
    },
    {
      title: 'Для школьного объявления / родителей',
      text: '📚 FraccionaMente: современная математическая платформа для школьников. Изучайте сложение, вычитание, умножение и деление дробей через визуальные пиццы, полосы и тайм-аттак. Поддерживает офлайн-режим и индивидуальные профили учащихся.',
    },
    {
      title: 'Слоган и хэштеги',
      text: '🎯 FraccionaMente: Дроби — это просто и увлекательно!\n#Математика #Дроби #Образование #FraccionaMente #EdTech',
    },
  ] : [
    {
      title: 'Para WhatsApp y redes sociales (corto)',
      text: '🚀 ¡Descubre FraccionaMente! La plataforma interactiva y gamificada para dominar las fracciones con laboratorio visual, retos y recompensas. 🍕➗ © 2026 Prof. Liliana Alvarez. Mg. Domi 1- Todos los derechos reservados.- ¡Aprende jugando!',
    },
    {
      title: 'Para comunicado escolar / padres de familia',
      text: '📚 FraccionaMente es una herramienta pedagógica diseñada para facilitar el aprendizaje de operaciones con fracciones (suma, resta, multiplicación y división). Cuenta con representaciones visuales interactivas, modo contrarreloj, perfiles independientes de estudiantes y modo sin conexión.',
    },
    {
      title: 'Lema institucional y hashtags',
      text: '🎯 FraccionaMente: ¡Las fracciones nunca fueron tan fáciles y divertidas!\n#Matemáticas #Fracciones #EducaciónInteractiva #FraccionaMente #EdTech',
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    onToast(lang === 'ru' ? 'Текст скопирован в буфер обмена!' : '¡Texto promocional copiado al portapapeles!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = logoImg;
    link.download = 'FraccionaMente-Logo-Oficial.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast(lang === 'ru' ? 'Скачивание логотипа началось!' : '¡Descarga del logo iniciada!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl shadow-inner">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {lang === 'ru' ? 'Промо-материалы и официальный логотип' : 'Kit Promocional y Logo Oficial'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {lang === 'ru' 
                  ? 'Изображение высокого разрешения для постеров, соцсетей и презентаций'
                  : 'Imagen en alta resolución para folletos, redes sociales, fichas y presentaciones'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-8">
          
          {/* Logo Showcase Card */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-slate-50 to-purple-50/50 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
            <div className="relative group shrink-0">
              <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-300 dark:border-indigo-500/40 bg-slate-900 flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="FraccionaMente Logo Oficial"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white tracking-wider uppercase">
                HD 1:1
              </span>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                  <Palette className="w-3.5 h-3.5" />
                  {lang === 'ru' ? 'Готово к публикации' : 'Listo para difusión'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  FraccionaMente · App Icon & Logo
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {lang === 'ru'
                    ? '3D-композиция с интерактивными долями пиццы (половины, трети, четверти), символами операций (+, −, ×, ÷) и неоновым свечением. Идеально подходит для аватарок, флаеров и баннеров.'
                    : 'Diseño 3D isométrico con discos fraccionarios (medios, tercios, cuartos), símbolos matemáticos (+, −, ×, ÷) y acabados de cristal y neón vibrante. Perfecto para portada, afiches y presentaciones.'}
                </p>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    {lang === 'ru' ? 'Формат' : 'Formato'}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">JPG Ultra HD (1024×1024)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    {lang === 'ru' ? 'Преподаватель' : 'Docente Responsable'}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    © 2026 Prof. Liliana Alvarez. Mg. Domi 1- Todos los derechos reservados.-
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ru' ? 'Скачать логотип (HD)' : 'Descargar Logo en HD'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Promotional Copy Snippets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-500" />
                {lang === 'ru' ? 'Готовые тексты для продвижения' : 'Textos listos para compartir'}
              </h4>
              <span className="text-xs text-slate-400">
                {lang === 'ru' ? 'Нажмите, чтобы скопировать' : 'Clic en copiar para usar'}
              </span>
            </div>

            <div className="grid gap-3">
              {promoTexts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:border-indigo-300 dark:hover:border-indigo-700/60 transition"
                >
                  <div className="flex-1 pr-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                      {item.title}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(item.text, idx)}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 transition shadow-xs"
                    title={lang === 'ru' ? 'Скопировать текст' : 'Copiar texto'}
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">{lang === 'ru' ? 'Скопировано!' : '¡Copiado!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ru' ? 'Копировать' : 'Copiar'}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Palette Guide */}
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                {lang === 'ru' ? 'Фирменные цвета для оформления' : 'Paleta institucional sugerida'}:
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Indigo Royal (#4F46E5) · Esmeralda Fraccional (#10B981) · Ámbar Matemático (#F59E0B) · Pizarra Profunda (#0F172A)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4F46E5] shadow-xs" title="#4F46E5" />
              <span className="w-6 h-6 rounded-full bg-[#10B981] shadow-xs" title="#10B981" />
              <span className="w-6 h-6 rounded-full bg-[#F59E0B] shadow-xs" title="#F59E0B" />
              <span className="w-6 h-6 rounded-full bg-[#0F172A] border border-white/20 shadow-xs" title="#0F172A" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

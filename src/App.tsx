import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  getCurrentProfile,
  loadProfiles,
  saveProfiles,
  updateCurrentProfile,
  setCurrentProfileId,
  createDefaultProfile,
  createNewStudentProfile,
  resetProfileStats,
  loadMistakes,
  addMistake,
  markMistakeSolved,
} from './utils/storage';
import { useOnlineStatus } from './utils/useOnlineStatus';
import { sounds } from './utils/soundEffects';
import { DifficultyLevel, Fraction, MistakeRecord, Operation, Problem, UserProfile } from './types/fractions';
import { generateProblem } from './utils/mathEngine';
import { Language, translations } from './utils/i18n';

// Components
import { Header } from './components/Header';
import { OfflineBanner } from './components/OfflineBanner';
import { GamePlayModal } from './views/GamePlayModal';
import { ProfileManagerModal } from './components/ProfileManagerModal';
import { DailyReminderModal } from './components/DailyReminderModal';
import { PromoKitModal } from './components/PromoKitModal';
import { MobileTabBar } from './components/MobileTabBar';

// Views
import { AdventureView } from './views/AdventureView';
import { TimeAttackView } from './views/TimeAttackView';
import { LabVisualizerView } from './views/LabVisualizerView';
import { MistakesNotebookView } from './views/MistakesNotebookView';
import { AnalyticsView } from './views/AnalyticsView';
import { LeaderboardView } from './views/LeaderboardView';
import { AchievementsView } from './views/AchievementsView';

export default function App() {
  // Language state (Spanish / Russian)
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('frac_language');
      if (saved === 'ru' || saved === 'es') return saved;
    }
    return 'es';
  });

  const t = translations[lang];

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('frac_theme_mode');
      if (saved) return saved === 'dark';
      return true; // Default dark mode
    }
    return true;
  });

  // User Profile
  const [profiles, setProfiles] = useState<UserProfile[]>(loadProfiles);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(getCurrentProfile);

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<string>('laboratorio');

  // Network & Sync
  const { isOnline, isSyncing, justSyncedCount, manualSync } = useOnlineStatus();

  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);

  // Active Mission / Question State
  const [activeProblems, setActiveProblems] = useState<Problem[] | null>(null);
  const [currentProblemIdx, setCurrentProblemIdx] = useState<number>(0);
  const [missionLevelId, setMissionLevelId] = useState<number | null>(null);
  const [missionScore, setMissionScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [singleProblem, setSingleProblem] = useState<Problem | null>(null);

  // Mistakes
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => loadMistakes(currentProfile.id));

  // In-App Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply language attribute and save
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('frac_language', lang);
  }, [lang]);

  // Apply dark mode class to root document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('frac_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('frac_theme_mode', 'light');
    }
  }, [isDarkMode]);

  // Listen for in-app push notifications
  useEffect(() => {
    const handleInAppNotif = (e: Event) => {
      const custom = e as CustomEvent<{ title: string; body: string }>;
      if (custom.detail) {
        showToast(`${custom.detail.title} — ${custom.detail.body}`);
      }
    };
    window.addEventListener('frac_in_app_notification', handleInAppNotif);
    return () => window.removeEventListener('frac_in_app_notification', handleInAppNotif);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleToggleLanguage = () => {
    sounds.playClick();
    const nextLang = lang === 'es' ? 'ru' : 'es';
    setLang(nextLang);
    showToast(nextLang === 'ru' ? 'Язык изменен на Русский 🇷🇺' : 'Idioma cambiado a Español 🇪🇸');
  };

  const handleToggleTheme = () => {
    sounds.playClick();
    setIsDarkMode(prev => !prev);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  // Profile Switching & Creation
  const handleSelectProfile = (id: string) => {
    setCurrentProfileId(id);
    const updated = getCurrentProfile();
    setCurrentProfile(updated);
    setMistakes(loadMistakes(updated.id));
    setIsProfileModalOpen(false);
  };

  const handleCreateProfile = (name: string, avatar: string) => {
    const newProf = createNewStudentProfile(name, avatar);
    const updatedProfiles = [...profiles, newProf];
    saveProfiles(updatedProfiles);
    setProfiles(updatedProfiles);
    setCurrentProfileId(newProf.id);
    setCurrentProfile(newProf);
    setMistakes([]);
    setIsProfileModalOpen(false);
    showToast(
      lang === 'ru'
        ? `Профиль "${name}" создан с чистой статистикой!`
        : `¡Perfil de "${name}" creado con estadísticas desde cero!`
    );
  };

  const handleResetProfileStats = (id: string) => {
    const updated = resetProfileStats(id);
    setProfiles(loadProfiles());
    if (currentProfile.id === id) {
      setCurrentProfile(updated);
      setMistakes([]);
    }
    showToast(
      lang === 'ru'
        ? 'Статистика учащегося успешно сброшена до нуля.'
        : 'Estadísticas del estudiante reiniciadas a cero.'
    );
  };

  const handleUpdateProfile = (name: string, avatar: string) => {
    const updated = updateCurrentProfile(prev => ({ ...prev, name, avatar }));
    setCurrentProfile(updated);
    setProfiles(loadProfiles());
  };

  const handleEquipAvatar = (avatarId: string) => {
    sounds.playCorrect();
    handleUpdateProfile(currentProfile.name, avatarId);
    showToast(
      lang === 'ru'
        ? 'Аватар успешно выбран!'
        : '¡Avatar equipado con éxito!'
    );
  };

  // Launch a set of level problems
  const handleStartLevel = (levelId: number, problems: Problem[]) => {
    setMissionLevelId(levelId);
    setActiveProblems(problems);
    setCurrentProblemIdx(0);
    setMissionScore({ correct: 0, total: problems.length });
  };

  // Launch a single quick-play problem
  const handleQuickPlay = (diff: DifficultyLevel, op?: Operation) => {
    sounds.playClick();
    const prob = generateProblem(op, diff, undefined, lang);
    setSingleProblem(prob);
  };

  // Answer handler for GamePlayModal
  const handleAnswerQuestion = (isCorrect: boolean, chosenFraction: Fraction) => {
    const activeProb = activeProblems ? activeProblems[currentProblemIdx] : singleProblem;
    if (!activeProb) return;

    // Update user stats
    const updated = updateCurrentProfile(prev => {
      const stats = { ...prev.stats };
      stats.totalSolved += 1;
      if (isCorrect) stats.totalCorrect += 1;

      // Update by operation stats
      const opKey = activeProb.operation;
      stats.byOperation[opKey].attempted += 1;
      if (isCorrect) stats.byOperation[opKey].correct += 1;

      // Streak
      if (isCorrect) {
        stats.streak += 1;
        if (stats.streak > stats.bestStreak) stats.bestStreak = stats.streak;
      } else {
        stats.streak = 0;
      }

      // XP and Level calculation
      const xpEarned = isCorrect ? 25 : 5;
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.max(prev.level, Math.floor(newXp / 200) + 1);

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        stats,
      };
    });

    setCurrentProfile(updated);

    // If incorrect, add to mistake record
    if (!isCorrect) {
      addMistake(currentProfile.id, activeProb, chosenFraction);
      setMistakes(loadMistakes(currentProfile.id));
    }

    // Advance mission or close single play
    if (activeProblems) {
      if (isCorrect) {
        setMissionScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      }

      if (currentProblemIdx + 1 < activeProblems.length) {
        setCurrentProblemIdx(prev => prev + 1);
      } else {
        // Level completed!
        const finalCorrect = missionScore.correct + (isCorrect ? 1 : 0);
        const earnedStars = finalCorrect >= 5 ? 3 : finalCorrect >= 3 ? 2 : 1;

        if (missionLevelId && missionLevelId >= currentProfile.unlockedLevel) {
          updateCurrentProfile(p => ({
            ...p,
            unlockedLevel: p.unlockedLevel + 1,
            stars: p.stars + earnedStars,
          }));
          setCurrentProfile(getCurrentProfile());
        }

        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        showToast(
          lang === 'ru'
            ? `Миссия пройдена! Заработано ${earnedStars} звезд.`
            : `¡Misión completada! Ganaste ${earnedStars} estrellas.`
        );
        setActiveProblems(null);
        setMissionLevelId(null);
      }
    } else {
      setSingleProblem(null);
    }
  };

  // Time Attack Game Finish
  const handleFinishTimeAttack = (
    score: number,
    correctCount: number,
    totalCount: number,
    runMistakes: Array<{ problem: Problem; answer: Fraction }>
  ) => {
    runMistakes.forEach(m => {
      addMistake(currentProfile.id, m.problem, m.answer);
    });
    setMistakes(loadMistakes(currentProfile.id));

    const updated = updateCurrentProfile(prev => {
      const stats = { ...prev.stats };
      stats.totalSolved += totalCount;
      stats.totalCorrect += correctCount;
      if (score > stats.highScoreTimeAttack) {
        stats.highScoreTimeAttack = score;
      }

      const xpEarned = Math.round(score / 5) + correctCount * 10;
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.max(prev.level, Math.floor(newXp / 200) + 1);

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        stats,
      };
    });

    setCurrentProfile(updated);
  };

  // Retry a specific mistake from Cuaderno de Errores
  const handleRetryMistake = (mistake: MistakeRecord) => {
    sounds.playClick();
    setSingleProblem({
      ...mistake.problem,
      id: `retry_${mistake.id}`,
    });
  };

  const handleMarkMistakeSolved = (mistakeId: string) => {
    markMistakeSolved(mistakeId);
    setMistakes(loadMistakes(currentProfile.id));
    showToast(lang === 'ru' ? 'Пример отмечен как освоенный!' : '¡Ejercicio marcado como dominado!');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col">
      {/* Offline Connectivity & Cloud Sync Status Banner */}
      <OfflineBanner
        isOnline={isOnline}
        isSyncing={isSyncing}
        justSyncedCount={justSyncedCount}
        onManualSync={manualSync}
        t={t}
      />

      {/* Top Bar Header with Language Switcher */}
      <Header
        currentTab={currentTab}
        onTabChange={tab => {
          sounds.playClick();
          setCurrentTab(tab);
        }}
        profile={currentProfile}
        onOpenProfile={() => {
          sounds.playClick();
          setIsProfileModalOpen(true);
        }}
        onOpenReminder={() => {
          sounds.playClick();
          setIsReminderModalOpen(true);
        }}
        onOpenPromo={() => {
          sounds.playClick();
          setIsPromoModalOpen(true);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
        t={t}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-32 sm:pb-28 lg:pb-16">
        {currentTab === 'aventura' && (
          <AdventureView
            profile={currentProfile}
            onStartLevel={handleStartLevel}
            onQuickPlay={handleQuickPlay}
            t={t}
            lang={lang}
          />
        )}

        {currentTab === 'contrarrelj' && (
          <TimeAttackView
            profile={currentProfile}
            onFinishGame={handleFinishTimeAttack}
            onOpenMistakes={() => setCurrentTab('errores')}
            t={t}
            lang={lang}
          />
        )}

        {currentTab === 'laboratorio' && <LabVisualizerView t={t} lang={lang} />}

        {currentTab === 'errores' && (
          <MistakesNotebookView
            mistakes={mistakes}
            onRetryMistake={handleRetryMistake}
            onMarkSolved={handleMarkMistakeSolved}
            t={t}
            lang={lang}
          />
        )}

        {currentTab === 'estadisticas' && <AnalyticsView profile={currentProfile} t={t} lang={lang} />}

        {currentTab === 'clasificacion' && <LeaderboardView t={t} lang={lang} />}

        {currentTab === 'logros' && (
          <AchievementsView
            profile={currentProfile}
            t={t}
            lang={lang}
            onEquipAvatar={handleEquipAvatar}
          />
        )}
      </main>

      {/* Active Problem Solving Modal */}
      {(activeProblems || singleProblem) && (
        <GamePlayModal
          problem={activeProblems ? activeProblems[currentProblemIdx] : singleProblem!}
          onAnswer={handleAnswerQuestion}
          onClose={() => {
            setActiveProblems(null);
            setSingleProblem(null);
          }}
          comboCount={currentProfile.stats.streak}
          questionNumber={activeProblems ? currentProblemIdx + 1 : undefined}
          totalQuestions={activeProblems ? activeProblems.length : undefined}
          t={t}
          lang={lang}
        />
      )}

      {/* Profile Management Modal */}
      {isProfileModalOpen && (
        <ProfileManagerModal
          currentProfile={currentProfile}
          profiles={profiles}
          onSelectProfile={handleSelectProfile}
          onCreateProfile={handleCreateProfile}
          onUpdateProfile={handleUpdateProfile}
          onResetStats={handleResetProfileStats}
          onClose={() => setIsProfileModalOpen(false)}
          t={t}
        />
      )}

      {/* Daily Study Reminder & Push Notification Modal */}
      {isReminderModalOpen && (
        <DailyReminderModal
          onClose={() => setIsReminderModalOpen(false)}
          onToast={showToast}
          t={t}
          lang={lang}
        />
      )}

      {/* Promotional Kit & Logo Modal */}
      <PromoKitModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        lang={lang}
        t={t}
        onToast={showToast}
      />

      {/* In-App Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-4 shadow-2xl border border-slate-800 dark:border-slate-200 animate-in slide-in-from-bottom duration-200 text-xs sm:text-sm font-semibold flex items-center gap-3">
          <span className="text-xl">🔔</span>
          <p className="flex-1 leading-snug">{toastMessage}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="flex flex-wrap items-center justify-center sm:justify-start gap-1">
            <span>{t.appName} · {lang === 'ru' ? 'Образовательная платформа по математике' : 'Plataforma Educativa Gamificada de Matemáticas'}</span>
            <span className="opacity-60">·</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {lang === 'ru' ? 'Преподаватель' : 'Docente'}: Liliana Alvarez - Mg Domi1
            </span>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsPromoModalOpen(true)}
              className="hover:underline font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"
            >
              <span>✨</span>
              <span>{lang === 'ru' ? 'Логотип и промо' : 'Logo y Kit Promocional'}</span>
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('logros')} className="hover:underline">
              {t.navAchievements}
            </button>
            <span>·</span>
            <button onClick={() => setIsReminderModalOpen(true)} className="hover:underline">
              {t.reminderTitle}
            </button>
            <span>·</span>
            <button onClick={manualSync} className="hover:underline">
              {t.syncNow}
            </button>
          </div>
        </div>
      </footer>

      {/* Dedicated Native-like Mobile Bottom Navigation Bar */}
      <MobileTabBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        t={t}
        pendingMistakesCount={mistakes.filter(m => !m.solvedAgain).length}
      />
    </div>
  );
}

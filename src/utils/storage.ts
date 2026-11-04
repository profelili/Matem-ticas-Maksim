import { Achievement, LeaderboardEntry, MistakeRecord, Problem, UserProfile, UserStats } from '../types/fractions';

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'frac_current_user_id',
  PROFILES: 'frac_profiles_v1',
  MISTAKES: 'frac_mistakes_v1',
  SYNC_QUEUE: 'frac_offline_sync_queue_v1',
  LAST_SYNC: 'frac_last_sync_timestamp',
  LEADERBOARD: 'frac_cached_leaderboard_v1',
  NOTIFICATION_CONFIG: 'frac_reminder_settings',
  THEME: 'frac_theme_mode',
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    title: 'Primer Acierto',
    description: 'Resuelve tu primera operación con fracciones.',
    icon: '🎯',
    category: 'accuracy',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'streak_5',
    title: 'Racha de Fuego',
    description: 'Consigue 5 respuestas correctas consecutivas.',
    icon: '🔥',
    category: 'streak',
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'streak_15',
    title: 'Mente Imparable',
    description: 'Alcanza una racha de 15 respuestas correctas seguidas.',
    icon: '⚡',
    category: 'streak',
    progress: 0,
    maxProgress: 15,
  },
  {
    id: 'mcm_master',
    title: 'Maestro del MCM',
    description: 'Resuelve 10 sumas o restas con distinto denominador.',
    icon: '📐',
    category: 'accuracy',
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'multiply_ace',
    title: 'As de la Multiplicación',
    description: 'Resuelve 10 multiplicaciones de fracciones con éxito.',
    icon: '✖️',
    category: 'accuracy',
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'division_wizard',
    title: 'Mago de la División',
    description: 'Resuelve 10 divisiones de fracciones sin fallar.',
    icon: '➗',
    category: 'accuracy',
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'speed_demon',
    title: 'Velocista Cronómetro',
    description: 'Obtén más de 500 puntos en el Reto Cronometrado.',
    icon: '⏱️',
    category: 'speed',
    progress: 0,
    maxProgress: 500,
  },
  {
    id: 'mistake_cleared',
    title: 'Superación Continua',
    description: 'Corrige y domina 3 ejercicios de tu Cuaderno de Errores.',
    icon: '📖',
    category: 'review',
    progress: 0,
    maxProgress: 3,
  },
  {
    id: 'level_5',
    title: 'Explorador Fraccionario',
    description: 'Alcanza el Nivel 5 de jugador.',
    icon: '🌟',
    category: 'levels',
    progress: 1,
    maxProgress: 5,
  },
  {
    id: 'level_10',
    title: 'Gran Matemático',
    description: 'Alcanza el Nivel 10 de jugador.',
    icon: '👑',
    category: 'levels',
    progress: 1,
    maxProgress: 10,
  },
];

export const AVATARS = [
  { id: 'astronaut', name: 'Astronauta', emoji: '🧑‍🚀', color: 'from-blue-500 to-indigo-600' },
  { id: 'owl', name: 'Búho Sabio', emoji: '🦉', color: 'from-amber-500 to-orange-600' },
  { id: 'fox', name: 'Zorro Astuto', emoji: '🦊', color: 'from-orange-500 to-red-600' },
  { id: 'robot', name: 'Robot Calculador', emoji: '🤖', color: 'from-cyan-500 to-blue-600' },
  { id: 'cat', name: 'Gato Lógico', emoji: '🐱', color: 'from-purple-500 to-pink-600' },
  { id: 'bear', name: 'Oso Analítico', emoji: '🐻', color: 'from-emerald-500 to-teal-600' },
];

export function createEmptyStats(): UserStats {
  const today = new Date().toISOString().split('T')[0];
  return {
    totalSolved: 0,
    totalCorrect: 0,
    byOperation: {
      '+': { attempted: 0, correct: 0 },
      '-': { attempted: 0, correct: 0 },
      '*': { attempted: 0, correct: 0 },
      '/': { attempted: 0, correct: 0 },
    },
    streak: 0,
    bestStreak: 0,
    highScoreTimeAttack: 0,
    dailyStreakDays: 1,
    lastPlayedDate: today,
    historyScores: [],
  };
}

export function createInitialStats(): UserStats {
  const today = new Date().toISOString().split('T')[0];
  return {
    totalSolved: 12,
    totalCorrect: 10,
    byOperation: {
      '+': { attempted: 4, correct: 4 },
      '-': { attempted: 3, correct: 2 },
      '*': { attempted: 3, correct: 2 },
      '/': { attempted: 2, correct: 2 },
    },
    streak: 2,
    bestStreak: 6,
    highScoreTimeAttack: 240,
    dailyStreakDays: 3,
    lastPlayedDate: today,
    historyScores: [
      { date: '28 Oct', score: 180, accuracy: 75 },
      { date: '29 Oct', score: 240, accuracy: 80 },
      { date: '30 Oct', score: 320, accuracy: 85 },
      { date: '31 Oct', score: 410, accuracy: 90 },
      { date: '01 Nov', score: 390, accuracy: 88 },
      { date: '02 Nov', score: 480, accuracy: 92 },
      { date: 'Hoy', score: 560, accuracy: 95 },
    ],
  };
}

export function createNewStudentProfile(name = 'Maksim Matemático', avatar = 'astronaut'): UserProfile {
  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    avatar,
    level: 1,
    xp: 0,
    stars: 0,
    unlockedLevel: 1,
    stats: createEmptyStats(),
    achievements: [],
    createdAt: Date.now(),
  };
}

export function createDefaultProfile(name = 'Maksim Matemático', avatar = 'astronaut'): UserProfile {
  return createNewStudentProfile(name, avatar);
}

export function resetProfileStats(profileId: string): UserProfile {
  const profiles = loadProfiles();
  const idx = profiles.findIndex(p => p.id === profileId);
  const target = idx !== -1 ? profiles[idx] : getCurrentProfile();

  const resetProfile: UserProfile = {
    ...target,
    level: 1,
    xp: 0,
    stars: 0,
    unlockedLevel: 1,
    stats: createEmptyStats(),
    achievements: [],
  };

  if (idx !== -1) {
    profiles[idx] = resetProfile;
    saveProfiles(profiles);
  }

  clearMistakesForUser(profileId);
  return resetProfile;
}

export function loadProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If initial demo profile was Mateo Matemático or Estudiante, migrate to Maksim Matemático & astronaut
        let modified = false;
        const updatedProfiles = parsed.map(p => {
          if (p.name === 'Mateo Matemático' || p.name === 'Estudiante') {
            modified = true;
            return {
              ...p,
              name: 'Maksim Matemático',
              avatar: 'astronaut',
            };
          }
          return p;
        });
        if (modified) {
          saveProfiles(updatedProfiles);
        }
        return updatedProfiles;
      }
    }
  } catch (err) {
    console.error('Error loading profiles from localStorage', err);
  }

  // Initial demo profile with clean starting stats
  const defaultProfile = createNewStudentProfile('Maksim Matemático', 'astronaut');
  saveProfiles([defaultProfile]);
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, defaultProfile.id);
  return [defaultProfile];
}

export function saveProfiles(profiles: UserProfile[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    enqueueOfflineSync({ type: 'SYNC_PROFILES', data: profiles, timestamp: Date.now() });
  } catch (e) {
    console.error('Failed to save profiles to localStorage', e);
  }
}

export function getCurrentProfile(): UserProfile {
  const profiles = loadProfiles();
  const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  const found = profiles.find(p => p.id === currentId);
  if (found) return found;
  if (profiles.length > 0) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, profiles[0].id);
    return profiles[0];
  }
  const newProfile = createDefaultProfile();
  saveProfiles([newProfile]);
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newProfile.id);
  return newProfile;
}

export function setCurrentProfileId(id: string) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, id);
}

export function updateCurrentProfile(updater: (prev: UserProfile) => UserProfile): UserProfile {
  const profiles = loadProfiles();
  const current = getCurrentProfile();
  const updated = updater(current);

  const idx = profiles.findIndex(p => p.id === current.id);
  if (idx !== -1) {
    profiles[idx] = updated;
  } else {
    profiles.push(updated);
  }

  saveProfiles(profiles);
  return updated;
}

// Mistakes management
export function loadMistakes(userId?: string): MistakeRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    if (raw) {
      const parsed = JSON.parse(raw) as MistakeRecord[];
      if (userId) {
        return parsed.filter(m => m.userId === userId);
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading mistakes', e);
  }

  return [];
}

export function clearMistakesForUser(userId: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    if (raw) {
      const parsed = JSON.parse(raw) as MistakeRecord[];
      const filtered = parsed.filter(m => m.userId !== userId);
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error('Error clearing mistakes for user', e);
  }
}

export function saveMistakes(mistakes: MistakeRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
    enqueueOfflineSync({ type: 'SYNC_MISTAKES', data: mistakes, timestamp: Date.now() });
  } catch (e) {
    console.error('Failed to save mistakes', e);
  }
}

export function addMistake(userId: string, problem: Problem, userAnswer: { num: number; den: number }) {
  const current = loadMistakes();
  const newRecord: MistakeRecord = {
    id: `mistake_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
    userId,
    problem,
    userAnswer,
    solvedAgain: false,
  };
  current.unshift(newRecord);
  saveMistakes(current);
}

export function markMistakeSolved(mistakeId: string) {
  const current = loadMistakes();
  const updated = current.map(m => (m.id === mistakeId ? { ...m, solvedAgain: true } : m));
  saveMistakes(updated);
}

// Offline Queue & Cloud Sync Simulation
interface SyncQueueItem {
  type: string;
  data: unknown;
  timestamp: number;
}

export function enqueueOfflineSync(item: SyncQueueItem) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    queue.push(item);
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
  } catch {
    // LocalStorage fallback
  }
}

export function getOfflineQueueCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    return queue.length;
  } catch {
    return 0;
  }
}

export async function syncWithCloud(): Promise<{ success: boolean; syncedCount: number }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    const count = queue.length;

    // Simulate reliable cloud synchronization endpoint
    await new Promise(resolve => setTimeout(resolve, 800));

    // Clear queue upon successful transmission
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());

    return { success: true, syncedCount: count };
  } catch {
    return { success: false, syncedCount: 0 };
  }
}

export function getLastSyncTime(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    if (!raw) return 'Nunca';
    const date = new Date(parseInt(raw, 10));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'Hoy';
  }
}

// Global community leaderboard data (seeded + current user synced)
export function getLeaderboard(period: 'all' | 'week' | 'today'): LeaderboardEntry[] {
  const current = getCurrentProfile();

  const communityLeaders: LeaderboardEntry[] = [
    { id: 'lead_1', name: 'Lucas "Fracción Dorada"', avatar: 'astronaut', score: 3840, level: 16, streak: 18, accuracy: 96, badge: 'Gran Maestro' },
    { id: 'lead_2', name: 'Valen Pitágoras', avatar: 'fox', score: 3210, level: 14, streak: 14, accuracy: 94, badge: 'As de la Suma' },
    { id: 'lead_3', name: 'Camila MCM', avatar: 'owl', score: 2890, level: 12, streak: 11, accuracy: 92, badge: 'Mago del MCM' },
    { id: 'lead_4', name: 'Santiago Decimal', avatar: 'robot', score: 2450, level: 11, streak: 9, accuracy: 89, badge: 'Estratega' },
    { id: 'lead_5', name: 'Martina Raíz', avatar: 'cat', score: 2180, level: 9, streak: 8, accuracy: 88, badge: 'Calculadora Veloz' },
    { id: 'lead_6', name: 'Joaquín Euler', avatar: 'bear', score: 1890, level: 8, streak: 7, accuracy: 86, badge: 'Aprendiz Avanzado' },
  ];

  const userEntry: LeaderboardEntry = {
    id: current.id,
    name: `${current.name} (Tú)`,
    avatar: current.avatar,
    score: current.xp + current.stats.highScoreTimeAttack * 2,
    level: current.level,
    streak: current.stats.bestStreak,
    accuracy: current.stats.totalSolved > 0 ? Math.round((current.stats.totalCorrect / current.stats.totalSolved) * 100) : 0,
    badge: current.level >= 10 ? 'Gran Maestro' : current.level >= 5 ? 'Experto' : 'Iniciado',
    isCurrentUser: true,
  };

  const list = [...communityLeaders, userEntry];

  // Adjust scores dynamically based on period
  if (period === 'today') {
    return list.map(item => ({
      ...item,
      score: Math.round(item.score * 0.18) + (item.isCurrentUser ? 120 : 80),
    })).sort((a, b) => b.score - a.score);
  }
  if (period === 'week') {
    return list.map(item => ({
      ...item,
      score: Math.round(item.score * 0.55),
    })).sort((a, b) => b.score - a.score);
  }

  return list.sort((a, b) => b.score - a.score);
}

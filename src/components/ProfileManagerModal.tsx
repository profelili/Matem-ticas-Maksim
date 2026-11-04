import React, { useState, useEffect } from 'react';
import { X, UserPlus, Edit2, RotateCcw, Sparkles, Check, UserCheck } from 'lucide-react';
import { UserProfile } from '../types/fractions';
import { AVATARS } from '../utils/storage';
import { sounds } from '../utils/soundEffects';
import { Translations } from '../utils/i18n';

interface ProfileManagerModalProps {
  currentProfile: UserProfile;
  profiles: UserProfile[];
  onSelectProfile: (id: string) => void;
  onCreateProfile: (name: string, avatar: string) => void;
  onUpdateProfile: (name: string, avatar: string) => void;
  onResetStats?: (id: string) => void;
  onClose: () => void;
  t: Translations;
}

export const ProfileManagerModal: React.FC<ProfileManagerModalProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  onCreateProfile,
  onUpdateProfile,
  onResetStats,
  onClose,
  t,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);

  const [editName, setEditName] = useState(currentProfile.name);
  const [editAvatar, setEditAvatar] = useState(currentProfile.avatar);

  useEffect(() => {
    setEditName(currentProfile.name);
    setEditAvatar(currentProfile.avatar);
  }, [currentProfile]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    sounds.playCorrect();
    onCreateProfile(newName.trim(), selectedAvatar);
    setNewName('');
    setIsCreating(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    sounds.playClick();
    onUpdateProfile(editName.trim(), editAvatar);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90dvh] overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.profilesTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.profilesDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Current Profile Form */}
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {t.editProfile}
              </h4>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                {AVATARS.find(a => a.id === editAvatar)?.name || 'Astronauta'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">{t.studentName}</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Nombre del alumno (ej. Maksim)"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={24}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">{t.chooseAvatar}</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {AVATARS.map(av => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setEditAvatar(av.id);
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                      editAvatar === av.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <span className="text-[10px] font-bold mt-1 text-slate-700 dark:text-slate-300 truncate max-w-full">
                      {av.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-300">
              💡 Puedes escribir tu nombre real o de fantasía y seleccionar el avatar deseado para personalizar tu aventura matemática.
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={!editName.trim()}
                className="flex-1 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs"
              >
                {t.save}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                {t.cancel}
              </button>
            </div>
          </form>
        ) : isCreating ? (
          /* Create New Profile Form */
          <form onSubmit={handleCreate} className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {t.newProfile}
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">{t.studentName}</label>
              <input
                type="text"
                placeholder="Ej. Valentina / Валентина"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={24}
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">{t.chooseAvatar}</label>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map(av => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`text-2xl p-2 rounded-xl border transition ${
                      selectedAvatar === av.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-2.5 text-xs text-indigo-800 dark:text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>{t.newProfileZeroStatsNote}</span>
            </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="flex-1 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs"
                >
                  {t.createProfileBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="py-2 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          ) : (
            /* Profile List */
            <div className="space-y-4">
              {/* Active Student Profile Showcase Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-slate-50 dark:via-slate-800/60 to-indigo-500/5 border-2 border-indigo-500/30 dark:border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-indigo-200 dark:border-indigo-900 shrink-0">
                    {AVATARS.find(a => a.id === currentProfile.avatar)?.emoji || '🧑‍🚀'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">
                        {currentProfile.name}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        {t.activeProfile}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {t.levelLabel} {currentProfile.level} · {currentProfile.xp} XP · {AVATARS.find(a => a.id === currentProfile.avatar)?.name || 'Astronauta'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setEditName(currentProfile.name);
                    setEditAvatar(currentProfile.avatar);
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition active:scale-95 shrink-0"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{t.editProfile}</span>
                </button>
              </div>

              {/* Profiles Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 px-1">
                  <span>{t.profilesTitle} ({profiles.length})</span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {profiles.map(p => {
                    const isSelected = p.id === currentProfile.id;
                    const emoji = AVATARS.find(a => a.id === p.avatar)?.emoji || '🧑‍🚀';

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          sounds.playClick();
                          onSelectProfile(p.id);
                        }}
                        className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-600 shadow-xs'
                            : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                            {emoji}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 dark:text-white">
                                {p.name}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                                  {t.activeProfile}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">
                              {t.levelLabel} {p.level} · {p.xp} XP · {p.stars} ★
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {onResetStats && (
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                if (window.confirm(t.resetStatsConfirm)) {
                                  sounds.playClick();
                                  onResetStats(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40 transition"
                              title={t.resetStatsBtn}
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              onSelectProfile(p.id);
                              setEditName(p.name);
                              setEditAvatar(p.avatar);
                              setIsEditing(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title={t.editProfile}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.addNewStudent}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

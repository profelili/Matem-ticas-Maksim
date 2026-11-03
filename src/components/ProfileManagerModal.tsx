import React, { useState } from 'react';
import { X, UserPlus, Edit2 } from 'lucide-react';
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
  onClose: () => void;
  t: Translations;
}

export const ProfileManagerModal: React.FC<ProfileManagerModalProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  onCreateProfile,
  onUpdateProfile,
  onClose,
  t,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);

  const [editName, setEditName] = useState(currentProfile.name);
  const [editAvatar, setEditAvatar] = useState(currentProfile.avatar);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
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
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {t.editProfile}
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">{t.studentName}</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={24}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">{t.chooseAvatar}</label>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map(av => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setEditAvatar(av.id)}
                    className={`text-2xl p-2 rounded-xl border transition ${
                      editAvatar === av.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
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
          <div className="space-y-3">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {profiles.map(p => {
                const isSelected = p.id === currentProfile.id;
                const emoji = AVATARS.find(a => a.id === p.avatar)?.emoji || '🦉';

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

                    {isSelected && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setIsEditing(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                        title={t.editProfile}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
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

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Taro from '@tarojs/taro';
import type {
  TaskItem,
  EmergencyReport,
  PhotoSubmission,
  AppMode,
  AppModeType,
  DoctorInstruction,
  FamilyNote,
  NoteAuthor,
  EmergencyType,
  PhotoResult,
} from '@/types';
import { mockTasks, mockModes, mockEmergencies } from '@/data/tasks';
import { mockPhotoSubmissions } from '@/data/photos';
import { mockDoctorInstructions } from '@/data/appointments';
import { mockFamilyNotes } from '@/data/family';

const storage = {
  getItem: (name: string) => {
    try {
      const value = Taro.getStorageSync(name);
      return value || null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      Taro.setStorageSync(name, value);
    } catch (e) {
      console.error('[Store] setItem error:', e);
    }
  },
  removeItem: (name: string) => {
    try {
      Taro.removeStorageSync(name);
    } catch (e) {
      console.error('[Store] removeItem error:', e);
    }
  },
};

interface AppState {
  tasks: TaskItem[];
  emergencies: EmergencyReport[];
  photoSubmissions: PhotoSubmission[];
  familyNotes: FamilyNote[];
  mode: AppMode;
  doctorInstructions: DoctorInstruction[];

  toggleTask: (id: string) => void;
  addEmergency: (type: EmergencyType, description: string) => void;
  addPhotoSubmission: (submission: Omit<PhotoSubmission, 'id' | 'submittedAt' | 'result' | 'doctorNote'>) => string;
  updatePhotoResult: (id: string, result: PhotoResult, doctorNote: string) => void;
  addFamilyNote: (content: string, author: NoteAuthor, taskId?: string) => void;
  setMode: (type: AppModeType) => void;
  toggleDoctorInstruction: (id: string) => void;
  getCompletedTaskCount: () => number;
  getWeekCompliance: () => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      emergencies: mockEmergencies,
      photoSubmissions: mockPhotoSubmissions as unknown as PhotoSubmission[],
      familyNotes: mockFamilyNotes,
      mode: mockModes[0],
      doctorInstructions: mockDoctorInstructions,

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  completedAt: !t.completed ? new Date().toISOString() : undefined,
                }
              : t
          ),
        })),

      addEmergency: (type, description) => {
        const newReport: EmergencyReport = {
          id: `emg_${Date.now()}`,
          type,
          description,
          reportedAt: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          status: 'pending',
        };
        set((state) => ({
          emergencies: [newReport, ...state.emergencies],
        }));
        console.info('[Store] Emergency added:', newReport.id);
      },

      addPhotoSubmission: (submission) => {
        const id = `ps_${Date.now()}`;
        const newSubmission: PhotoSubmission = {
          id,
          submittedAt: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          angles: submission.angles,
          photos: submission.photos,
          result: 'pending',
          doctorNote: '',
        };
        set((state) => ({
          photoSubmissions: [newSubmission, ...state.photoSubmissions],
        }));
        console.info('[Store] Photo submission added:', id);
        return id;
      },

      updatePhotoResult: (id, result, doctorNote) => {
        set((state) => ({
          photoSubmissions: state.photoSubmissions.map((s) =>
            s.id === id
              ? {
                  ...s,
                  result,
                  doctorNote,
                  doctorRepliedAt: new Date().toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                }
              : s
          ),
        }));
        console.info('[Store] Photo result updated:', id, result);
      },

      addFamilyNote: (content, author, taskId) => {
        const newNote: FamilyNote = {
          id: `note_${Date.now()}`,
          content,
          createdAt: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          author,
          taskId,
        };
        set((state) => ({
          familyNotes: [newNote, ...state.familyNotes],
        }));
        console.info('[Store] Family note added:', newNote.id);
      },

      setMode: (type) => {
        const modeMap = mockModes.find((m) => m.type === type) || mockModes[0];
        set({ mode: modeMap });
      },

      toggleDoctorInstruction: (id) =>
        set((state) => ({
          doctorInstructions: state.doctorInstructions.map((d) =>
            d.id === id ? { ...d, checked: !d.checked } : d
          ),
        })),

      getCompletedTaskCount: () => {
        return get().tasks.filter((t) => t.completed).length;
      },

      getWeekCompliance: () => {
        const completed = get().tasks.filter((t) => t.completed).length;
        const total = get().tasks.length;
        if (total === 0) return 0;
        return Math.round((completed / total) * 100);
      },
    }),
    {
      name: 'chiban-app-storage',
      storage,
      partialize: (state) => ({
        tasks: state.tasks,
        emergencies: state.emergencies,
        photoSubmissions: state.photoSubmissions,
        familyNotes: state.familyNotes,
        mode: state.mode,
        doctorInstructions: state.doctorInstructions,
      }),
    }
  )
);

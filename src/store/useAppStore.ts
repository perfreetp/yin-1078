import { create } from 'zustand';
import type { TaskItem, EmergencyReport, PhotoSubmission, AppMode, DoctorInstruction } from '@/types';

interface AppState {
  tasks: TaskItem[];
  emergencies: EmergencyReport[];
  photoSubmissions: PhotoSubmission[];
  mode: AppMode;
  doctorInstructions: DoctorInstruction[];
  toggleTask: (id: string) => void;
  addEmergency: (report: EmergencyReport) => void;
  addPhotoSubmission: (submission: PhotoSubmission) => void;
  setMode: (mode: AppMode) => void;
  toggleDoctorInstruction: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tasks: [],
  emergencies: [],
  photoSubmissions: [],
  mode: { type: 'normal', label: '日常模式', emoji: '😊' },
  doctorInstructions: [],

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

  addEmergency: (report) =>
    set((state) => ({
      emergencies: [report, ...state.emergencies],
    })),

  addPhotoSubmission: (submission) =>
    set((state) => ({
      photoSubmissions: [submission, ...state.photoSubmissions],
    })),

  setMode: (mode) => set({ mode }),

  toggleDoctorInstruction: (id) =>
    set((state) => ({
      doctorInstructions: state.doctorInstructions.map((d) =>
        d.id === id ? { ...d, checked: !d.checked } : d
      ),
    })),
}));

export type TaskCategory = 'wear' | 'clean' | 'rubber' | 'other';

export interface TaskItem {
  id: string;
  title: string;
  emoji: string;
  time: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  category: TaskCategory;
}

export type EmergencyType = 'bracket' | 'wire' | 'other';
export type EmergencyStatus = 'pending' | 'handled';

export interface EmergencyReport {
  id: string;
  type: EmergencyType;
  description: string;
  reportedAt: string;
  status: EmergencyStatus;
}

export interface PhotoAngle {
  id: string;
  name: string;
  emoji: string;
  instruction: string;
  placeholder: string;
}

export type PhotoResult = 'pending' | 'normal' | 'observe' | 'visit';

export interface PhotoSubmission {
  id: string;
  submittedAt: string;
  angles: string[];
  photos: Record<string, string>;
  result: PhotoResult;
  doctorNote: string;
  doctorRepliedAt?: string;
}

export interface ReminderSlot {
  id: string;
  time: string;
  label: string;
  emoji: string;
  enabled: boolean;
}

export type AppModeType = 'normal' | 'exam' | 'boarding';

export interface AppMode {
  type: AppModeType;
  label: string;
  emoji: string;
}

export type AppointmentType = 'checkup' | 'adjust' | 'phase_change';

export interface AppointmentItem {
  id: string;
  date: string;
  time: string;
  doctor: string;
  hospital: string;
  note: string;
  type: AppointmentType;
}

export interface CalendarEvent {
  date: string;
  type: 'appointment' | 'phase_change' | 'emergency';
  label: string;
}

export interface DoctorInstruction {
  id: string;
  content: string;
  checked: boolean;
  date: string;
}

export interface ComplianceWeek {
  label: string;
  score: number;
  days: number[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type NoteAuthor = 'parent' | 'child';

export interface FamilyNote {
  id: string;
  content: string;
  createdAt: string;
  author: NoteAuthor;
  taskId?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  emoji: string;
  time: string;
  description: string;
  completed: boolean;
  category: 'wear' | 'clean' | 'rubber' | 'other';
}

export interface EmergencyReport {
  id: string;
  type: 'bracket' | 'wire' | 'other';
  description: string;
  reportedAt: string;
  status: 'pending' | 'handled';
}

export interface PhotoAngle {
  id: string;
  name: string;
  emoji: string;
  instruction: string;
  placeholder: string;
}

export interface PhotoSubmission {
  id: string;
  submittedAt: string;
  angles: string[];
  result: 'normal' | 'observe' | 'visit';
  doctorNote: string;
}

export interface ReminderSlot {
  id: string;
  time: string;
  label: string;
  emoji: string;
  enabled: boolean;
}

export interface AppMode {
  type: 'normal' | 'exam' | 'boarding';
  label: string;
  emoji: string;
}

export interface AppointmentItem {
  id: string;
  date: string;
  time: string;
  doctor: string;
  hospital: string;
  note: string;
  type: 'checkup' | 'adjust' | 'phase_change';
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

export interface FamilyNote {
  id: string;
  taskId: string;
  content: string;
  createdAt: string;
  author: 'parent' | 'child';
}

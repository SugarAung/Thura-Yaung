// ─── Domain types ───────────────────────────────────────────────────────────

export type CategorySlug = 'academic' | 'career' | 'mental-wellness' | 'peer-support';

export type AnimalKey =
  | 'owl' | 'fox' | 'bear' | 'deer' | 'rabbit'
  | 'panda' | 'elephant' | 'tiger' | 'cat' | 'dog'
  | 'lion' | 'penguin';

export type Lang = 'en' | 'mm';

// ─── Category ───────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  slug: CategorySlug;
  icon: string;
  emoji: string;
  color: string;        // Tailwind bg class
  accentColor: string;  // Tailwind text class
  borderColor: string;  // Tailwind border class
  name: string;
  description: string;
  mmName: string;
  mmDescription: string;
  professionalCount: number;
}

// ─── Professional ────────────────────────────────────────────────────────────

export interface TimeSlot {
  id: string;
  date: string;   // ISO "2026-06-15"
  time: string;   // "10:00 AM"
  isBooked: boolean;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  categorySlug: CategorySlug;
  bio: string;
  photo: string;  // emoji or URL placeholder
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  languages: ('English' | 'Burmese')[];
  sessionDurationMinutes: number;
  pricePerSession: number;
  certificates: string[];
  availableSlots: TimeSlot[];
  joinedDate: string;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled' | 'pending';

export interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalTitle: string;
  clientAvatar: AnimalKey;
  clientAlias: string;
  date: string;
  time: string;
  status: BookingStatus;
  meetingLink: string;
  categorySlug: CategorySlug;
  notes?: string;
  sessionDurationMinutes: number;
}

export interface BookingFormState {
  selectedCategorySlug: CategorySlug | null;
  selectedProfessionalId: string | null;
  selectedSlotId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  consultationStyle: string | null;
  alias: string;
  avatarKey: AnimalKey;
  notes: string;
}

// ─── Community ───────────────────────────────────────────────────────────────

export interface Thread {
  id: string;
  title: string;
  body: string;
  categorySlug: CategorySlug;
  avatarKey: AnimalKey;
  authorAlias: string;
  upvotes: number;
  commentCount: number;
  postedAt: string;
  tags: string[];
}

// ─── News ────────────────────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readingTimeMin: number;
  coverEmoji: string;
  coverColor: string;
  tags: string[];
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface AdminPendingPro {
  id: string;
  name: string;
  title: string;
  categorySlug: CategorySlug;
  submittedAt: string;
  certificateCount: number;
  status: ApprovalStatus;
  bio: string;
}

export interface AdminPendingThread {
  id: string;
  title: string;
  authorAlias: string;
  categorySlug: CategorySlug;
  submittedAt: string;
  status: ApprovalStatus;
}

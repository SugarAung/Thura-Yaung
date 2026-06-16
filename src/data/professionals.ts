import { Professional } from '@/types';

// Generate slots for the next 14 days
function makeSlots(proId: string, times: string[]): Professional['availableSlots'] {
  const slots: Professional['availableSlots'] = [];
  const base = new Date('2026-06-07');
  for (let d = 0; d < 14; d++) {
    const day = new Date(base);
    day.setDate(base.getDate() + d);
    // Skip Sundays
    if (day.getDay() === 0) continue;
    const dateStr = day.toISOString().split('T')[0];
    times.forEach((time, i) => {
      slots.push({
        id: `${proId}-${d}-${i}`,
        date: dateStr,
        time,
        isBooked: Math.random() < 0.2, // 20% chance already booked
      });
    });
  }
  return slots;
}

export const professionals: Professional[] = [
  // ─── Academic Guidance ───────────────────────────────────────────────────
  {
    id: 'pro-1',
    name: 'Dr. Khin Myo Thida',
    title: 'Educational Psychologist',
    categorySlug: 'academic',
    bio: 'With 12 years of experience supporting students through exam anxiety, university transitions, and learning differences, Dr. Khin Myo Thida brings warmth and evidence-based guidance to every session.',
    photo: '👩‍🏫',
    rating: 4.9,
    reviewCount: 142,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 50,
    pricePerSession: 25000,
    certificates: ['MSc Educational Psychology (Yangon University)', 'Certified Learning Specialist', 'Child & Adolescent Counselling Certificate'],
    availableSlots: makeSlots('pro-1', ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']),
    joinedDate: '2024-01-15',
  },
  {
    id: 'pro-2',
    name: 'U Zaw Lin Htun',
    title: 'Academic Mentor & Study Coach',
    categorySlug: 'academic',
    bio: 'Former lecturer at Mandalay University of Distance Education. Specializes in helping students build effective study habits, manage academic pressure, and prepare for professional entrance exams.',
    photo: '👨‍💼',
    rating: 4.7,
    reviewCount: 89,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 45,
    pricePerSession: 18000,
    certificates: ['MA Education (Mandalay University)', 'TESOL Certificate', 'Mentoring & Coaching Certificate'],
    availableSlots: makeSlots('pro-2', ['10:00 AM', '1:00 PM', '3:00 PM']),
    joinedDate: '2024-03-20',
  },

  // ─── Career Guidance ─────────────────────────────────────────────────────
  {
    id: 'pro-3',
    name: 'Ma Thazin Oo',
    title: 'Career Coach & HR Professional',
    categorySlug: 'career',
    bio: 'Over 8 years in HR and talent development across Myanmar and Singapore. Ma Thazin helps professionals navigate career transitions, build confidence, and find meaning in their work.',
    photo: '👩‍💻',
    rating: 4.8,
    reviewCount: 203,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 50,
    pricePerSession: 30000,
    certificates: ['SHRM-CP Certification', 'ICF Coaching Fundamentals', 'MBA — Singapore Management University'],
    availableSlots: makeSlots('pro-3', ['8:00 AM', '12:00 PM', '5:00 PM', '7:00 PM']),
    joinedDate: '2023-11-10',
  },
  {
    id: 'pro-4',
    name: 'Ko Aung Kyaw Zin',
    title: 'Startup Mentor & Career Strategist',
    categorySlug: 'career',
    bio: 'Entrepreneur and career strategist with experience in tech startups and NGO sectors. Helps young professionals find direction, manage burnout, and take bold career steps.',
    photo: '👨‍🚀',
    rating: 4.6,
    reviewCount: 67,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 45,
    pricePerSession: 22000,
    certificates: ['BBA — Yangon University of Economics', 'Lean Startup Practitioner', 'Design Thinking Facilitator'],
    availableSlots: makeSlots('pro-4', ['9:00 AM', '2:00 PM', '6:00 PM']),
    joinedDate: '2024-06-01',
  },

  // ─── Mental Wellness ──────────────────────────────────────────────────────
  {
    id: 'pro-5',
    name: 'Daw Nwe Nwe Aye',
    title: 'Counselling Psychologist',
    categorySlug: 'mental-wellness',
    bio: 'Licensed counselling psychologist with a gentle, trauma-informed approach. Daw Nwe Nwe Aye specializes in anxiety, depression, grief, and life adjustment challenges for young adults and families.',
    photo: '👩‍⚕️',
    rating: 5.0,
    reviewCount: 318,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 50,
    pricePerSession: 35000,
    certificates: ['MSc Clinical Psychology (Yangon University)', 'Trauma-Informed Care Certification', 'CBT Practitioner Certificate'],
    availableSlots: makeSlots('pro-5', ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM']),
    joinedDate: '2023-08-01',
  },
  {
    id: 'pro-6',
    name: 'U Kyaw Swar',
    title: 'Mindfulness Coach & Life Guide',
    categorySlug: 'mental-wellness',
    bio: 'Mindfulness teacher and certified wellness coach. Draws on Buddhist mindfulness traditions and modern psychology to help clients find calm, clarity, and inner balance.',
    photo: '🧘‍♂️',
    rating: 4.8,
    reviewCount: 156,
    isVerified: true,
    languages: ['Burmese'],
    sessionDurationMinutes: 45,
    pricePerSession: 20000,
    certificates: ['Mindfulness-Based Stress Reduction (MBSR)', 'Positive Psychology Practitioner', 'International Coaching Federation Member'],
    availableSlots: makeSlots('pro-6', ['7:00 AM', '9:00 AM', '4:00 PM', '6:00 PM']),
    joinedDate: '2024-02-14',
  },

  // ─── Peer Support ─────────────────────────────────────────────────────────
  {
    id: 'pro-7',
    name: 'Ma Wai Phyo Thu',
    title: 'Peer Support Specialist',
    categorySlug: 'peer-support',
    bio: 'Drawing from her own experience with burnout and anxiety, Ma Wai Phyo Thu offers non-judgmental peer support for those who feel unheard. Her sessions are warm, informal, and deeply human.',
    photo: '🌸',
    rating: 4.9,
    reviewCount: 94,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 45,
    pricePerSession: 12000,
    certificates: ['Peer Support Specialist Training (WHO Model)', 'Mental Health First Aid Certificate'],
    availableSlots: makeSlots('pro-7', ['11:00 AM', '2:00 PM', '7:00 PM']),
    joinedDate: '2024-05-01',
  },
  {
    id: 'pro-8',
    name: 'Ko Min Thura',
    title: 'Youth Peer Mentor',
    categorySlug: 'peer-support',
    bio: 'Youth mentor who has navigated family pressure, career uncertainty, and social anxiety. Speaks candidly about real struggles and helps others feel less alone in their experiences.',
    photo: '🤗',
    rating: 4.7,
    reviewCount: 52,
    isVerified: true,
    languages: ['English', 'Burmese'],
    sessionDurationMinutes: 30,
    pricePerSession: 8000,
    certificates: ['Youth Mentoring Certificate', 'Active Listening & Communication Skills'],
    availableSlots: makeSlots('pro-8', ['10:00 AM', '1:00 PM', '4:00 PM', '8:00 PM']),
    joinedDate: '2024-07-15',
  },
];

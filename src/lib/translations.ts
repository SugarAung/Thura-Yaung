import { Lang } from '@/types';

export type TranslationKey =
  | 'nav_home' | 'nav_categories' | 'nav_community' | 'nav_news'
  | 'nav_safety' | 'nav_book_now' | 'nav_client_dashboard'
  | 'nav_pro_dashboard' | 'nav_admin' | 'nav_join_pro'
  | 'hero_headline' | 'hero_sub' | 'hero_cta_book' | 'hero_cta_join'
  | 'how_title' | 'how_step1_title' | 'how_step1_desc'
  | 'how_step2_title' | 'how_step2_desc'
  | 'how_step3_title' | 'how_step3_desc'
  | 'cat_title' | 'cat_academic' | 'cat_career'
  | 'cat_mental' | 'cat_peer'
  | 'privacy_title' | 'privacy_anon' | 'privacy_no_record' | 'privacy_verified'
  | 'featured_title' | 'cta_title' | 'cta_sub' | 'cta_btn'
  | 'book_title' | 'book_step1' | 'book_step2' | 'book_step3' | 'book_step4' | 'book_step5'
  | 'book_next' | 'book_back' | 'book_confirm' | 'book_success'
  | 'book_style_advice' | 'book_style_listen' | 'book_style_guide' | 'book_style_unsure'
  | 'dash_client_title' | 'dash_pro_title' | 'admin_title'
  | 'community_title' | 'news_title' | 'safety_title'
  | 'verified' | 'pending_approval' | 'join_meeting' | 'completed' | 'cancelled' | 'upcoming'
  | 'approve' | 'reject' | 'accept' | 'decline' | 'submit' | 'cancel'
  | 'footer_tagline' | 'footer_platform' | 'footer_resources' | 'footer_legal'
  | 'anonymous_note';

type TranslationMap = Record<TranslationKey, string>;

export const translations: Record<Lang, TranslationMap> = {
  en: {
    nav_home:             'Home',
    nav_categories:       'Categories',
    nav_community:        'Community',
    nav_news:             'News',
    nav_safety:           'Safety',
    nav_book_now:         'Book Now',
    nav_client_dashboard: 'Client Dashboard',
    nav_pro_dashboard:    'Professional Dashboard',
    nav_admin:            'Admin Panel',
    nav_join_pro:         'Join as Professional',

    hero_headline: 'Talk to Someone Who Understands',
    hero_sub:      'Anonymous, safe consultations with verified professionals — in English and Burmese.',
    hero_cta_book: 'Book a Consultation',
    hero_cta_join: 'Join as Professional',

    how_title:       'How It Works',
    how_step1_title: 'Stay Anonymous',
    how_step1_desc:  'Choose an animal avatar and alias. Your real identity is never shared.',
    how_step2_title: 'Choose Your Guide',
    how_step2_desc:  'Browse verified professionals by category and book a time that works for you.',
    how_step3_title: 'Connect Safely',
    how_step3_desc:  'Join via a private video link. Sessions are never recorded.',

    cat_title:    'Consultation Categories',
    cat_academic: 'Academic Guidance',
    cat_career:   'Career Guidance',
    cat_mental:   'Mental Wellness',
    cat_peer:     'Peer Support',

    privacy_title:     'Your Privacy Comes First',
    privacy_anon:      'No real name required',
    privacy_no_record: 'Sessions are never recorded',
    privacy_verified:  'All professionals are verified',

    featured_title: 'Meet Our Professionals',

    cta_title: 'Ready to Talk?',
    cta_sub:   'Take the first step. It is okay to ask for help.',
    cta_btn:   'Start a Consultation',

    book_title:   'Book a Consultation',
    book_step1:   'Choose Category',
    book_step2:   'Choose Professional',
    book_step3:   'Pick Date & Time',
    book_step4:   'Your Anonymous Identity',
    book_step5:   'Confirmation',
    book_next:    'Next',
    book_back:    'Back',
    book_confirm: 'Confirm Booking',
    book_success: 'Request Submitted! Waiting for professional confirmation.',

    book_style_advice:  'I want advice',
    book_style_listen:  'I want someone to listen',
    book_style_guide:   'I want step-by-step guidance',
    book_style_unsure:  'I am not sure yet',

    dash_client_title: 'My Dashboard',
    dash_pro_title:    'Professional Dashboard',
    admin_title:       'Admin Dashboard',
    community_title:   'Community',
    news_title:        'News & Insights',
    safety_title:      'Safety & Privacy',

    verified:         'Verified',
    pending_approval: 'Pending Approval',
    join_meeting:     'Join Meeting',
    completed:        'Completed',
    cancelled:        'Cancelled',
    upcoming:         'Upcoming',
    approve:          'Approve',
    reject:           'Reject',
    accept:           'Accept',
    decline:          'Decline',
    submit:           'Submit',
    cancel:           'Cancel',

    footer_tagline:  'Safe, anonymous consultations for everyone.',
    footer_platform: 'Platform',
    footer_resources:'Resources',
    footer_legal:    'Legal',

    anonymous_note: 'You are browsing anonymously. Your real identity is protected.',
  },

  mm: {
    nav_home:             'ပင်မ',
    nav_categories:       'အမျိုးအစားများ',
    nav_community:        'အသိုင်းအဝိုင်း',
    nav_news:             'သတင်းများ',
    nav_safety:           'ဘေးကင်းရေး',
    nav_book_now:         'ယခုဗွဲချိန်းပါ',
    nav_client_dashboard: 'မိမိ Dashboard',
    nav_pro_dashboard:    'ကျွမ်းကျင်သူ Dashboard',
    nav_admin:            'စီမံခန့်ခွဲမှု',
    nav_join_pro:         'ကျွမ်းကျင်သူအဖြစ် ဝင်ရောက်ပါ',

    hero_headline: 'နားလည်သောသူနှင့် ပြောဆိုပါ',
    hero_sub:      'အတည်ပြုထားသော ကျွမ်းကျင်သူများနှင့် မည်သည့်အမည်မဖော်ပဲ ဘေးကင်းစွာ တိုင်ပင်ဆွေးနွေးနိုင်သည်။',
    hero_cta_book: 'တိုင်ပင်ဆွေးနွေးချိန်းဆိုပါ',
    hero_cta_join: 'ကျွမ်းကျင်သူအဖြစ် ဝင်ရောက်ပါ',

    how_title:       'မည်သို့အလုပ်လုပ်သနည်း',
    how_step1_title: 'မည်သည့်အမည်မဖော်ပဲ နေနိုင်သည်',
    how_step1_desc:  'တိရိစ္ဆာန် avatar နှင့် ကြိုက်နှစ်သက်သောအမည် ရွေးချယ်ပါ။ သင်၏ အစစ်အမှန်ဆိုင်ရာ ရွေချယ်မှုကို မည်သူကိုမျှ မျှဝေမည်မဟုတ်ပါ။',
    how_step2_title: 'သင်၏ လမ်းညွှန်ကို ရွေးချယ်ပါ',
    how_step2_desc:  'အတည်ပြုထားသော ကျွမ်းကျင်သူများကို အမျိုးအစားအလိုက် ကြည့်ရှုပြီး အဆင်ပြေသည့် အချိန်ကို ချိန်းဆိုပါ။',
    how_step3_title: 'ဘေးကင်းစွာ ချိတ်ဆက်ပါ',
    how_step3_desc:  'သီးသန့် video link မှတဆင့် ဆက်သွယ်ပါ။ Session များကို ဘယ်တော့မှ မှတ်တမ်းတင်မည်မဟုတ်ပါ။',

    cat_title:    'တိုင်ပင်ဆွေးနွေးမှု အမျိုးအစားများ',
    cat_academic: 'ပညာရေး လမ်းညွှန်မှု',
    cat_career:   'အသက်မွေးဝမ်းကျောင်း လမ်းညွှန်မှု',
    cat_mental:   'စိတ်ကျန်းမာရေး',
    cat_peer:     'မိတ်ဆွေ ပံ့ပိုးမှု',

    privacy_title:     'သင်၏ ကိုယ်ရေးကိုယ်တာ အသာစီးဆောင်သည်',
    privacy_anon:      'အစစ်အမှန်အမည် မလိုအပ်',
    privacy_no_record: 'Session များ မှတ်တမ်းတင်မည်မဟုတ်',
    privacy_verified:  'ကျွမ်းကျင်သူ အားလုံး အတည်ပြုထား',

    featured_title: 'ကျွမ်းကျင်သူများနှင့် တွေ့ဆုံပါ',

    cta_title: 'ပြောဆိုရန် အသင့်ဖြစ်ပြီလား?',
    cta_sub:   'ပထမဆုံးခြေလှမ်း ကူးပါ။ အကူအညီတောင်းဆိုရန် အဆင်ပြေပါသည်။',
    cta_btn:   'တိုင်ပင်ဆွေးနွေးမှု စတင်ပါ',

    book_title:   'တိုင်ပင်ဆွေးနွေးချိန်းဆိုပါ',
    book_step1:   'အမျိုးအစား ရွေးချယ်ပါ',
    book_step2:   'ကျွမ်းကျင်သူ ရွေးချယ်ပါ',
    book_step3:   'ရက်စွဲနှင့် အချိန် ရွေးချယ်ပါ',
    book_step4:   'သင်၏익မည်မဖော်ပဲ ရွေးချယ်ပါ',
    book_step5:   'အတည်ပြုချက်',
    book_next:    'ဆက်လက်',
    book_back:    'နောက်သို့',
    book_confirm: 'ချိန်းဆိုမှု အတည်ပြုပါ',
    book_success: 'တောင်းဆိုမှု ပေးပို့ပြီးပါပြီ! ကျွမ်းကျင်သူ၏ အတည်ပြုချက်ကို စောင့်ဆိုင်းနေသည်။',

    book_style_advice:  'အကြံဉာဏ် ရလိုသည်',
    book_style_listen:  'နားထောင်ပေးသူ လိုချင်သည်',
    book_style_guide:   'အဆင့်ဆင့် လမ်းညွှန်မှု လိုချင်သည်',
    book_style_unsure:  'မသေချာသေး',

    dash_client_title: 'မိမိ Dashboard',
    dash_pro_title:    'ကျွမ်းကျင်သူ Dashboard',
    admin_title:       'စီမံခန့်ခွဲမှု Dashboard',
    community_title:   'အသိုင်းအဝိုင်း',
    news_title:        'သတင်းနှင့် အမြင်များ',
    safety_title:      'ဘေးကင်းရေးနှင့် ကိုယ်ရေးကိုယ်တာ',

    verified:         'အတည်ပြုထား',
    pending_approval: 'အတည်ပြုမှု ဆိုင်းငံ့ဆဲ',
    join_meeting:     'Meeting ဝင်ပါ',
    completed:        'ပြီးဆုံးပြီ',
    cancelled:        'ပယ်ဖျက်ပြီ',
    upcoming:         'လာမည်',
    approve:          'အတည်ပြုပါ',
    reject:           'ငြင်းပယ်ပါ',
    accept:           'လက်ခံပါ',
    decline:          'ငြင်းဆိုပါ',
    submit:           'တင်သွင်းပါ',
    cancel:           'ပယ်ဖျက်ပါ',

    footer_tagline:  'လူတိုင်းအတွက် ဘေးကင်း익မည်မဖော်ပဲ တိုင်ပင်ဆွေးနွေးမှုများ',
    footer_platform: 'Platform',
    footer_resources:'အရင်းအမြစ်များ',
    footer_legal:    'ဥပဒေဆိုင်ရာ',

    anonymous_note: 'သင်익မည်မဖော်ပဲ လှည့်ကြည့်နေသည်။ သင်၏ အစစ်အမှန်ဆိုင်ရာ မှတ်တမ်းကို ကာကွယ်ထားသည်။',
  },
};

export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
  avatarColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

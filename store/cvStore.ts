import { create } from 'zustand';

// Define CV Data Type
interface CVState {
  personalDetails: {
    jobTitle: string;
    profileImage: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    address?: string;
    zipCode?: string;
    idNumber?: string;
    dob?: string;
    nationality?: string;
    driverLisence?: string;
  };
  links: { label: string; url: string }[];
  summary: string;
  experience: { jobTitle: string; company: string; startDate: string; endDate: string }[];
  education: { degree: string; institution: string; year: string }[];
  skills: string[];
  references: { name: string; position: string; company: string }[];
  selectedIndustry: string;
  selectedTemplate: string;

  updatePersonalDetails: (key: string, value: string) => void;
  updateSummary: (text: string) => void;
  addExperience: () => void;
  updateExperience: (index: number, key: string, value: string) => void;
  addEducation: () => void;
  updateEducation: (index: number, key: string, value: string) => void;
  addSkill: (skill: string) => void;
  addLinks: (link: { label: string; url: string }) => void;
  removeSkill: (skill: string) => void;
  addReference: () => void;
  updateReference: (index: number, key: string, value: string) => void;
  updateIndustry: (industry: string) => void;
  updateTemplate: (template: string) => void;
}

// Zustand store
export const useCVStore = create<CVState>((set) => ({
  personalDetails: {
    jobTitle: '',
    profileImage: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    address: '',
    zipCode: '',
    idNumber: '',
    dob: '',
    nationality: '',
    driverLisence: '',
  },
  links: [],
  summary: '',
  experience: [],
  education: [],
  skills: [],
  references: [],
  selectedIndustry: 'Accountant',
  selectedTemplate: 'template1',

  updatePersonalDetails: (key, value) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, [key]: value },
    })),

  updateSummary: (text) => set(() => ({ summary: text })),

  addExperience: () =>
    set((state) => ({
      experience: [...state.experience, { jobTitle: '', company: '', startDate: '', endDate: '' }],
    })),

  updateExperience: (index, key, value) =>
    set((state) => {
      const updated = [...state.experience];
      updated[index] = { ...updated[index], [key as keyof (typeof updated)[number]]: value };
      return { experience: updated };
    }),

  addEducation: () =>
    set((state) => ({
      education: [...state.education, { degree: '', institution: '', year: '' }],
    })),

  updateEducation: (index, key, value) =>
    set((state) => {
      const updated = [...state.education];
      updated[index] = { ...updated[index], [key as keyof (typeof updated)[number]]: value };
      return { education: updated };
    }),

  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, skill],
    })),

  addLinks: (link) =>
    set((state) => ({
      links: [...state.links, link],
    })),

  removeSkill: (skill) =>
    set((state) => ({
      skills: state.skills.filter((s) => s !== skill),
    })),

  addReference: () =>
    set((state) => ({
      references: [...state.references, { name: '', position: '', company: '' }],
    })),

  updateReference: (index, key, value) =>
    set((state) => {
      const updated = [...state.references];
      updated[index] = { ...updated[index], [key as keyof (typeof updated)[number]]: value };
      return { references: updated };
    }),
  updateTemplate: (template) => set(() => ({ selectedTemplate: template })),
  updateIndustry: (industry) => set(() => ({ selectedIndustry: industry })),
}));

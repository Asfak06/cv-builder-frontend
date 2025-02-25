import axiosInstance from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { create } from 'zustand';
// Define CV Data Type
interface CV {
  _id: string;
  userId: string;
  templateId: string;
  selectedIndustry: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
  summary: string;
  experience: { jobTitle: string; company: string; startDate: string; endDate: string }[];
  education: { degree: string; institution: string; year: string }[];
  skills: string[];
  references: { name: string; position: string; company: string }[];
  updatedAt: string;
}

// Define Personal Details Type
interface PersonalDetails {
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
}

// Define CV Data Type
interface CVState {
  currentCV: CV | null;
  personalDetails: PersonalDetails;
  links: { label: string; url: string }[];
  languages: string[];
  hobbies: string[];
  summary: string;
  experience: { jobTitle: string; company: string; startDate: string; endDate: string }[];
  education: { degree: string; institution: string; year: string }[];
  skills: string[];
  references: { name: string; position: string; company: string }[];
  activeAdditionalSections: string[];
  selectedIndustry: string;
  selectedTemplate: string;
  customSections: { sectionTitle: string; items: { title: string; description: string }[] }[];
  userCVs: CV[];

  loadCVData: (cvId: string, userId: string) => Promise<void>;
  updatePersonalDetails: (key: string, value: string) => void;
  updateProfileImage: (imageUrl: string) => void;
  updateSummary: (text: string) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateExperience: (index: number, key: string, value: string) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateEducation: (index: number, key: string, value: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addLink: (link: { label: string; url: string }) => void;
  removeLink: (index: number) => void;
  updateLink: (index: number, key: string, value: string) => void;
  addLanguage: (language: string) => void;
  removeLanguage: (language: string) => void;
  addHobby: (hobby: string) => void;
  removeHobby: (hobby: string) => void;
  addReference: () => void;
  removeReference: (index: number) => void;
  updateReference: (index: number, key: string, value: string) => void;
  toggleAdditionalSection: (section: string) => void;
  updateIndustry: (industry: string) => void;
  updateTemplate: (template: string) => void;
  addCustomSection: () => void;
  removeCustomSection: (index: number) => void;
  updateCustomSectionTitle: (index: number, title: string) => void;
  addCustomItem: (sectionIndex: number) => void;
  updateCustomItem: (sectionIndex: number, itemIndex: number, key: string, value: string) => void;
  removeCustomItem: (sectionIndex: number, itemIndex: number) => void;
  fetchUserCVs: (userId: string) => Promise<void>;
  saveCVData: (userId: string, autoSave?: boolean) => Promise<void>;
  resetCV: () => void;
}

// Zustand store
export const useCVStore = create<CVState>((set, get) => ({
  currentCV: null,
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
  languages: [],
  hobbies: [],
  summary: '',
  experience: [],
  education: [],
  skills: [],
  references: [],
  activeAdditionalSections: [],
  selectedIndustry: 'Software Engineer',
  selectedTemplate: 'template-1',
  customSections: [],
  userCVs: [],

  // Load CV Data & Populate Form
  loadCVData: async (cvId, userId) => {
    try {
      const response = await axiosInstance.get(`/api/cv/${cvId}?userId=${userId}`);
      const cvData = response.data;
      set({
        currentCV: cvData,
        personalDetails: cvData.personalDetails || {}, // Auto-fill personal details
        summary: cvData.summary || '',
        experience: cvData.experience || [],
        education: cvData.education || [],
        skills: cvData.skills || [],
        links: cvData.links || [],
        references: cvData.references || [],
      });
    } catch (error) {
      console.error('Error fetching CV data:', error);
    }
  },

  updatePersonalDetails: (key, value) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, [key]: value },
    })),
  updateProfileImage: (imageUrl: string) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, profileImage: imageUrl },
    })),
  updateSummary: (text) => set(() => ({ summary: text })),

  addExperience: () =>
    set((state) => ({
      experience: [...state.experience, { jobTitle: '', company: '', startDate: '', endDate: '' }],
    })),

  removeExperience: (index: number) =>
    set((state) => ({
      experience: state.experience.filter((_, i) => i !== index),
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

  removeEducation: (index: number) =>
    set((state) => ({
      education: state.education.filter((_, i) => i !== index),
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
  removeSkill: (skill) =>
    set((state) => ({
      skills: state.skills.filter((s) => s !== skill),
    })),

  addLink: (link) =>
    set((state) => ({
      links: [...state.links, link],
    })),

  removeLink: (index) =>
    set((state) => ({
      links: state.links.filter((_, i) => i !== index),
    })),

  updateLink: (index, key, value) =>
    set((state) => {
      const updatedLinks = [...state.links];
      updatedLinks[index][key as keyof (typeof updatedLinks)[number]] = value;
      return { links: updatedLinks };
    }),

  addLanguage: (language) =>
    set((state) => ({
      languages: [...state.languages, language],
    })),

  removeLanguage: (language) =>
    set((state) => ({
      languages: state.languages.filter((lang) => lang !== language),
    })),

  addHobby: (hobby) =>
    set((state) => ({
      hobbies: [...state.hobbies, hobby],
    })),

  removeHobby: (hobby) =>
    set((state) => ({
      hobbies: state.hobbies.filter((h) => h !== hobby),
    })),
  addReference: () =>
    set((state) => ({
      references: [...state.references, { name: '', position: '', company: '' }],
    })),
  removeReference: (index: number) =>
    set((state) => ({
      references: state.references.filter((_, i) => i !== index),
    })),
  updateReference: (index, key, value) =>
    set((state) => {
      const updated = [...state.references];
      updated[index] = { ...updated[index], [key as keyof (typeof updated)[number]]: value };
      return { references: updated };
    }),
  toggleAdditionalSection: (section) =>
    set((state) => ({
      activeAdditionalSections: state.activeAdditionalSections.includes(section)
        ? state.activeAdditionalSections.filter((s) => s !== section) // Remove section
        : [...state.activeAdditionalSections, section], // Add section
    })),
  updateTemplate: (template) => set(() => ({ selectedTemplate: template })),
  updateIndustry: (industry) => set(() => ({ selectedIndustry: industry })),

  addCustomSection: () =>
    set((state) => ({
      customSections: [...state.customSections, { sectionTitle: '', items: [] }],
    })),

  removeCustomSection: (index: number) =>
    set((state) => ({
      customSections: state.customSections.filter((_, i) => i !== index),
    })),

  updateCustomSectionTitle: (index: number, title: string) =>
    set((state) => {
      const updated = [...state.customSections];
      updated[index].sectionTitle = title;
      return { customSections: updated };
    }),

  addCustomItem: (sectionIndex: number) =>
    set((state) => {
      const updated = [...state.customSections];
      updated[sectionIndex].items.push({ title: '', description: '' });
      return { customSections: updated };
    }),

  updateCustomItem: (sectionIndex: number, itemIndex: number, key: string, value: string) =>
    set((state) => {
      const updated = [...state.customSections];
      updated[sectionIndex].items[itemIndex][
        key as keyof (typeof updated)[number]['items'][number]
      ] = value;
      return { customSections: updated };
    }),

  removeCustomItem: (sectionIndex: number, itemIndex: number) =>
    set((state) => {
      const updated = [...state.customSections];
      updated[sectionIndex].items = updated[sectionIndex].items.filter((_, i) => i !== itemIndex);
      return { customSections: updated };
    }),

  // Fetch CVs from API
  fetchUserCVs: async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/cv/user/${userId}`);
      set({ userCVs: response.data });
    } catch (error) {
      console.error('Error fetching CVs:', error);
    }
  },
  saveCVData: async (userId: string, autoSave: boolean) => {
    const {
      currentCV,
      selectedTemplate,
      selectedIndustry,
      personalDetails,
      summary,
      experience,
      education,
      skills,
      references,
      links,
      languages,
      hobbies,
      customSections,
    } = get();

    try {
      let response;
      if (currentCV?._id) {
        // ✅ Update Existing CV
        response = await axiosInstance.post(`/api/cv`, {
          cvId: currentCV?._id,
          userId,
          templateId: selectedTemplate,
          selectedIndustry: selectedIndustry,
          personalDetails,
          summary,
          experience,
          education,
          skills,
          references,
          links,
          languages,
          hobbies,
          customSections,
        });
        !autoSave && toast.success('CV updated successfully!'); // 🟢 Success toast
      } else {
        // ✅ Create New CV
        response = await axiosInstance.post('/api/cv', {
          userId,
          templateId: selectedTemplate,
          selectedIndustry: selectedIndustry,
          personalDetails,
          summary,
          experience,
          education,
          skills,
          references,
          customSections,
        });
        toast.success('CV created successfully!'); // 🟢 Success toast
      }

      set({ currentCV: response.data.cv });
    } catch (error) {
      console.error('Error saving CV:', error);
      toast.error('Failed to save CV. Please try again.'); // 🔴 Error toast
    }
  },
  resetCV: () =>
    set({
      currentCV: null, // Reset CV state
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
      summary: '',
      experience: [],
      education: [],
      skills: [],
      references: [],
    }),
}));

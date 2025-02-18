import axiosInstance from '@/lib/axiosInstance';
import toast from 'react-hot-toast';
import { create } from 'zustand';
// Define CV Data Type
interface CV {
  _id: string;
  userId: string;
  templateId: string;
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
  summary: string;
  experience: { jobTitle: string; company: string; startDate: string; endDate: string }[];
  education: { degree: string; institution: string; year: string }[];
  skills: string[];
  references: { name: string; position: string; company: string }[];
  selectedIndustry: string;
  selectedTemplate: string;
  userCVs: CV[];

  loadCVData: (cvId: string, userId: string) => Promise<void>;
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
  fetchUserCVs: (userId: string) => Promise<void>;
  saveCVData: (userId: string) => void;
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
  summary: '',
  experience: [],
  education: [],
  skills: [],
  references: [],
  selectedIndustry: 'Software Engineer',
  selectedTemplate: 'template1',
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
  // Fetch CVs from API
  fetchUserCVs: async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/cv/user/${userId}`);
      set({ userCVs: response.data });
    } catch (error) {
      console.error('Error fetching CVs:', error);
    }
  },
  saveCVData: async (userId: string) => {
    const {
      currentCV,
      selectedTemplate,
      personalDetails,
      summary,
      experience,
      education,
      skills,
      references,
    } = get();

    try {
      let response;
      if (currentCV?._id) {
        // ✅ Update Existing CV
        response = await axiosInstance.post(`/api/cv`, {
          cvId: currentCV?._id,
          userId,
          templateId: selectedTemplate,
          personalDetails,
          summary,
          experience,
          education,
          skills,
          references,
        });
        toast.success('CV updated successfully!'); // 🟢 Success toast
      } else {
        // ✅ Create New CV
        response = await axiosInstance.post('/api/cv', {
          userId,
          templateId: selectedTemplate,
          personalDetails,
          summary,
          experience,
          education,
          skills,
          references,
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

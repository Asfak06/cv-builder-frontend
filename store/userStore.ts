import { create } from 'zustand';

// Define User State Type
interface UserState {
  userData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    country: string;
    jobTitle: string;
  };
  fetchUserData: () => void; // Function to fetch user data
}

// Create Zustand Store
export const useUserStore = create<UserState>((set) => ({
  userData: {
    id: '12345678-abcd-efgh-ijkl-901234567890',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+123456789',
    city: 'New York',
    country: 'USA',
    jobTitle: 'Software Engineer',
  },

  fetchUserData: async () => {
    try {
      // Simulating API Call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              id: '12345678-abcd-efgh-ijkl-901234567890',
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane.smith@example.com',
              phoneNumber: '+987654321',
              city: 'San Francisco',
              country: 'USA',
              jobTitle: 'Product Designer',
            }),
          1000
        )
      );

      set({ userData: response as UserState['userData'] });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
}));

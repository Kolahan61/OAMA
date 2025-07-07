import axios from 'axios';

// Create an Axios instance pre-configured for the Mindbody API
const mindbodyAPI = axios.create({
  baseURL: 'https://api.mindbodyonline.com/public/v6',
  headers: {
    'Content-Type': 'application/json',
    'Api-Key': process.env.MINDBODY_API_KEY || '',
  },
});

// Add response interceptor for error handling
mindbodyAPI.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Mindbody API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(error.response.data.Message || 'An error occurred with the Mindbody API');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from Mindbody API');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request to Mindbody API');
    }
  }
);

// Type definitions for class data
export interface Class {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  instructor: string;
  description?: string;
  capacity?: number;
  enrolled?: number;
  isAvailable?: boolean;
  waitlistCount?: number;
}

// Type for class registration response
export interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  error?: string;
}

// Mock data for development
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Beginner BJJ Fundamentals',
    startTime: '2024-01-15T09:00:00',
    endTime: '2024-01-15T10:30:00',
    instructor: 'Professor Carlos Silva',
    description: 'Perfect for beginners. Learn the basic positions, escapes, and submissions.',
    capacity: 20,
    enrolled: 15,
    isAvailable: true,
    waitlistCount: 0,
  },
  {
    id: '2',
    name: 'Advanced No-Gi',
    startTime: '2024-01-15T18:00:00',
    endTime: '2024-01-15T19:30:00',
    instructor: 'Coach Mike Johnson',
    description: 'High-level no-gi techniques and competition preparation.',
    capacity: 15,
    enrolled: 12,
    isAvailable: true,
    waitlistCount: 0,
  },
  {
    id: '3',
    name: 'Kids BJJ (Ages 7-12)',
    startTime: '2024-01-15T16:00:00',
    endTime: '2024-01-15T17:00:00',
    instructor: 'Coach Sarah Lee',
    description: 'Fun and safe BJJ training for kids.',
    capacity: 25,
    enrolled: 18,
    isAvailable: true,
    waitlistCount: 0,
  },
  {
    id: '4',
    name: 'Open Mat',
    startTime: '2024-01-16T12:00:00',
    endTime: '2024-01-16T14:00:00',
    instructor: 'Various',
    description: 'Free rolling and drilling time for all levels.',
    capacity: 30,
    enrolled: 20,
    isAvailable: true,
    waitlistCount: 0,
  },
];

// Function to fetch classes
export async function getClasses(): Promise<Class[]> {
  if (process.env.NODE_ENV === 'development' && !process.env.MINDBODY_API_KEY) {
    // Return mock data in development if no API key is set
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return mockClasses;
  }

  try {
    const response = await mindbodyAPI.get('/classes');
    return response.data.Classes.map((cls: any) => ({
      id: cls.Id,
      name: cls.Name,
      startTime: cls.StartDateTime,
      endTime: cls.EndDateTime,
      instructor: cls.Staff?.Name || 'TBD',
      description: cls.Description,
      capacity: cls.MaxCapacity,
      enrolled: cls.TotalBooked,
      isAvailable: cls.IsAvailable,
      waitlistCount: cls.WebWaitlistCount,
    }));
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
}

// Function to register for a class
export async function registerForClass(
  classId: string,
  clientId: string
): Promise<RegistrationResponse> {
  if (process.env.NODE_ENV === 'development' && !process.env.MINDBODY_API_KEY) {
    // Simulate registration in development
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Successfully registered for class (Development Mode)',
      registrationId: `mock-reg-${Date.now()}`,
    };
  }

  try {
    const response = await mindbodyAPI.post('/class/addclient', {
      ClientId: clientId,
      ClassId: classId,
    });

    return {
      success: true,
      message: 'Successfully registered for class',
      registrationId: response.data.ClassRegistrationId,
    };
  } catch (error) {
    console.error('Error registering for class:', error);
    throw error;
  }
}

// Function to check class availability
export async function checkClassAvailability(classId: string): Promise<{
  isAvailable: boolean;
  spotsLeft: number;
  waitlistCount: number;
}> {
  if (process.env.NODE_ENV === 'development' && !process.env.MINDBODY_API_KEY) {
    // Return mock availability in development
    const mockClass = mockClasses.find(c => c.id === classId);
    if (!mockClass) {
      throw new Error('Class not found');
    }
    return {
      isAvailable: mockClass.isAvailable || false,
      spotsLeft: (mockClass.capacity || 0) - (mockClass.enrolled || 0),
      waitlistCount: mockClass.waitlistCount || 0,
    };
  }

  try {
    const response = await mindbodyAPI.get(`/class/${classId}/availability`);
    return {
      isAvailable: response.data.IsAvailable,
      spotsLeft: response.data.SpotsLeft,
      waitlistCount: response.data.WaitlistCount,
    };
  } catch (error) {
    console.error('Error checking class availability:', error);
    throw error;
  }
}

export default mindbodyAPI; 
import axios from 'axios';

// Create an Axios instance pre-configured for the Mindbody API
const mindbodyAPI = axios.create({
  baseURL: 'https://api.mindbodyonline.com/public/v6',
  headers: {
    'Content-Type': 'application/json',
    'Api-Key': process.env.MINDBODY_API_KEY || '',
  },
});

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
  },
];

// Placeholder function to fetch classes
// For now, returns mock data. Will be replaced with actual API call later.
export async function getClasses(): Promise<Class[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, this would be:
  // const response = await mindbodyAPI.get('/classes');
  // return response.data;
  
  return mockClasses;
}

// Placeholder function for member login
export async function memberLogin(username: string, password: string): Promise<{ token: string; user: any }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response
  return {
    token: 'mock-auth-token',
    user: {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      membershipLevel: 'Gold',
    },
  };
}

export default mindbodyAPI; 
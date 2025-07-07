import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

// Dynamically import the ClassSchedule component
const ClassSchedule = dynamic(() => import('@/components/ClassSchedule'), {
  loading: () => <LoadingSpinner />,
});

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Class Schedule | OAMA Martial Arts',
  description: 'View our comprehensive class schedule for Brazilian Jiu-Jitsu, Muay Thai, Kids Programs, and more. Find the perfect class time that fits your schedule.',
  keywords: 'martial arts classes, BJJ schedule, Muay Thai classes, kids martial arts, class timetable',
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Class Schedule
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Find the perfect class time that fits your schedule. We offer a wide range of classes
          for all skill levels, from beginners to advanced practitioners.
        </p>
        
        <ErrorBoundary fallback={<div className="text-white text-center">Something went wrong loading the schedule. Please try again later.</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <ClassSchedule />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
} 
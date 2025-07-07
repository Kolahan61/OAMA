'use client';

import { useState, useMemo, useEffect } from 'react';
import ClassCard from './ClassCard';
import { Info } from 'lucide-react';
import ClassDetailsModal from './ClassDetailsModal';

// Define a type for the program data fetched from the backend (still useful for context)
interface Program {
  id: string;
  name: string;
  // Add other properties if needed, matching your backend Program model
}

// Updated ClassSession interface to use programId
interface ClassSession {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  category: 'Adult BJJ' | 'Adult Muay Thai' | 'Women' | 'Kids' | 'Tiny Tigers';
  programId: string; // Changed from 'program' to 'programId'
  description?: string;
}

// Fallback schedule data (static) - will be replaced by backend data when available
const fallbackScheduleData: ClassSession[] = [
  // Monday BJJ
  { id: 'bjj-mon-7am', title: 'BJJ Fundamentals', day: 'Monday', startTime: '07:00', endTime: '08:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-mon-12pm', title: 'BJJ Fundamentals', day: 'Monday', startTime: '12:00', endTime: '13:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-elite-mon-1pm', title: 'BJJ Elite', day: 'Monday', startTime: '13:00', endTime: '14:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-mon-615pm', title: 'BJJ Fundamentals', day: 'Monday', startTime: '18:15', endTime: '19:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-mon-7pm', title: 'BJJ Advanced', day: 'Monday', startTime: '19:00', endTime: '19:45', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'randori-mon-745pm', title: 'Randori (Open Mat)', day: 'Monday', startTime: '19:45', endTime: '20:30', category: 'Adult BJJ', programId: 'bjj' },
  
  // Tuesday BJJ
  { id: 'bjj-tue-7am', title: 'BJJ Fundamentals', day: 'Tuesday', startTime: '07:00', endTime: '08:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-tue-12pm', title: 'BJJ Fundamentals', day: 'Tuesday', startTime: '12:00', endTime: '13:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-elite-tue-1pm', title: 'BJJ Elite', day: 'Tuesday', startTime: '13:00', endTime: '14:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-tue-615pm', title: 'BJJ Fundamentals', day: 'Tuesday', startTime: '18:15', endTime: '19:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'wrestling-tue-7pm', title: 'Wrestling', day: 'Tuesday', startTime: '19:00', endTime: '19:45', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'randori-tue-745pm', title: 'Randori (Open Mat)', day: 'Tuesday', startTime: '19:45', endTime: '20:30', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'homeschool-bjj-tue', title: 'Homeschool BJJ', day: 'Tuesday', startTime: '10:15', endTime: '11:00', category: 'Kids', programId: 'kids-bjj' }, 
  
  // Wednesday BJJ
  { id: 'bjj-wed-7am', title: 'BJJ Fundamentals', day: 'Wednesday', startTime: '07:00', endTime: '08:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-elite-wed-1pm', title: 'BJJ Elite', day: 'Wednesday', startTime: '13:00', endTime: '14:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-wed-615pm', title: 'BJJ Fundamentals', day: 'Wednesday', startTime: '18:15', endTime: '19:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'women-bjj-wed', title: 'Women\'s BJJ', day: 'Wednesday', startTime: '18:15', endTime: '19:00', category: 'Women', programId: 'womens-only' }, 
  { id: 'bjj-wed-7pm', title: 'BJJ Advanced', day: 'Wednesday', startTime: '19:00', endTime: '19:45', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'leg-locks-wed', title: 'Leg Locks', day: 'Wednesday', startTime: '19:00', endTime: '19:45', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'randori-wed-745pm', title: 'Randori (Open Mat)', day: 'Wednesday', startTime: '19:45', endTime: '20:30', category: 'Adult BJJ', programId: 'bjj' },
  
  // Thursday BJJ
  { id: 'bjj-thu-12pm', title: 'BJJ Fundamentals', day: 'Thursday', startTime: '12:00', endTime: '13:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-elite-thu-1pm', title: 'BJJ Elite', day: 'Thursday', startTime: '13:00', endTime: '14:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'women-bjj-thu', title: 'Women\'s BJJ', day: 'Thursday', startTime: '18:15', endTime: '19:00', category: 'Women', programId: 'womens-only' }, 
  { id: 'wrestling-thu-7pm', title: 'Wrestling', day: 'Thursday', startTime: '19:00', endTime: '19:45', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'randori-thu-745pm', title: 'Randori (Open Mat)', day: 'Thursday', startTime: '19:45', endTime: '20:30', category: 'Adult BJJ', programId: 'bjj' },
  
  // Friday BJJ
  { id: 'nogi-fri-12pm', title: 'No-Gi Technique', day: 'Friday', startTime: '12:00', endTime: '13:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-elite-fri-1pm', title: 'BJJ Elite', day: 'Friday', startTime: '13:00', endTime: '14:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-fri-615pm', title: 'BJJ Advanced', day: 'Friday', startTime: '18:15', endTime: '19:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'wrestling-fri-7pm', title: 'Wrestling', day: 'Friday', startTime: '19:00', endTime: '20:00', category: 'Adult BJJ', programId: 'bjj' },
  
  // Saturday BJJ
  { id: 'nogi-sat-11am', title: 'No-Gi Technique', day: 'Saturday', startTime: '11:00', endTime: '11:45', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-sat-1145am', title: 'BJJ Advanced', day: 'Saturday', startTime: '11:45', endTime: '12:30', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-sat-1130am', title: 'BJJ Advanced', day: 'Saturday', startTime: '11:30', endTime: '12:15', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'bjj-sat-1215pm', title: 'BJJ Fundamentals', day: 'Saturday', startTime: '12:15', endTime: '13:00', category: 'Adult BJJ', programId: 'bjj' },
  { id: 'openmat-sat', title: 'Gi/No-Gi Open Mat', day: 'Saturday', startTime: '12:30', endTime: '13:30', category: 'Adult BJJ', programId: 'bjj' },
  
  // Muay Thai Classes
  // Monday-Friday Conditioning
  { id: 'mt-conditioning-mon-12pm', title: 'Conditioning', day: 'Monday', startTime: '12:00', endTime: '13:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-mon-615pm', title: 'Conditioning', day: 'Monday', startTime: '18:15', endTime: '19:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-tue-12pm', title: 'Conditioning', day: 'Tuesday', startTime: '12:00', endTime: '13:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-tue-615pm', title: 'Conditioning', day: 'Tuesday', startTime: '18:15', endTime: '19:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-wed-12pm', title: 'Conditioning', day: 'Wednesday', startTime: '12:00', endTime: '13:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-wed-615pm', title: 'Conditioning', day: 'Wednesday', startTime: '18:15', endTime: '19:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-thu-12pm', title: 'Conditioning', day: 'Thursday', startTime: '12:00', endTime: '13:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-thu-615pm', title: 'Conditioning', day: 'Thursday', startTime: '18:15', endTime: '19:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-fri-12pm', title: 'Conditioning', day: 'Friday', startTime: '12:00', endTime: '13:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-fri-615pm', title: 'Conditioning', day: 'Friday', startTime: '18:15', endTime: '19:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  
  // Muay Thai Technique Classes
  { id: 'mt-advanced-mon', title: 'Advanced', day: 'Monday', startTime: '19:45', endTime: '20:30', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-technique-mon', title: 'Technique', day: 'Monday', startTime: '19:00', endTime: '19:45', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-advanced-tue', title: 'Advanced', day: 'Tuesday', startTime: '19:45', endTime: '20:30', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-technique-tue', title: 'Technique', day: 'Tuesday', startTime: '19:00', endTime: '19:45', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-boxing-wed', title: 'Boxing', day: 'Wednesday', startTime: '18:15', endTime: '19:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-advanced-wed', title: 'Advanced', day: 'Wednesday', startTime: '19:45', endTime: '20:30', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-technique-thu', title: 'Technique', day: 'Thursday', startTime: '19:00', endTime: '19:45', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-sparring-fri', title: 'Sparring', day: 'Friday', startTime: '19:00', endTime: '20:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  
  // Women's Muay Thai Classes
  { id: 'women-mt-tue', title: 'Women\'s Muay Thai', day: 'Tuesday', startTime: '17:30', endTime: '18:15', category: 'Women', programId: 'womens-only' }, 
  { id: 'women-mt-thu', title: 'Women\'s Muay Thai', day: 'Thursday', startTime: '17:30', endTime: '18:15', category: 'Women', programId: 'womens-only' }, 
  
  // Saturday Muay Thai
  { id: 'mt-parents-sat', title: 'Muay Thai Parents', day: 'Saturday', startTime: '10:15', endTime: '11:00', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-conditioning-sat', title: 'Conditioning', day: 'Saturday', startTime: '11:00', endTime: '11:45', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-advance-sat', title: 'Advanced', day: 'Saturday', startTime: '11:45', endTime: '12:30', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-openmat-sat', title: 'MT Open Mat', day: 'Saturday', startTime: '12:30', endTime: '13:30', category: 'Adult Muay Thai', programId: 'muay-thai' },
  { id: 'mt-sparring-sat', title: 'Sparring', day: 'Saturday', startTime: '13:30', endTime: '14:30', category: 'Adult Muay Thai', programId: 'muay-thai' },
  
  // Kids Programs (Monday-Friday) - These will only appear if a 'Kids' filter is selected under BJJ/Muay Thai
  { id: 'after-school-mon', title: 'After School Program', day: 'Monday', startTime: '14:45', endTime: '17:30', category: 'Kids', programId: 'after-school' }, 
  { id: 'after-school-tue', title: 'After School Program', day: 'Tuesday', startTime: '14:45', endTime: '17:30', category: 'Kids', programId: 'after-school' }, 
  { id: 'after-school-wed', title: 'After School Program', day: 'Wednesday', startTime: '14:45', endTime: '17:30', category: 'Kids', programId: 'after-school' }, 
  { id: 'after-school-thu', title: 'After School Program', day: 'Thursday', startTime: '14:45', endTime: '17:30', category: 'Kids', programId: 'after-school' }, 
  { id: 'after-school-fri', title: 'After School Program', day: 'Friday', startTime: '14:45', endTime: '17:30', category: 'Kids', programId: 'after-school' }, 
  
  { id: 'kids-comp-mon', title: 'Kids Comp', day: 'Monday', startTime: '16:45', endTime: '17:30', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-comp-tue', title: 'Kids Comp', day: 'Tuesday', startTime: '16:45', endTime: '17:30', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-comp-wed', title: 'Kids Comp', day: 'Wednesday', startTime: '16:45', endTime: '17:30', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-comp-thu', title: 'Kids Comp', day: 'Thursday', startTime: '16:45', endTime: '17:30', category: 'Kids', programId: 'kids-bjj' }, 
  
  { id: 'kids-bjj-mon', title: 'Kids BJJ', day: 'Monday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-bjj-tue', title: 'Kids BJJ', day: 'Tuesday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-bjj-wed', title: 'Kids BJJ', day: 'Wednesday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-bjj-thu', title: 'Kids BJJ', day: 'Thursday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-bjj-fri', title: 'Kids BJJ', day: 'Friday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'kids-bjj' }, 
  { id: 'kids-bjj-sat', title: 'Kids BJJ', day: 'Saturday', startTime: '10:15', endTime: '11:00', category: 'Kids', programId: 'kids-bjj' }, 
  
  { id: 'kids-muay-thai-mon', title: 'Kids Muay Thai', day: 'Monday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'muay-thai' }, 
  { id: 'kids-muay-thai-tue', title: 'Kids Muay Thai', day: 'Tuesday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'muay-thai' }, 
  { id: 'kids-muay-thai-wed', title: 'Kids Muay Thai', day: 'Wednesday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'muay-thai' }, 
  { id: 'kids-muay-thai-thu', title: 'Kids Muay Thai', day: 'Thursday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'muay-thai' }, 
  { id: 'kids-muay-thai-fri', title: 'Kids Muay Thai', day: 'Friday', startTime: '17:30', endTime: '18:15', category: 'Kids', programId: 'muay-thai' }, 
  { id: 'kids-muay-thai-sat', title: 'Kids Muay Thai', day: 'Saturday', startTime: '10:15', endTime: '11:00', category: 'Kids', programId: 'muay-thai' }, 
  
  // Tiny Tigers
  { id: 'tiny-tigers-mon', title: 'Tiny Tigers', day: 'Monday', startTime: '17:30', endTime: '18:15', category: 'Tiny Tigers', programId: 'tiny-tigers' }, 
  { id: 'tiny-tigers-tue', title: 'Tiny Tigers', day: 'Tuesday', startTime: '17:30', endTime: '18:15', category: 'Tiny Tigers', programId: 'tiny-tigers' }, 
  { id: 'tiny-tigers-wed', title: 'Tiny Tigers', day: 'Wednesday', startTime: '16:45', endTime: '17:30', category: 'Tiny Tigers', programId: 'tiny-tigers' }, 
  { id: 'tiny-tigers-thu', title: 'Tiny Tigers', day: 'Thursday', startTime: '17:30', endTime: '18:15', category: 'Tiny Tigers', programId: 'tiny-tigers' }, 
  { id: 'tiny-tigers-fri', title: 'Tiny Tigers', day: 'Friday', startTime: '17:30', endTime: '18:15', category: 'Tiny Tigers', programId: 'tiny-tigers' }, 
  { id: 'tiny-tigers-sat', title: 'Tiny Tigers', day: 'Saturday', startTime: '09:15', endTime: '10:00', category: 'Tiny Tigers', programId: 'tiny-tigers' }, 

  // Birthday Parties
  { id: 'birthday-parties-sat', title: 'Birthday Parties', day: 'Saturday', startTime: '14:00', endTime: '16:00', category: 'Kids', programId: 'birthday-parties' },
]

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Updated FilterCategory to reflect new structure
type FilterCategory = 'All' | 'Adults' | 'Women' | 'Kids'

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

export default function ClassSchedule() {
  // activeTab will now store a general category or program group
  const [activeTab, setActiveTab] = useState<string>('bjj-main'); // Initial tab
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All')
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null)
  const [infoTooltip, setInfoTooltip] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // States for fetching programs (still keeping this for future dynamic use)
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [programError, setProgramError] = useState<string | null>(null);

  // States for fetching class sessions from backend
  const [classSessions, setClassSessions] = useState<ClassSession[]>([]);
  const [loadingClassSessions, setLoadingClassSessions] = useState(true);
  const [classSessionError, setClassSessionError] = useState<string | null>(null);

  // Fetch programs from backend on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/programs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Program[] = await response.json();
        setPrograms(data);
      } catch (err) {
        console.error("Failed to fetch programs:", err);
        setProgramError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Fetch class sessions from backend on component mount
  useEffect(() => {
    const fetchClassSessions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/class-sessions`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ClassSession[] = await response.json();
        setClassSessions(data);
      } catch (err) {
        console.error("Failed to fetch class sessions:", err);
        setClassSessionError(err instanceof Error ? err.message : String(err));
        // Fall back to static data if backend fetch fails
        setClassSessions(fallbackScheduleData);
      } finally {
        setLoadingClassSessions(false);
      }
    };

    fetchClassSessions();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Check if device is mobile on component mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.tooltip-container') && !target.closest('.info-button')) {
        setInfoTooltip(null)
      }
    }

    if (infoTooltip) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [infoTooltip])

  // Filter logic (now depends on fetched programs and new tab structure)
  const filteredClasses = useMemo(() => {
    // Use dynamic class sessions data, or fallback if still loading
    const dataToUse = classSessions.length > 0 ? classSessions : fallbackScheduleData;
    
    let filtered = dataToUse;

    // First, filter by the main program tab
    let baseFilteredByTab: ClassSession[] = [];
    if (activeTab === 'bjj-main') {
      // BJJ main tab includes all BJJ-related programs, plus Kids BJJ, Tiny Tigers, Women's Only (if BJJ-focused)
      baseFilteredByTab = dataToUse.filter(cls => 
        cls.programId === 'bjj' || 
        cls.programId === 'kids-bjj' || 
        cls.programId === 'tiny-tigers' ||
        (cls.programId === 'womens-only' && cls.title.includes('BJJ')) // Corrected: Check title for BJJ
      );
    } else if (activeTab === 'muay-thai-main') {
      // Muay Thai main tab includes all Muay Thai-related programs, plus Women's Only (if MT-focused)
      baseFilteredByTab = dataToUse.filter(cls => 
        cls.programId === 'muay-thai' ||
        (cls.programId === 'womens-only' && cls.title.includes('Muay Thai')) // Corrected: Check title for Muay Thai
      );
    } 
    // Classes with programId 'after-school' or 'birthday-parties' are intentionally excluded from these main tabs.

    // Then, apply secondary filters to the tab-filtered classes
    let finalFiltered = baseFilteredByTab;
    if (selectedFilter !== 'All') {
      switch (selectedFilter) {
        case 'Adults':
          finalFiltered = baseFilteredByTab.filter(cls => cls.category.includes('Adult'));
          break;
        case 'Women':
          // This filter should work directly on the 'category' field, which is 'Women' for these classes
          finalFiltered = baseFilteredByTab.filter(cls => cls.category === 'Women');
          break;
        case 'Kids':
          finalFiltered = baseFilteredByTab.filter(cls => 
            cls.category === 'Kids' || cls.category === 'Tiny Tigers'
          );
          break;
      }
    }

    return finalFiltered;
  }, [activeTab, selectedFilter, classSessions]);

  // getFiltersForTab now accepts string for program ID (or main tab ID)
  const getFiltersForTab = (tabId: string): FilterCategory[] => {
    const baseFilters: FilterCategory[] = ['All']; // Start with just 'All'

    if (tabId === 'bjj-main' || tabId === 'muay-thai-main') {
      baseFilters.push('Adults', 'Kids', 'Women'); // Add these for main martial arts tabs
    }
    // No 'Special Programs' filter needed here as it's not a main tab anymore
    
    return baseFilters;
  }

  const handleClassClick = (classSession: ClassSession) => {
    setSelectedClass(classSession);
  }

  const closeModal = () => {
    setSelectedClass(null);
  }

  // Group classes by day
  const classesByDay = useMemo(() => {
    const grouped = daysOfWeek.reduce((acc, day) => {
      acc[day] = filteredClasses
        .filter(cls => cls.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
      return acc
    }, {} as Record<string, ClassSession[]>)
    
    return grouped;
  }, [filteredClasses])

  const handleInfoClick = (e: React.MouseEvent, classSession: ClassSession) => {
    e.stopPropagation() // Prevent class click event
    
    if (isMobile) {
      // On mobile, toggle tooltip
      if (infoTooltip === classSession.id) {
        setInfoTooltip(null)
      } else {
        setInfoTooltip(classSession.id)
      }
    }
  }

  const handleInfoMouseEnter = (classSession: ClassSession) => {
    if (!isMobile) {
      setInfoTooltip(null)
    }
  }

  const handleInfoMouseLeave = () => {
    if (!isMobile) {
      setInfoTooltip(null)
    }
  }

  const getClassDescription = (classSession: ClassSession): string => {
    // Placeholder descriptions based on class type
    const descriptions: Record<string, string> = {
      'BJJ Fundamentals': 'Perfect for beginners! Learn the basic positions, submissions, and escapes of Brazilian Jiu-Jitsu in a welcoming environment.',
      'BJJ Advanced': 'For experienced practitioners. Advanced techniques, complex transitions, and high-level concepts.',
      'BJJ Elite': 'Competition-focused training for dedicated athletes. High intensity and advanced techniques.',
      'Wrestling': 'Improve your takedowns, wrestling fundamentals, and ground control. Great for BJJ and MMA.',
      'Randori (Open Mat)': 'Free sparring time. Practice your techniques in live rolling sessions with training partners.',
      'No-Gi Technique': 'BJJ without the gi. Focus on grips, leg locks, and submission wrestling techniques.',
      'Leg Locks': 'Specialized class focusing on lower body submissions and defense. Intermediate level and above.',
      'Conditioning': 'Muay Thai-specific conditioning. Build strength, endurance, and power for striking arts.',
      'Technique': 'Learn proper Muay Thai technique including punches, kicks, knees, elbows, and clinch work.',
      'Advanced': 'For experienced Muay Thai practitioners. Complex combinations and advanced concepts.',
      'Boxing': 'Focus on punches, footwork, and head movement. Great for building striking fundamentals.',
      'Sparring': 'Live sparring sessions. Practice your techniques in controlled combat situations.',
      'Women\'s BJJ': 'BJJ classes designed specifically for women in a supportive and encouraging environment.',
      'Women\'s Muay Thai': 'Muay Thai classes for women focusing on technique, fitness, and self-defense.',
      'Kids BJJ': 'Age-appropriate Brazilian Jiu-Jitsu for children. Focus on discipline, respect, and basic techniques.',
      'Kids Muay Thai': 'Fun and engaging Muay Thai classes for kids. Builds confidence, discipline, and fitness.',
      'Kids Comp': 'Competition training for young athletes interested in competing in BJJ tournaments.',
      'Tiny Tigers': 'Martial arts program for our youngest students (ages 4-6). Focus on basic movements and fun!',
      'After School Program': 'Complete after-school care with martial arts instruction, homework help, and activities.',
      'Homeschool BJJ': 'Specially scheduled BJJ classes for homeschooled children during school hours.',
      'Gi/No-Gi Open Mat': 'Open training time for both gi and no-gi practitioners. Practice and spar freely.',
      'MT Open Mat': 'Open training time for Muay Thai practitioners. Work on techniques and light sparring.',
      'Muay Thai Parents': 'Muay Thai classes for parents while their kids are in class. Perfect timing for busy families!'
    }

    return descriptions[classSession.title] || `More details about ${classSession.title}. Contact us for specific information about this class.`
  }

  // Render loading/error states for programs
  if (loadingPrograms) {
    return (
      <div className="w-full bg-[#060505] text-white flex items-center justify-center min-h-screen">
        <p>Loading programs...</p>
      </div>
    );
  }

  if (programError) {
    return (
      <div className="w-full bg-[#060505] text-white flex items-center justify-center min-h-screen">
        <p style={{ color: 'red' }}>Error loading programs: {programError}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#060505] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
            Class Schedule
          </h1>
          <p className="text-gray-300 text-lg">
            Choose your program and find the perfect class for you
          </p>
        </div>

        {/* Main Tabs (now explicitly defined) */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => {
                setActiveTab('bjj-main');
                setSelectedFilter('All');
              }}
              className={`px-6 py-3 rounded-md font-heading text-lg transition-all duration-200 ${
                activeTab === 'bjj-main'
                  ? 'bg-[#e31414] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Brazilian Jiu-Jitsu
            </button>
            <button
              onClick={() => {
                setActiveTab('muay-thai-main');
                setSelectedFilter('All');
              }}
              className={`px-6 py-3 rounded-md font-heading text-lg transition-all duration-200 ${
                activeTab === 'muay-thai-main'
                  ? 'bg-[#e31414] text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Muay Thai
            </button>
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {getFiltersForTab(activeTab).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-[#e31414] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {daysOfWeek.map((day) => {
            const dayClasses = classesByDay[day]
            if (!dayClasses || dayClasses.length === 0) return null

            return (
              <section key={day} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h2 className="font-heading text-2xl text-[#e31414] mb-4 border-b border-gray-800 pb-2">
                  {day}
                </h2>
                <div className="space-y-3">
                  {dayClasses.map((classSession) => (
                    <div
                      key={classSession.id}
                      onClick={() => handleClassClick(classSession)}
                      className="group bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-[#e31414] rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-[#e31414]/20 relative"
                    >
                      {/* Info Icon */}
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          onClick={(e) => handleInfoClick(e, classSession)}
                          onMouseEnter={() => handleInfoMouseEnter(classSession)}
                          onMouseLeave={handleInfoMouseLeave}
                          className="info-button p-1 rounded-full text-gray-400 hover:text-[#e31414] hover:bg-gray-700 transition-all duration-200 group/info"
                          aria-label={`More information about ${classSession.title}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        
                        {/* Tooltip */}
                        {infoTooltip === classSession.id && (
                          <div className="tooltip-container absolute top-8 right-0 w-72 max-w-[calc(100vw-2rem)] bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl z-20 text-sm md:w-72">
                            <div className="absolute -top-2 right-3 w-4 h-4 bg-gray-800 border-l border-t border-gray-600 transform rotate-45"></div>
                            
                            <div className="space-y-2">
                              <h4 className="font-semibold text-[#e31414] text-base">
                                {classSession.title}
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {getClassDescription(classSession)}
                              </p>
                              <div className="pt-2 border-t border-gray-700 space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-400">Duration:</span>
                                  <span className="text-gray-300">
                                    {(() => {
                                      const start = new Date(`2000-01-01T${classSession.startTime}`)
                                      const end = new Date(`2000-01-01T${classSession.endTime}`)
                                      const duration = (end.getTime() - start.getTime()) / (1000 * 60)
                                      return `${duration} minutes`
                                    })()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-400">Level:</span>
                                  <span className="text-gray-300">
                                    {classSession.title.includes('Fundamentals') ? 'Beginner Friendly' :
                                      classSession.title.includes('Advanced') || classSession.title.includes('Elite') ? 'Advanced' :
                                      classSession.title.includes('Kids') || classSession.title.includes('Tiny Tigers') ? 'Kids Only' :
                                      'All Levels'}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Close button for mobile */}
                              {isMobile && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setInfoTooltip(null)
                                  }}
                                  className="w-full mt-3 text-xs text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded px-2 py-1 transition-colors"
                                >
                                  Close
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h3 className="font-heading text-lg text-white group-hover:text-[#e31414] transition-colors">
                          {classSession.title}
                        </h3>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                          {classSession.category}
                        </span>
                      </div>
                      <time className="text-[#e31414] font-medium text-sm block">
                        {formatTime(classSession.startTime)} - {formatTime(classSession.endTime)}
                      </time>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-400 text-xs">
                          {/* Display program name from backend, if available, otherwise fallback */}
                          {programs.find(p => p.id === classSession.programId)?.name || classSession.programId}
                        </span>
                        <span className="text-gray-500 group-hover:text-[#e31414] text-xs opacity-0 group-hover:opacity-100 transition-all">
                          Click to register →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* No Classes Message */}
        {Object.values(classesByDay).every(dayClasses => dayClasses.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No classes found for the selected filters.
            </div>
            <button
              onClick={() => setSelectedFilter('All')}
              className="mt-4 px-6 py-2 bg-[#e31414] hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal for Class Details */}
      <ClassDetailsModal
        isOpen={!!selectedClass}
        onClose={closeModal}
        classDetails={selectedClass ? {
          id: selectedClass.id,
          title: selectedClass.title,
          day: selectedClass.day,
          startTime: selectedClass.startTime,
          endTime: selectedClass.endTime,
          category: selectedClass.category,
          description: getClassDescription(selectedClass)
        } : null}
      />
    </div>
  );
} 
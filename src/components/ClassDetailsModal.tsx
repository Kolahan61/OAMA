'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/contexts/ToastContext';
import { auth } from '@/lib/firebase';
import LoginModal from './LoginModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  classDetails: {
    id: string;
    title: string;
    day: string;
    startTime: string;
    endTime: string;
    category: string;
    description: string;
  } | null;
}

export default function ClassDetailsModal({ isOpen, onClose, classDetails }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Check registration status when modal opens
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (isOpen && classDetails?.id && user) {
        setIsCheckingStatus(true);
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) return;
          
          const token = await currentUser.getIdToken();
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/check/${classDetails.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setIsRegistered(data.isRegistered);
            setBookingId(data.bookingId);
          }
        } catch (error) {
          console.error('Error checking registration status:', error);
        } finally {
          setIsCheckingStatus(false);
        }
      } else {
        setIsRegistered(false);
        setBookingId(null);
      }
    };

    checkRegistrationStatus();
  }, [isOpen, classDetails?.id, user]);

  if (!isOpen || !classDetails) return null;

  const handleRegister = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsRegistering(true);
    setRegistrationError(null);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      const token = await currentUser.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ classSessionId: classDetails.id })
      });

      const data = await response.json();

      if (response.ok) {
        showToast(`Successfully registered for ${classDetails.title}`, 'success');
        setIsRegistered(true);
        setBookingId(data.booking.id);
        onClose();
      } else {
        throw new Error(data.error || data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Error registering for class:', error);
      const errorMessage = error.message || 'An error occurred during registration';
      showToast(errorMessage, 'error');
      setRegistrationError(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancel = async () => {
    if (!user || !isRegistered) return;

    setIsRegistering(true);
    setRegistrationError(null);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      const token = await currentUser.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/cancel-by-class`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ classSessionId: classDetails.id })
      });

      const data = await response.json();

      if (response.ok) {
        showToast(`Successfully cancelled registration for ${classDetails.title}`, 'success');
        setIsRegistered(false);
        setBookingId(null);
        onClose();
      } else {
        throw new Error(data.error || data.message || 'Cancellation failed');
      }
    } catch (error: any) {
      console.error('Error cancelling registration:', error);
      const errorMessage = error.message || 'An error occurred during cancellation';
      showToast(errorMessage, 'error');
      setRegistrationError(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {classDetails.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Schedule</p>
                <p className="text-gray-900">
                  {classDetails.day} • {formatTime(classDetails.startTime)} - {formatTime(classDetails.endTime)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-gray-900">{classDetails.category}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{classDetails.description}</p>
              </div>

              {user && isCheckingStatus && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Checking registration status...</span>
                </div>
              )}

              {user && !isCheckingStatus && (
                <div>
                  <p className="text-sm text-gray-500">Registration Status</p>
                  <p className={`text-sm font-medium ${isRegistered ? 'text-green-600' : 'text-gray-600'}`}>
                    {isRegistered ? 'You are registered for this class' : 'Not registered'}
                  </p>
                </div>
              )}

              {registrationError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {registrationError}
                </div>
              )}

              <div className="pt-4">
                {!user ? (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="w-full py-3 px-4 rounded-lg font-medium transition-colors bg-[#e31414] text-white hover:bg-red-600"
                  >
                    Log In to Register
                  </button>
                ) : isRegistered ? (
                  <button
                    onClick={handleCancel}
                    disabled={isRegistering}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isRegistering
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isRegistering ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Cancelling...
                      </div>
                    ) : (
                      'Cancel Registration'
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering || isCheckingStatus}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isRegistering || isCheckingStatus
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#e31414] text-white hover:bg-red-600'
                    }`}
                  >
                    {isRegistering ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registering...
                      </div>
                    ) : (
                      'Register for Class'
                    )}
                  </button>
                )}
                
                {user && !isRegistered && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    You will be registered for this class immediately
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
} 
import { format } from 'date-fns';
import { Clock, User, Users } from 'lucide-react';

interface ClassCardProps {
  name: string;
  startTime: string;
  endTime: string;
  instructor: string;
  description?: string;
  capacity?: number;
  enrolled?: number;
}

export default function ClassCard({
  name,
  startTime,
  endTime,
  instructor,
  description,
  capacity,
  enrolled,
}: ClassCardProps) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  
  const timeRange = `${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
  const date = format(startDate, 'EEEE, MMMM d');
  
  const spotsAvailable = capacity && enrolled ? capacity - enrolled : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* Class Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      
      {/* Date and Time */}
      <div className="flex items-center text-gray-600 mb-2">
        <Clock className="w-4 h-4 mr-2" />
        <span className="text-sm">{date}</span>
      </div>
      <div className="text-gray-700 font-medium mb-3">{timeRange}</div>
      
      {/* Instructor */}
      <div className="flex items-center text-gray-600 mb-3">
        <User className="w-4 h-4 mr-2" />
        <span className="text-sm">{instructor}</span>
      </div>
      
      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
      )}
      
      {/* Capacity Info */}
      {capacity && enrolled !== undefined && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{enrolled}/{capacity} enrolled</span>
          </div>
          {spotsAvailable !== null && (
            <span
              className={`text-sm font-medium ${
                spotsAvailable > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {spotsAvailable > 0 ? `${spotsAvailable} spots left` : 'Class full'}
            </span>
          )}
        </div>
      )}
      
      {/* Book Button */}
      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
        Book Class
      </button>
    </div>
  );
} 
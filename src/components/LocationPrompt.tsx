import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPromptProps {
  onAllow: () => void;
}

const LocationPrompt: React.FC<LocationPromptProps> = ({ onAllow }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <MapPin className="mx-auto mb-4 text-blue-600" size={48} />
        <h2 className="text-2xl font-bold mb-4">Allow Location Access</h2>
        <p className="mb-6">To provide you with the best local deals and services, E-Bazar needs access to your location.</p>
        <button
          onClick={onAllow}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Allow Location Access
        </button>
      </div>
    </div>
  );
};

export default LocationPrompt;
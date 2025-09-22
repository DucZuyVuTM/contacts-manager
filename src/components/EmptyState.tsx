import React from 'react';
import { Users, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddContact: () => void;
  isSearching?: boolean;
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddContact,
  isSearching = false,
  searchQuery = '',
}) => {
  if (isSearching) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
        <p className="text-gray-500 mb-6">
          No contacts match "{searchQuery}". Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Users className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
      <p className="text-gray-500 mb-6">
        Get started by creating your first contact.
      </p>
      <button
        onClick={onAddContact}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Contact
      </button>
    </div>
  );
};
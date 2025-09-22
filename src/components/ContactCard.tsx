import React from 'react';
import { Edit, Trash2, Phone, User } from 'lucide-react';
import type { Contact } from '../types/contact';
import { promptPassword } from '../utils/promptPassword';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  const handleEdit = async () => {
    const password = await promptPassword(
      'Confirm Edition',
      `Enter password to edit ${contact.name}:`
    );

    if (password) onEdit(contact);
  };

  const handleDelete = async () => {
    const password = await promptPassword(
      'Confirm Deletion',
      `Enter password to delete ${contact.name}:`
    );

    if (password) {
      if (window.confirm(`Are you sure to delete ${contact.name}?`)) {
        onDelete(contact._id);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 overflow-x-auto [scrollbar-width:none]">
              {contact.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="text-sm overflow-x-auto [scrollbar-width:none]">{contact.phone}</span>
          </div>
        </div>
        
        <div className="flex gap-1 sm:gap-2 ml-2 sm:ml-4 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit contact"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete contact"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useMemo } from 'react';
import { Plus, Users, AlertCircle } from 'lucide-react';
import { useContacts } from './hooks/useContacts';
import { ContactCard } from './components/ContactCard';
import { ContactForm } from './components/ContactForm';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import type { Contact, ContactFormData } from './types/contact';

const App: React.FC = () => {
  const { contacts, loading, error, createContact, updateContact, deleteContact } = useContacts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    );
  }, [contacts, searchQuery]);

  const handleAddContact = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: ContactFormData) => {
    if (editingContact) {
      await updateContact(editingContact._id, data);
      return true;
    } else {
      if (window.confirm(`Are you sure to create ${data.name}?`)) {
        await createContact(data);
        return true;
      }
      return false;
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 overflow-x-auto [scrollbar-width:none]">
                Contacts Manager
              </h1>
            </div>
            <button
              onClick={handleAddContact}
              className="inline-flex items-center gap-1 sm:gap-2 ml-2 px-2 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Contact</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-8">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or phone number..."
          />
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Total Contacts
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">
                {contacts.length}
              </p>
            </div>
            {searchQuery && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Showing</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                  {filteredContacts.length} results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredContacts.length === 0 ? (
          <EmptyState
            onAddContact={handleAddContact}
            isSearching={!!searchQuery}
            searchQuery={searchQuery}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact._id}
                contact={contact}
                onEdit={handleEditContact}
                onDelete={deleteContact}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      <ContactForm
        contact={editingContact}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isOpen={isFormOpen}
      />
    </div>
  );
}

export default App;
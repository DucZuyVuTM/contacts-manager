import { useState, useEffect } from 'react';
import { contactsApi } from '../services/contactsApi';
import type { Contact, ContactFormData } from '../types/contact';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactsApi.getAll();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData: ContactFormData) => {
    try {
      const newContact = await contactsApi.create(contactData);
      setContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create contact');
      throw err;
    }
  };

  const updateContact = async (id: string, contactData: ContactFormData, password: string) => {
    try {
      const updatedContact = await contactsApi.update(id, contactData, password);
      setContacts(prev => 
        prev.map(contact => 
          contact._id === id ? updatedContact : contact
        )
      );
      return updatedContact;
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update contact');
      throw err;
    }
  };

  const deleteContact = async (id: string, password: string) => {
    try {
      await contactsApi.delete(id, password);
      setContacts(prev => prev.filter(contact => contact._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete contact');
      throw err;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    refetch: fetchContacts,
  };
};
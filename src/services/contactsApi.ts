import { Contact, ContactFormData } from "../types/contact";

const API_BASE_URL = 'http://localhost:5000/api';

export const contactsApi = {
  // Get all contacts
  getAll: async (): Promise<Contact[]> => {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  // Get contact by ID
  getById: async (id: string): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch contact');
    return response.json();
  },

  // Create new contact
  create: async (contactData: ContactFormData): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return response.json();
  },

  // Update contact
  update: async (id: string, contactData: ContactFormData): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return response.json();
  },

  // Delete contact
  delete: async (id: string): Promise<Contact> => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
  },
};
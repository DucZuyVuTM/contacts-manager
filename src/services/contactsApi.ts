import { Contact, ContactFormData } from "../types/contact";
import { API_BASE_URL } from "../env";

const authenticatedFetch = async (
  url: string,
  method: string,
  password?: string,
  body?: object
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (password) {
    headers['Authorization'] = `Bearer ${password}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized: Admin password required via Authorization header.');
  } else if (response.status === 403) {
    throw new Error('Unauthorized: Invalid admin password.');
  }

  if (!response.ok) {
    throw new Error(`Failed request: ${response.statusText}`);
  }

  return response;
}

export const contactsApi = {
  // Get all contacts (Public API)
  getAll: async (): Promise<Contact[]> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/contacts`, 'GET');
    return response.json();
  },

  // Get contact by ID (Public API)
  getById: async (id: string): Promise<Contact> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/contacts/${id}`, 'GET');
    return response.json();
  },

  // Create new contact (Public API)
  create: async (contactData: ContactFormData): Promise<Contact> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/contacts`, 'POST', undefined, contactData);
    return response.json();
  },

  // Update contact (Protected API)
  update: async (id: string, contactData: ContactFormData, password: string): Promise<Contact> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/contacts/${id}`, 'PUT', password, contactData);
    return response.json();
  },

  // Delete contact (Protected API)
  delete: async (id: string, password: string): Promise<Contact> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/contacts/${id}`, 'DELETE', password);
    return response.json();
  },
};
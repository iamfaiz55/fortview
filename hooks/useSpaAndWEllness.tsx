import { useState } from 'react';

export interface SpaWellnessItem {
  _id: string;
  name: string;
  description?: string;
  location: string;
  services: string[];
  contact?: string;
  image: {
    url: string;
    publicId: string;
  };
  rating?: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpaWellnessData {
  name: string;
  description?: string;
  location: string;
  services: string[];
  contact?: string;
  rating?: number;
  order?: number;
  image: File;
}

export interface UpdateSpaWellnessData {
  name?: string;
  description?: string;
  location?: string;
  services?: string[];
  contact?: string;
  rating?: number;
  order?: number;
  isActive?: boolean;
  image?: File;
}

export interface ReorderSpaWellnessData {
  items: { id: string; order: number }[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const useSpaWellness = () => {
  const [spaWellnessItems, setSpaWellnessItems] = useState<SpaWellnessItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaWellness = async (activeOnly = false) => {
    setLoading(true);
    setError(null);
    try {
      const url = activeOnly
        ? `${API_BASE}/spa-and-wellness?active=true`
        : `${API_BASE}/spa-and-wellness`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch spa & wellness items: ${response.status}`);
      }
      const data = await response.json();
      setSpaWellnessItems(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSpaWellness = async (data: CreateSpaWellnessData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      if (data.description) formData.append('description', data.description);
      formData.append('location', data.location);
      data.services.forEach((service, idx) => formData.append(`services[${idx}]`, service));
      if (data.contact) formData.append('contact', data.contact);
      if (data.rating !== undefined) formData.append('rating', data.rating.toString());
      if (data.order !== undefined) formData.append('order', data.order.toString());
      formData.append('image', data.image);

      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/spa-and-wellness`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create spa & wellness item');
      }

      const result = await response.json();
      setSpaWellnessItems(prev => [...prev, result.data]);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSpaWellness = async (id: string, data: UpdateSpaWellnessData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      if (data.name) formData.append('name', data.name);
      if (data.description) formData.append('description', data.description);
      if (data.location) formData.append('location', data.location);
      if (data.services) data.services.forEach((service, idx) => formData.append(`services[${idx}]`, service));
      if (data.contact !== undefined) formData.append('contact', data.contact);
      if (data.rating !== undefined) formData.append('rating', data.rating.toString());
      if (data.order !== undefined) formData.append('order', data.order.toString());
      if (data.isActive !== undefined) formData.append('isActive', data.isActive.toString());
      if (data.image) formData.append('image', data.image);

      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/spa-and-wellness/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update spa & wellness item');
      }

      const result = await response.json();
      setSpaWellnessItems(prev =>
        prev.map(item => (item._id === id ? result.data : item))
      );
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSpaWellness = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/spa-and-wellness/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete spa & wellness item');
      }

      setSpaWellnessItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reorderSpaWellness = async (data: ReorderSpaWellnessData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/spa-and-wellness/reorder`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reorder spa & wellness items');
      }

      const result = await response.json();
      setSpaWellnessItems(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    spaWellnessItems,
    loading,
    error,
    fetchSpaWellness,
    createSpaWellness,
    updateSpaWellness,
    deleteSpaWellness,
    reorderSpaWellness,
  };
};
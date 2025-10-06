import { useState, useEffect } from 'react';

export interface CarouselItem {
  _id: string;
  title: string;
  description: string;
  desktopImage: {
    url: string;
    publicId: string;
  };
  mobileImage: {
    url: string;
    publicId: string;
  };
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarouselData {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  desktopImage: File;
  mobileImage: File;
}

export interface UpdateCarouselData {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  isActive?: boolean;
  desktopImage?: File;
  mobileImage?: File;
}

export interface ReorderData {
  items: { id: string; order: number }[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const useCarousel = () => {
  const [carousels, setCarousels] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
    return {
      'Authorization': `Bearer ${cleanToken}`,
      'Content-Type': 'application/json',
    };
  };

  const getAuthHeadersWithFile = () => {
    const token = localStorage.getItem('token');
    const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
    return {
      'Authorization': `Bearer ${cleanToken}`,
    };
  };

  const fetchCarousels = async (activeOnly = false) => {
    setLoading(true);
    setError(null);
    try {
      const url = activeOnly ? `${API_BASE}/carousel?active=true` : `${API_BASE}/carousel`;
      console.log('Fetching carousels from:', url);
      const response = await fetch(url);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch carousels: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Carousel data received:', data);
      setCarousels(data.data || []);
    } catch (err) {
      console.error('Error fetching carousels:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createCarousel = async (data: CreateCarouselData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      if (data.buttonText) formData.append('buttonText', data.buttonText);
      if (data.buttonLink) formData.append('buttonLink', data.buttonLink);
      if (data.order) formData.append('order', data.order.toString());
      formData.append('desktopImage', data.desktopImage);
      formData.append('mobileImage', data.mobileImage);

      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/carousel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create carousel');
      }

      const result = await response.json();
      setCarousels(prev => [...prev, result.data]);
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCarousel = async (id: string, data: UpdateCarouselData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      if (data.title) formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      if (data.buttonText !== undefined) formData.append('buttonText', data.buttonText);
      if (data.buttonLink !== undefined) formData.append('buttonLink', data.buttonLink);
      if (data.order !== undefined) formData.append('order', data.order.toString());
      if (data.isActive !== undefined) formData.append('isActive', data.isActive.toString());
      if (data.desktopImage) formData.append('desktopImage', data.desktopImage);
      if (data.mobileImage) formData.append('mobileImage', data.mobileImage);

      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/carousel/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update carousel');
      }

      const result = await response.json();
      setCarousels(prev => prev.map(item => 
        item._id === id ? result.data : item
      ));
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCarousel = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/carousel/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete carousel');
      }

      setCarousels(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reorderCarousels = async (data: ReorderData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const cleanToken = token ? token.replace(/^"(.*)"$/, '$1') : token;
      const response = await fetch(`${API_BASE}/carousel/reorder`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reorder carousels');
      }

      const result = await response.json();
      setCarousels(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    carousels,
    loading,
    error,
    fetchCarousels,
    createCarousel,
    updateCarousel,
    deleteCarousel,
    reorderCarousels,
  };
};

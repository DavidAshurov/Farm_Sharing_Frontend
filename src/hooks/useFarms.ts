// This file defines a custom React hook for fetching farm data
import { useState, useEffect } from 'react';
import { type Farm } from '../types/farm';

export const useFarms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь имитируем запрос к API
    const loadFarms = async () => {
      try {


        // Имитация данных
        setFarms([
          { name: 'Galil Farm', city: 'Gal', rating: 4.5 },
          { name: 'Eco Farm', city: 'Haifa', rating: 4.8 }
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading farms:', error);
        setLoading(false);
      }
    };

    loadFarms();
  }, []);

  return { farms, loading };
};
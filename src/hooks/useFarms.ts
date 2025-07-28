// This file defines a custom React hook for fetching farm data
import { useState, useEffect } from 'react';
import type {Farm} from '../types/farm';

export const useFarms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь может быть API-запрос
    setFarms([
      { name: 'Galil Farm', city: 'Gail', rating: 4.5 },
      { name: 'Eco Farm', city: 'Haifa', rating: 4.8 }
    ]);
    setLoading(false);
  }, []);

  return { farms, loading };
};
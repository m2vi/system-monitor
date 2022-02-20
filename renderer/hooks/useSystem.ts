import { basicFetch } from '@m2vi/iva';
import { useEffect, useState } from 'react';
import { round } from '../utils/number';

export const useSystem = (initalState: any, ms: number = 3000) => {
  const [result, setResult] = useState(initalState);
  const [history, setHistory] = useState([]);

  const fetchResult = async () => {
    try {
      const start = performance.now();
      const data = await basicFetch<any>('/api/system');

      setHistory([...history, data?.time]);

      return {
        ...data,
        fetchTime: round(performance.now() - start),
      };
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchResult().then((value) => value && setResult(value));
    }, ms);

    return () => clearInterval(interval);
  }, []);

  return [result, history];
};

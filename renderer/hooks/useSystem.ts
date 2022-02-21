import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

export const useSystem = (initalState: any, ms: number = 3000): [any, number[]] => {
  const [result, setResult] = useState(initalState);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    ipcRenderer.on('system-api-res', (event, data) => {
      if (data) {
        setHistory([...history, data.time]);
        setResult(data);
      }
    });

    return () => {
      ipcRenderer.removeAllListeners('system-api-res');
    };
  }, []);

  useEffect(() => {
    ipcRenderer.send('system-api-req');

    const interval = setInterval(() => {
      ipcRenderer.send('system-api-req');
    }, ms);

    return () => clearInterval(interval);
  }, []);

  return [result, history];
};

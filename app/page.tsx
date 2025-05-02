// app/page.tsx
'use client';

import React, { useCallback } from 'react';
import Papa from 'papaparse';

export default function HomePage() {
  
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(results.data),
          });

          const resData = await response.json();
          alert(resData.message);
        } catch (error) {
          console.error('Upload Fail:', error);
          alert('Upload Fail');
        }
      },
    });
  }, []);

  return (
    <div className='homepage'>
      <label className="ant-btn-wrapper">
        <span className="ant-btn ant-btn-primary">
          Upload CSV File
        </span>
        <input type="file" accept=".csv" onChange={handleFile} />
      </label>
    </div>
  );
}

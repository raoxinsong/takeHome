// app/layout.tsx
import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-en">
      <body>
        <header>
          <nav>
            <a href="/" className='navButton'>Upload</a> 
            <a className='navButton' href="/search">Search</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
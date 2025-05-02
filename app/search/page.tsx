// app/search/page.tsx
'use client';
import './page.css';
import React, { useState, useEffect } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState(null);

 function changeInput(value) {
     if(value ==''){
        setSelectedFixture(null)
     }
     setQuery(value)
 }
  useEffect(() => {
    const fetchFixtures = async () => {
      if (query.trim() === '') {
        setFixtures([]);
        return;
      }

      try {
        const response = await fetch(`/api/search?team=${encodeURIComponent(query)}`);
        const data = await response.json();
        setFixtures(data);
      } catch (error) {
        console.error('Search Fail:', error);
      }
    };
    const debounceTimeout = setTimeout(fetchFixtures, 300); // 防抖处理

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className='searchPage'>
      <input
        type="text"
        placeholder="Enter team name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {fixtures.map((fixture, index) => (
          <li key={index} className="fixtureItem">
            <div
              className="fixtureContent"
              onClick={() => setSelectedFixture(fixture)}
            >
              {fixture.home_team} vs {fixture.away_team}
            </div>
            {selectedFixture === fixture && (
              <div className="detailContent">
                <h2>Team Detail</h2>
                <p>HomeTeam: {fixture.home_team}</p>
                <p>AwayTeam: {fixture.away_team}</p>
                <p>DateTime: {fixture.fixture_datetime}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
}
import { useState, useEffect } from 'react';
import circreteLogo from '../assets/circrete-logo.avif';
import { ChipWrapper } from './Chip';
import { Select } from './form/Select';

export const Header: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('');

  // Navigation options for the select dropdown
  const navigationOptions = [
    { label: 'Buildings', value: '/buildings' },
    { label: 'Components', value: '/components' },
    { label: 'Cross Sections', value: '/crossSections' },
    { label: 'Materials', value: '/materials' },
    { label: 'Rebars', value: '/rebars' },
    { label: 'Geometries', value: '/geometries' },
    { label: 'Users', value: '/users' }
  ];

  // Update current route when hash changes
  useEffect(() => {
    const updateRoute = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentRoute(hash);
    };

    updateRoute();
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  // Handle navigation when select option changes
  const handleNavigationChange = (route: string) => {
    window.location.hash = route;
  };

  return (
    <div className="max-h-[var(--header-height)] fixed top-0 left-0 right-0">
      <div className="flex flex-row justify-between items-center p-4 bg-slate-900 text-slate-50 z-50 max-w-screen-2xl mx-auto h-[var(--header-height)]">
        <div className="flex items-center gap-4">
          <img src={circreteLogo} alt="Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Circrete App</h1>
        </div>
        <div className="flex items-center gap-4">
          <ChipWrapper onClick={() => (window.location.hash = '/')}>Home</ChipWrapper>
          <Select options={navigationOptions} value={currentRoute} onChange={handleNavigationChange} />
        </div>
      </div>
    </div>
  );
};

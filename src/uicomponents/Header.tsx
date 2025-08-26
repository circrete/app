import circreteLogo from '../assets/circrete-logo.avif';
import { ChipWrapper } from './Chip';

export const Header: React.FC = () => {
  return (
    <div className="max-h-[var(--header-height)] fixed top-0 left-0 right-0">
      <div className="flex flex-row justify-between items-center p-4 bg-slate-900 text-slate-50 z-50 max-w-screen-2xl mx-auto h-[var(--header-height)]">
        <div className="flex items-center gap-4">
          <img src={circreteLogo} alt="Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Circrete App</h1>
        </div>
        <div className="flex items-center gap-4">
          <ChipWrapper onClick={() => (window.location.hash = '/')}>
            <p>Home</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/buildings')}>
            <p>Buildings</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/components')}>
            <p>Components</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/crossSections')}>
            <p>Cross Sections</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/materials')}>
            <p>Materials</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/rebars')}>
            <p>Rebars</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/geometries')}>
            <p>Geometries</p>
          </ChipWrapper>
          <ChipWrapper onClick={() => (window.location.hash = '/users')}>
            <p>Users</p>
          </ChipWrapper>
        </div>
      </div>
    </div>
  );
};

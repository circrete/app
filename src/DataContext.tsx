import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Route, Routes } from 'react-router';
import { BuildingTable } from './data/buildings/BuildingsTable';
import { ComponentTable } from './data/components/ComponentTable';
import { UserTable } from './data/users.ts/UserTable';
import { CrossSectionTable } from './data/crossSections/CrossSectionTable';
import { MaterialTable } from './data/materials/MaterialTable';
import { RebarTable } from './data/rebars/RebarTable';
import { GeometryTable } from './data/geometries/GeometryTable';
import { BuildingEditForm } from './data/buildings/BuildingEditForm';
import { BuildingEditFormPage } from './data/buildings/BuildingEditFormPage';

export const DataContext: React.FC = () => {
  const buildings = useQuery(api.queries.collect.buildings.getAll);
  const components = useQuery(api.queries.collect.components.getAll);
  const geometries = useQuery(api.queries.collect.geometries.getAll);
  const materials = useQuery(api.queries.collect.materials.getAll);
  const rebars = useQuery(api.queries.collect.rebars.getAll);
  const crossSections = useQuery(api.queries.collect.crossSections.getAll);
  const users = useQuery(api.queries.collect.users.getAll);

  return (
    <Routes>
      {/**table views*/}
      <Route path={`/buildings`} element={<BuildingTable buildings={buildings ?? []} users={users ?? []} />} />
      <Route
        path={`/components`}
        element={
          <ComponentTable
            components={components ?? []}
            users={users ?? []}
            buildings={buildings ?? []}
            geometryTypes={geometries ?? []}
            crossSections={crossSections ?? []}
            materials={materials ?? []}
          />
        }
      />
      <Route path={`/users`} element={<UserTable users={users ?? []} />} />
      <Route
        path={`/crossSections`}
        element={
          <CrossSectionTable
            crossSections={crossSections ?? []}
            materials={materials ?? []}
            rebars={rebars ?? []}
            users={users ?? []}
          />
        }
      />
      <Route
        path={`/materials`}
        element={<MaterialTable materials={materials ?? []} crossSections={crossSections ?? []} />}
      />
      <Route path={`/rebars`} element={<RebarTable rebars={rebars ?? []} materials={materials ?? []} />} />
      <Route
        path={`/geometries`}
        element={
          <GeometryTable
            geometries={geometries ?? []}
            crossSections={crossSections ?? []}
            materials={materials ?? []}
          />
        }
      />
      {/**form views*/}
      <Route path={`/buildings/new`} element={<></>} />
      <Route
        path={`/buildings/edit/:buildingId`}
        element={<BuildingEditFormPage buildings={buildings ?? []} users={users ?? []} />}
      />
      <Route path={`/components/new`} element={<></>} />
      <Route path={`/users/new`} element={<></>} />
    </Routes>
  );
};

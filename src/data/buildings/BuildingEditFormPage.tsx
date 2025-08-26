import { useParams } from 'react-router';
import { BuildingEditForm } from './BuildingEditForm';
import { DataModel } from '../../../convex/_generated/dataModel';

export const BuildingEditFormPage: React.FC<{
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
}> = ({ buildings, users }) => {
  const { buildingId } = useParams();
  const building = buildings.find((b) => b._id === buildingId);

  return <BuildingEditForm building={building ?? null} users={users} />;
};

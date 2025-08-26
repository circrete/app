import { useParams } from 'react-router';
import { BuildingEditForm } from './BuildingEditForm';
import { DataModel } from '../../../convex/_generated/dataModel';

export const BuildingEditFormPage: React.FC<{
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
}> = ({ buildings, users }) => {
  const { buildingId } = useParams();
  const building = buildings.find((b) => b._id === buildingId);

  if (!building) {
    return <div>Building not found</div>;
  }

  return <BuildingEditForm buildings={[building]} users={users} />;
};

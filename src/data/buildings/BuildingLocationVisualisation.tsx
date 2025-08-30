import { type DataModel } from '../../../convex/_generated/dataModel';
import { useState } from 'react';
import { MapWrapper } from '../../visualisation/leaflet/BuildingLocation';
import { GeneralTable } from '../GeneralTable';
import { Drawer } from '../../uicomponents/Drawer';
import { BuildingEditForm } from './BuildingEditForm';

export const BuildingLocationVisualisation: React.FC<{
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
}> = ({ buildings, users }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedBuildings, setSelectedBuildings] = useState<DataModel['buildings']['document'][]>([]);

  const onClose = () => {
    setSelectedBuildings([]);
    setShowForm(false);
  };

  const onBuildingClick = (building: DataModel['buildings']['document']) => {
    setSelectedBuildings([building]);
    setShowForm(true);
  };

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedBuildings.length}
    >
      <MapWrapper buildings={buildings} setBuilding={onBuildingClick} />
      <Drawer isOpen={showForm}>
        <BuildingEditForm buildings={selectedBuildings} users={users} onClose={onClose} />
      </Drawer>
    </GeneralTable>
  );
};

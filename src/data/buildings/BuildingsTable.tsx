import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
// import { buildingTableUIItems } from './buildingUI';
import { getBuildingTableData } from './buildingLogic';
import { UserChip } from '../users.ts/UserChip';
import { copyIdCellTable } from '../helpers/copyId';
import { BuildingEditForm } from './BuildingEditForm';
import { BuildingEditFormModal } from './BuildingEditModal';
import { useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';
import { LocationChip } from '../location/LocationChip';

export const BuildingTable: React.FC<{
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
}> = ({ buildings, users }) => {
  const [selectedBuildings, setSelectedBuildings] = useState<DataModel['buildings']['document'][]>([]);
  const [selectedBuildingForEditing, setSelectedBuildingForEditing] = useState<
    DataModel['buildings']['document'] | null
  >(null);
  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedBuildingForEditing)}
        rowData={buildings.map((b) => getBuildingTableData(b, users))}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'formerUse' },
          { field: 'address' },
          { field: 'complexity' },
          {
            field: 'location',
            cellRenderer: (u: CustomCellRendererProps) => <LocationChip location={u.value ?? undefined} />
          },
          { field: 'type' },
          {
            field: 'owner',
            cellRenderer: (u: CustomCellRendererProps) => <UserChip user={u.value ?? undefined} />
          },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper onClick={() => setSelectedBuildingForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedBuildings(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedBuildingForEditing)}>
        <BuildingEditForm
          building={selectedBuildingForEditing ?? null}
          users={users}
          onClose={() => setSelectedBuildingForEditing(null)}
        />
      </Drawer>
    </GeneralTable>
  );
};

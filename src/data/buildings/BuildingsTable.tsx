import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { GridReadyEvent } from 'ag-grid-community';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
// import { buildingTableUIItems } from './buildingUI';
import { getBuildingTableData } from './buildingLogic';
import { UserChip } from '../users.ts/UserChip';
import { copyIdCellTable } from '../helpers/copyId';
import { BuildingEditForm } from './BuildingEditForm';
import { useMemo, useRef, useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';
import { LocationChip } from '../subData/location/LocationChip';

export const BuildingTable: React.FC<{
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
}> = ({ buildings, users }) => {
  const gridRef = useRef<GridReadyEvent<any>['api'] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedBuildings, setSelectedBuildings] = useState<DataModel['buildings']['document'][]>([]);

  const onClose = () => {
    setSelectedBuildings([]);
    setShowForm(false);
    if (gridRef.current) gridRef.current!.deselectAll();
  };

  const rowData = useMemo(() => buildings.map((b) => getBuildingTableData(b, users)), [buildings, users]);

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedBuildings.length}
    >
      <AgGridWrapper
        rowData={rowData}
        onGridReady={(e) => (gridRef.current = e.api)}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'formerUse', filter: true },
          { field: 'address', filter: true },
          { field: 'complexity' },
          {
            field: 'location',
            cellRenderer: (u: CustomCellRendererProps) => <LocationChip location={u.value ?? undefined} />
          },
          { field: 'type' },
          {
            field: 'owner',
            filter: true,
            cellRenderer: (u: CustomCellRendererProps) => <UserChip user={u.value ?? undefined} />
          },
          {
            field: 'edit',
            filter: true,
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper
                onClick={() => {
                  setSelectedBuildings([u.data]);
                  setShowForm(true);
                }}
              >
                Edit
              </ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedBuildings(e.api.getSelectedRows())}
      />
      <Drawer isOpen={showForm}>
        <BuildingEditForm buildings={selectedBuildings} users={users} onClose={onClose} />
      </Drawer>
    </GeneralTable>
  );
};

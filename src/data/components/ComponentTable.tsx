import { CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { UserChip } from '../users.ts/UserChip';
import { BuildingChip } from '../buildings/BuildingChip';
import { getComponentTableData } from './componentLogic';
import { GeometryChip } from '../geometries/GeometryChip';
import { copyIdCellTable } from '../helpers/copyId';
import { Drawer } from '../../uicomponents/Drawer';
import { useState } from 'react';
import { ComponentEditForm } from './ComponentEditForm';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';
import { LocationChip } from '../location/LocationChip';

export const ComponentTable: React.FC<{
  components: DataModel['components']['document'][];
  buildings: DataModel['buildings']['document'][];
  users: DataModel['users']['document'][];
  geometryTypes: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ components, buildings, users, geometryTypes, crossSections, materials }) => {
  const [selectedComponents, setSelectedComponents] = useState<DataModel['components']['document'][]>([]);
  const [selectedComponentForEditing, setSelectedComponentForEditing] = useState<
    DataModel['components']['document'] | null
  >(null);
  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedComponentForEditing)}
        rowData={components.map((c) => getComponentTableData(c, buildings, users, geometryTypes))}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'condition' },
          { field: 'floor' },
          { field: 'noHarmfulSubstance' },
          { field: 'planReference' },
          { field: 'price' },
          { field: 'reboundTest' },
          { field: 'visualInspection' },
          {
            field: 'location',
            cellRenderer: (u: CustomCellRendererProps) => <LocationChip location={u.value ?? undefined} />
          },
          {
            field: 'geometryType',
            cellRenderer: (u: CustomCellRendererProps) => (
              <GeometryChip geometry={u.value ?? undefined} materials={materials} crossSections={crossSections} />
            )
          },
          {
            field: 'manufacturer',
            cellRenderer: (u: CustomCellRendererProps) => <UserChip user={u.value ?? undefined} />
          },
          {
            field: 'building',
            cellRenderer: (b: CustomCellRendererProps) => <BuildingChip building={b.value ?? undefined} />
          },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper onClick={() => setSelectedComponentForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedComponents(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedComponentForEditing)}>
        <ComponentEditForm
          component={selectedComponentForEditing ?? null}
          buildings={buildings}
          users={users}
          geometries={geometryTypes}
          onClose={() => setSelectedComponentForEditing(null)}
          crossSections={crossSections ?? []}
          materials={materials ?? []}
        />
      </Drawer>
    </GeneralTable>
  );
};

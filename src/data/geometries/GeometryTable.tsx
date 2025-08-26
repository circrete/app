import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getGeometryTableData } from './geometryLogic';
import { CrossSectionChip } from '../crossSections/CrossSectionChip';
import { copyIdCellTable } from '../helpers/copyId';
import { GeometryEditForm } from './GeometryEditForm';
import { useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const GeometryTable: React.FC<{
  geometries: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ geometries, crossSections, materials }) => {
  const [selectedGeometries, setSelectedGeometries] = useState<DataModel['geometries']['document'][]>([]);
  const [selectedGeometryForEditing, setSelectedGeometryForEditing] = useState<
    DataModel['geometries']['document'] | null
  >(null);

  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedGeometryForEditing)}
        rowData={geometries.map((g) => getGeometryTableData(g, crossSections, materials))}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'type' },
          { field: 'componentCategory' },
          { field: 'length' },
          {
            field: 'crossSection',
            cellRenderer: (u: CustomCellRendererProps) => (
              <CrossSectionChip crossSection={u.value ?? undefined} materials={materials} />
            )
          },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper onClick={() => setSelectedGeometryForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedGeometries(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedGeometryForEditing)}>
        <GeometryEditForm
          geometry={selectedGeometryForEditing ?? null}
          crossSections={crossSections}
          onClose={() => setSelectedGeometryForEditing(null)}
        />
      </Drawer>
    </GeneralTable>
  );
};

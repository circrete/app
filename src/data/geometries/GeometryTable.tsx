import { CustomCellRendererProps } from 'ag-grid-react';
import { GridReadyEvent } from 'ag-grid-community';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getGeometryTableData } from './geometryLogic';
import { CrossSectionChip } from '../crossSections/CrossSectionChip';
import { copyIdCellTable } from '../helpers/copyId';
import { GeometryEditForm } from './GeometryEditForm';
import { useMemo, useRef, useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const GeometryTable: React.FC<{
  geometries: DataModel['geometries']['document'][];
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ geometries, crossSections, materials }) => {
  const gridRef = useRef<GridReadyEvent<any>['api'] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGeometries, setSelectedGeometries] = useState<DataModel['geometries']['document'][]>([]);

  const onClose = () => {
    setSelectedGeometries([]);
    setShowForm(false);
    if (gridRef.current) gridRef.current!.deselectAll();
  };

  const rowData = useMemo(
    () => geometries.map((g) => getGeometryTableData(g, crossSections, materials)),
    [geometries, crossSections, materials]
  );

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedGeometries.length}
    >
      <AgGridWrapper
        drawerOpen={showForm}
        onGridReady={(e) => (gridRef.current = e.api)}
        rowData={rowData}
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
              <ChipWrapper
                onClick={() => {
                  setSelectedGeometries([u.data]);
                  setShowForm(true);
                }}
              >
                Edit
              </ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedGeometries(e.api.getSelectedRows())}
      />
      <Drawer isOpen={showForm}>
        <GeometryEditForm geometries={selectedGeometries} crossSections={crossSections} onClose={onClose} />
      </Drawer>
    </GeneralTable>
  );
};

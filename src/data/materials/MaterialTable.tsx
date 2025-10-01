import { CustomCellRendererProps } from 'ag-grid-react';
import { GridReadyEvent } from 'ag-grid-community';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getMaterialTableData } from './materialLogic';
import { CrossSectionChip } from '../crossSections/CrossSectionChip';
import { copyIdCellTable } from '../helpers/copyId';
import { MaterialEditForm } from './MaterialEditForm';
import { useMemo, useRef, useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const MaterialTable: React.FC<{
  materials: DataModel['materials']['document'][];
  crossSections: DataModel['crossSections']['document'][];
}> = ({ materials, crossSections }) => {
  const gridRef = useRef<GridReadyEvent<any>['api'] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<DataModel['materials']['document'][]>([]);

  const onClose = () => {
    setSelectedMaterials([]);
    setShowForm(false);
    if (gridRef.current) gridRef.current!.deselectAll();
  };

  const rowData = useMemo(() => materials.map((m) => getMaterialTableData(m)), [materials, crossSections]);

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedMaterials.length}
    >
      <AgGridWrapper
        onGridReady={(e) => (gridRef.current = e.api)}
        rowData={rowData}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'materialCategory' },
          { field: 'exposureClass' },
          { field: 'compressiveStrength' },
          { field: 'tensileStrength' },
          { field: 'density' },
          { field: 'elasticModulus' },
          { field: 'fc0k' },
          { field: 'fc90k' },
          { field: 'ft0k' },
          { field: 'ft90k' },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper
                onClick={() => {
                  setSelectedMaterials([u.data]);
                  setShowForm(true);
                }}
              >
                Edit
              </ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedMaterials(e.api.getSelectedRows())}
      />
      <Drawer isOpen={showForm}>
        <MaterialEditForm materials={selectedMaterials} crossSections={crossSections} onClose={onClose} />
      </Drawer>
    </GeneralTable>
  );
};

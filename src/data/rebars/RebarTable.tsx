import { CustomCellRendererProps } from 'ag-grid-react';
import { GridReadyEvent } from 'ag-grid-community';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getRebarTableData } from './rebarLogic';
import { MaterialChip } from '../materials/MaterialChip';
import { copyIdCellTable } from '../helpers/copyId';
import { RebarEditForm } from './RebarEditForm';
import { useMemo, useRef, useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const RebarTable: React.FC<{
  rebars: DataModel['rebars']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ rebars, materials }) => {
  const gridRef = useRef<GridReadyEvent<any>['api'] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRebars, setSelectedRebars] = useState<DataModel['rebars']['document'][]>([]);

  const onClose = () => {
    setSelectedRebars([]);
    setShowForm(false);
    if (gridRef.current) gridRef.current!.deselectAll();
  };

  const rowData = useMemo(() => rebars.map((r) => getRebarTableData(r, materials)), [rebars, materials]);

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedRebars.length}
    >
      <AgGridWrapper
        rowData={rowData}
        onGridReady={(e) => (gridRef.current = e.api)}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'type' },
          { field: 'rebarEntries' },
          {
            field: 'material',
            cellRenderer: (u: CustomCellRendererProps) => <MaterialChip material={u.value ?? undefined} />
          },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper
                onClick={() => {
                  setSelectedRebars([u.data]);
                  setShowForm(true);
                }}
              >
                Edit
              </ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedRebars(e.api.getSelectedRows())}
      />
      <Drawer isOpen={showForm}>
        <RebarEditForm rebars={selectedRebars} materials={materials} onClose={onClose} />
      </Drawer>
    </GeneralTable>
  );
};

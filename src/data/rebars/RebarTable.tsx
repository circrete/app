import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getRebarTableData } from './rebarLogic';
import { MaterialChip } from '../materials/MaterialChip';
import { copyIdCellTable } from '../helpers/copyId';
import { RebarEditForm } from './RebarEditForm';
import { useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const RebarTable: React.FC<{
  rebars: DataModel['rebars']['document'][];
  materials: DataModel['materials']['document'][];
}> = ({ rebars, materials }) => {
  const [selectedRebars, setSelectedRebars] = useState<DataModel['rebars']['document'][]>([]);
  const [selectedRebarForEditing, setSelectedRebarForEditing] = useState<DataModel['rebars']['document'] | null>(null);

  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedRebarForEditing)}
        rowData={rebars.map((r) => getRebarTableData(r, materials))}
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
              <ChipWrapper onClick={() => setSelectedRebarForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedRebars(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedRebarForEditing)}>
        <RebarEditForm
          rebar={selectedRebarForEditing ?? null}
          materials={materials}
          onClose={() => setSelectedRebarForEditing(null)}
        />
      </Drawer>
    </GeneralTable>
  );
};

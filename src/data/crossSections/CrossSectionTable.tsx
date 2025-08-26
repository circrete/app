import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getCrossSectionTableData } from './crossSectionLogic';
import { UserChip } from '../users.ts/UserChip';
import { MaterialChip } from '../materials/MaterialChip';
import { RebarChip } from '../rebars/RebarChip';
import { copyIdCellTable } from '../helpers/copyId';
import { CrossSectionEditForm } from './CrossSectionEditForm';
import { useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const CrossSectionTable: React.FC<{
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
  rebars: DataModel['rebars']['document'][];
  users: DataModel['users']['document'][];
}> = ({ crossSections, materials, rebars, users }) => {
  const [selectedCrossSections, setSelectedCrossSections] = useState<DataModel['crossSections']['document'][]>([]);
  const [selectedCrossSectionForEditing, setSelectedCrossSectionForEditing] = useState<
    DataModel['crossSections']['document'] | null
  >(null);

  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedCrossSectionForEditing)}
        rowData={crossSections.map((cs) => getCrossSectionTableData(cs, materials, rebars, users))}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'type' },
          { field: 'crossSectionCategory' },
          { field: 'width' },
          { field: 'height' },
          { field: 'moment' },
          { field: 'normal' },
          { field: 'shear' },
          {
            field: 'concreteMaterial',
            cellRenderer: (u: CustomCellRendererProps) => <MaterialChip material={u.value ?? undefined} />
          },
          {
            field: 'rebarType',
            cellRenderer: (u: CustomCellRendererProps) => <RebarChip rebar={u.value ?? undefined} />
          },
          {
            field: 'manufacturer',
            cellRenderer: (u: CustomCellRendererProps) => <UserChip user={u.value ?? undefined} />
          },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper onClick={() => setSelectedCrossSectionForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedCrossSections(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedCrossSectionForEditing)}>
        <CrossSectionEditForm
          crossSection={selectedCrossSectionForEditing ?? null}
          materials={materials}
          rebars={rebars}
          users={users}
          onClose={() => setSelectedCrossSectionForEditing(null)}
        />
      </Drawer>
    </GeneralTable>
  );
};

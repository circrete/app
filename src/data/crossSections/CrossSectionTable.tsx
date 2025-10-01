import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { GridReadyEvent } from 'ag-grid-community';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getCrossSectionTableData } from './crossSectionLogic';
import { UserChip } from '../users.ts/UserChip';
import { MaterialChip } from '../materials/MaterialChip';
import { RebarChip } from '../rebars/RebarChip';
import { copyIdCellTable } from '../helpers/copyId';
import { CrossSectionEditForm } from './CrossSectionEditForm';
import { useMemo, useRef, useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const CrossSectionTable: React.FC<{
  crossSections: DataModel['crossSections']['document'][];
  materials: DataModel['materials']['document'][];
  rebars: DataModel['rebars']['document'][];
  users: DataModel['users']['document'][];
}> = ({ crossSections, materials, rebars, users }) => {
  const gridRef = useRef<GridReadyEvent<any>['api'] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCrossSections, setSelectedCrossSections] = useState<DataModel['crossSections']['document'][]>([]);

  const onClose = () => {
    setSelectedCrossSections([]);
    setShowForm(false);
    if (gridRef.current) gridRef.current!.deselectAll();
  };

  const rowData = useMemo(
    () => crossSections.map((cs) => getCrossSectionTableData(cs, materials, rebars, users)),
    [crossSections, materials, users, rebars]
  );

  return (
    <GeneralTable
      addMethod={!showForm ? () => setShowForm(true) : undefined}
      selectedItemsCount={selectedCrossSections.length}
    >
      <AgGridWrapper
        rowData={rowData}
        onGridReady={(e) => (gridRef.current = e.api)}
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
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper
                onClick={() => {
                  setSelectedCrossSections([u.data]);
                  setShowForm(true);
                }}
              >
                Edit
              </ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedCrossSections(e.api.getSelectedRows())}
      />
      <Drawer isOpen={showForm}>
        <CrossSectionEditForm
          crossSections={selectedCrossSections}
          materials={materials}
          rebars={rebars}
          users={users}
          onClose={onClose}
        />
      </Drawer>
    </GeneralTable>
  );
};

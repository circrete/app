import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { getMaterialTableData } from './materialLogic';
import { CrossSectionChip } from '../crossSections/CrossSectionChip';
import { copyIdCellTable } from '../helpers/copyId';
import { MaterialEditForm } from './MaterialEditForm';
import { useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const MaterialTable: React.FC<{
  materials: DataModel['materials']['document'][];
  crossSections: DataModel['crossSections']['document'][];
}> = ({ materials, crossSections }) => {
  const [selectedMaterials, setSelectedMaterials] = useState<DataModel['materials']['document'][]>([]);
  const [selectedMaterialForEditing, setSelectedMaterialForEditing] = useState<
    DataModel['materials']['document'] | null
  >(null);

  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedMaterialForEditing)}
        rowData={materials.map((m) => getMaterialTableData(m, crossSections))}
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
            field: 'crossSection',
            cellRenderer: (u: CustomCellRendererProps) => (
              <CrossSectionChip crossSection={u.value ?? undefined} materials={materials} />
            )
          },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper onClick={() => setSelectedMaterialForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedMaterials(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedMaterialForEditing)}>
        <MaterialEditForm
          material={selectedMaterialForEditing ?? null}
          crossSections={crossSections}
          onClose={() => setSelectedMaterialForEditing(null)}
        />
      </Drawer>
    </GeneralTable>
  );
};

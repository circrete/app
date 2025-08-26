import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { copyIdCellTable } from '../helpers/copyId';
import { UserEditForm } from './UserEditForm';
import { useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const UserTable: React.FC<{
  users: DataModel['users']['document'][];
}> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<DataModel['users']['document'][]>([]);
  const [selectedUserForEditing, setSelectedUserForEditing] = useState<DataModel['users']['document'] | null>(null);

  return (
    <GeneralTable>
      <AgGridWrapper
        drawerOpen={Boolean(selectedUserForEditing)}
        rowData={users}
        columnDefs={[
          copyIdCellTable as any,
          { field: 'name' },
          { field: 'company' },
          { field: 'address' },
          { field: 'mail' },
          { field: 'userCategory' },
          {
            field: 'edit',
            cellRenderer: (u: CustomCellRendererProps) => (
              <ChipWrapper onClick={() => setSelectedUserForEditing(u.data)}>Edit</ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedUsers(e.api.getSelectedRows())}
      />
      <Drawer isOpen={Boolean(selectedUserForEditing)}>
        <UserEditForm user={selectedUserForEditing ?? null} onClose={() => setSelectedUserForEditing(null)} />
      </Drawer>
    </GeneralTable>
  );
};

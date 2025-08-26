import { CustomCellRendererProps } from 'ag-grid-react';
import { GridReadyEvent } from 'ag-grid-community';
import { type DataModel } from '../../../convex/_generated/dataModel';
import { GeneralTable } from '../GeneralTable';
import { copyIdCellTable } from '../helpers/copyId';
import { UserEditForm } from './UserEditForm';
import { useRef, useState } from 'react';
import { Drawer } from '../../uicomponents/Drawer';
import { ChipWrapper } from '../../uicomponents/Chip';
import { AgGridWrapper } from '../../uicomponents/AgGridWrapper';

export const UserTable: React.FC<{
  users: DataModel['users']['document'][];
}> = ({ users }) => {
  const gridRef = useRef<GridReadyEvent<any>['api'] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<DataModel['users']['document'][]>([]);

  const onClose = () => {
    setSelectedUsers([]);
    setShowForm(false);
    if (gridRef.current) gridRef.current!.deselectAll();
  };

  return (
    <GeneralTable addMethod={!showForm ? () => setShowForm(true) : undefined} selectedItemsCount={selectedUsers.length}>
      <AgGridWrapper
        drawerOpen={showForm}
        rowData={users}
        onGridReady={(e) => (gridRef.current = e.api)}
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
              <ChipWrapper
                onClick={() => {
                  setSelectedUsers([u.data]);
                  setShowForm(true);
                }}
              >
                Edit
              </ChipWrapper>
            )
          }
        ]}
        onSelectionChanged={(e) => setSelectedUsers(e.api.getSelectedRows())}
      />
      <Drawer isOpen={showForm}>
        <UserEditForm users={selectedUsers} onClose={onClose} />
      </Drawer>
    </GeneralTable>
  );
};

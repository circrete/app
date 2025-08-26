import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { DataModel, TableNames } from '../../convex/_generated/dataModel';

export const AgGridWrapper = <K extends DataModel[TableNames]['document']>({
  drawerOpen,
  ...props
}: AgGridReactProps<K> & { drawerOpen?: boolean }) => (
  <div
    style={{
      maxWidth: drawerOpen ? 'calc(var(--breakpoint-2xl)-400px)' : 'calc(var(--breakpoint-2xl))',
      marginRight: drawerOpen ? 16 : 0
    }}
    className="h-full w-full transition-all duration-400"
  >
    <AgGridReact
      {...props}
      rowSelection={{
        mode: 'multiRow'
      }}
    />
  </div>
);

import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { DataModel, TableNames } from '../../convex/_generated/dataModel';

export const AgGridWrapper = <K extends DataModel[TableNames]['document']>({ ...props }: AgGridReactProps<K>) => (
  <div className="h-full w-full transition-all duration-400">
    <AgGridReact
      {...props}
      rowSelection={{
        mode: 'multiRow'
      }}
    />
  </div>
);

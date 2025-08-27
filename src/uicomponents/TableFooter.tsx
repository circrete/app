import { ChipWrapper } from './Chip';

export const TableFooter: React.FC<{ addMethod?: () => void; selectedItemsCount: number }> = ({
  addMethod,
  selectedItemsCount
}) => (
  <div className="flex-none flex flex-row justify-between p-1 bg-slate-400 rounded-lg items-center">
    <span className="text-slate-900">
      {selectedItemsCount === 1
        ? '1 item selected'
        : selectedItemsCount === 0
          ? 'No items selected'
          : `${selectedItemsCount} items selected`}
    </span>
    <ChipWrapper onClick={addMethod}>{selectedItemsCount > 0 ? 'Edit' : '+ Add'}</ChipWrapper>
  </div>
);

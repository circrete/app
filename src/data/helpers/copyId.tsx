import { ChipWrapper } from '../../uicomponents/Chip';

/**
 * Helper field defition for ag-grid to copy the id of a document into the clipboard
 */
export const copyIdCellTable = {
  field: '_id',
  cellRenderer: (u: any) => <ChipWrapper onClick={() => navigator.clipboard.writeText(u.data._id)}>Copy ID</ChipWrapper>
};

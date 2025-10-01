import { Input } from '../../../uicomponents/form/Input';
import { RebarEntry } from '../../dataModelTypes';
import { RebarEntryChip } from './RebarEntryChip';

export const RebarEntryEdit: React.FC<{
  rebarEntry: RebarEntry;
  required: boolean;
  onChange: (rebarEntry: RebarEntry) => void;
  onDelete: () => void;
}> = ({ rebarEntry, onChange, required, onDelete }) => {
  return (
    <div>
      <span className="grid grid-cols-[1fr_auto] gap-4">
        <RebarEntryChip rebarEntry={rebarEntry} />
        {onDelete && <button onClick={onDelete}>delete</button>}
      </span>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Rebar Diameter"
          number
          step={0.01}
          required={required}
          value={rebarEntry.rebarDiameter}
          onChange={(rebarDiameter) => onChange({ ...rebarEntry, rebarDiameter })}
        />
        <Input
          label="Rebar Amount"
          number
          step={0.01}
          required={required}
          value={rebarEntry.rebarAmount}
          onChange={(rebarAmount) => onChange({ ...rebarEntry, rebarAmount })}
        />
      </div>
    </div>
  );
};

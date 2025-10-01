import { RebarEntry } from '../../dataModelTypes';
import { RebarEntryEdit } from './RebarEntryEdit';
import { getDefaultRebarEntry } from './rebarEntryLogic';

export const RebarEntryMultiEdit: React.FC<{
  rebarEntries: RebarEntry[];
  onChange: (rebarEntries: RebarEntry[]) => void;
}> = ({ rebarEntries, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {rebarEntries.map((rebarEntry, index) => (
        <RebarEntryEdit
          key={index}
          rebarEntry={rebarEntry}
          onChange={(rebarEntry) => onChange(rebarEntries.map((v, i) => (i === index ? rebarEntry : v)))}
          onDelete={() => onChange(rebarEntries.filter((_, i) => i !== index))}
          required={false}
        />
      ))}
      <button onClick={() => onChange([...rebarEntries, getDefaultRebarEntry()])}>+ add Rebar Entry</button>
    </div>
  );
};

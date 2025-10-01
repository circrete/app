import { DataModel } from '../../../../convex/_generated/dataModel';
import { Input } from '../../../uicomponents/form/Input';
import { Select } from '../../../uicomponents/form/Select';
import { UserType, VisualInspectionType } from '../../dataModelTypes';
import { getUserString } from '../../users.ts/userLogic';
import { LocationEdit } from '../location/LocationEdit';
import { VisualInspectionChip } from './VisualInspectionChip';

export const VisualInspectionEdit: React.FC<{
  visualInspection: VisualInspectionType;
  users: UserType[];
  onChange: (visualInspection: VisualInspectionType) => void;
  onDelete: () => void;
}> = ({ visualInspection, users, onChange, onDelete }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="grid grid-cols-[1fr_auto] gap-4">
        <VisualInspectionChip visualInspection={visualInspection} users={users} />
        {onDelete && <button onClick={onDelete}>delete</button>}
      </span>
      <span className="flex flex-row gap-4">
        <Input
          label="Damage Type"
          value={visualInspection.damageType}
          onChange={(damageType) => onChange({ ...visualInspection, damageType })}
          required={false}
        />
        <Input
          label="Date"
          value={visualInspection.date}
          onChange={(date) => onChange({ ...visualInspection, date })}
          required={false}
        />
        <Select
          label="User"
          value={visualInspection.userId}
          onChange={(userId) => onChange({ ...visualInspection, userId })}
          required={false}
          options={users.map((u) => ({ value: u._id, label: getUserString(u as DataModel['users']['document']) }))}
        />
      </span>
      <LocationEdit
        label="Location"
        location={visualInspection.location}
        onChange={(location) => onChange({ ...visualInspection, location })}
        required={false}
      />
    </div>
  );
};

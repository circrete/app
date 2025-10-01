import { DataModel } from '../../../../convex/_generated/dataModel';
import { Input } from '../../../uicomponents/form/Input';
import { Select } from '../../../uicomponents/form/Select';
import { GPRTestType, UserType } from '../../dataModelTypes';
import { getUserString } from '../../users.ts/userLogic';
import { LocationEdit } from '../location/LocationEdit';

export const GPRTestEdit: React.FC<{
  label?: string;
  gprTest: GPRTestType | undefined;
  users: UserType[];
  onChange: (gprTest: GPRTestType) => void;
  required: boolean;
}> = ({ label, gprTest, users, onChange, required }) => {
  return gprTest ? (
    <div>
      <h3 className="text-lg font-semibold mb-3">{label ?? 'GPR Test'}</h3>
      <div className="flex flex-row gap-4">
        <Input
          label="Rebar Diameter"
          number
          step={0.01}
          required={required}
          value={gprTest.rebarDiameter}
          onChange={(rebarDiameter) => onChange({ ...gprTest, rebarDiameter })}
        />
      </div>
      <Input
        label="Cover Depth"
        number
        step={0.01}
        required={required}
        value={gprTest.coverDepth}
        onChange={(coverDepth) => onChange({ ...gprTest, coverDepth })}
      />
      <Input
        label="Rebar Amount"
        number
        step={0.01}
        required={required}
        value={gprTest.rebarAmount}
        onChange={(rebarAmount) => onChange({ ...gprTest, rebarAmount })}
      />
      <Input
        label="Date"
        value={gprTest.date}
        onChange={(date) => onChange({ ...gprTest, date })}
        required={required}
      />
      <Select
        label="User ID"
        value={gprTest.userId}
        onChange={(userId) => onChange({ ...gprTest, userId })}
        required={required}
        options={users.map((u) => ({ value: u._id, label: getUserString(u as DataModel['users']['document']) }))}
      />
      <LocationEdit
        label="Location"
        location={gprTest.location}
        onChange={(location) => onChange({ ...gprTest, location })}
        required={required}
      />
    </div>
  ) : null;
};

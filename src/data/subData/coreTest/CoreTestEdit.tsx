import { DataModel } from '../../../../convex/_generated/dataModel';
import { Input } from '../../../uicomponents/form/Input';
import { Select } from '../../../uicomponents/form/Select';
import { CoreTestType, UserType } from '../../dataModelTypes';
import { getUserString } from '../../users.ts/userLogic';
import { LocationEdit } from '../location/LocationEdit';

export const CoreTestEdit: React.FC<{
  label?: string;
  coreTest: CoreTestType | undefined;
  users: UserType[];
  onChange: (coreTest: CoreTestType) => void;
  required: boolean;
}> = ({ label, coreTest, users, onChange, required }) => {
  return coreTest ? (
    <div>
      <h3 className="text-lg font-semibold mb-3">{label ?? 'Core Test'}</h3>
      <div className="flex flex-row gap-4">
        <Input
          label="Core Diameter"
          number
          step={0.01}
          required={required}
          value={coreTest.coreDiameter}
          onChange={(coreDiameter) => onChange({ ...coreTest, coreDiameter })}
        />
        <Input
          label="Core Compressive Strength"
          number
          step={0.01}
          required={required}
          value={coreTest.coreCompressiveStrength}
          onChange={(coreCompressiveStrength) => onChange({ ...coreTest, coreCompressiveStrength })}
        />
        <Input
          label="Date"
          value={coreTest.date}
          onChange={(date) => onChange({ ...coreTest, date })}
          required={required}
        />
        <Select
          label="User ID"
          value={coreTest.userId}
          onChange={(userId) => onChange({ ...coreTest, userId })}
          required={required}
          options={users.map((u) => ({ value: u._id, label: getUserString(u as DataModel['users']['document']) }))}
        />
        <LocationEdit
          label="Location"
          location={coreTest.location}
          onChange={(location) => onChange({ ...coreTest, location })}
          required={required}
        />
      </div>
    </div>
  ) : null;
};

import { DataModel } from '../../../../convex/_generated/dataModel';
import { Input } from '../../../uicomponents/form/Input';
import { Select } from '../../../uicomponents/form/Select';
import { DestructiveTestType, UserType } from '../../dataModelTypes';
import { getUserString } from '../../users.ts/userLogic';

export const DestructiveTestEdit: React.FC<{
  destructiveTest: DestructiveTestType;
  required: boolean;
  users: UserType[];
  onChange: (destructiveTest: DestructiveTestType) => void;
}> = ({ destructiveTest, required, users, onChange }) => {
  return (
    <div className="flex flex-row gap-4">
      <Input
        label="Shear Strength"
        number
        step={0.01}
        required={required}
        value={destructiveTest.shearStrength}
        onChange={(shearStrength) => onChange({ ...destructiveTest, shearStrength })}
      />
      <Input
        label="Compressive Strength"
        number
        step={0.01}
        required={required}
        value={destructiveTest.compressiveStrength}
        onChange={(compressiveStrength) => onChange({ ...destructiveTest, compressiveStrength })}
      />
      <Input
        label="Tensile Strength"
        number
        step={0.01}
        required={required}
        value={destructiveTest.tensileStrength}
        onChange={(tensileStrength) => onChange({ ...destructiveTest, tensileStrength })}
      />
      <Input
        label="Young's Modulus"
        number
        step={0.01}
        required={required}
        value={destructiveTest.youngsModulus}
        onChange={(youngsModulus) => onChange({ ...destructiveTest, youngsModulus })}
      />
      <Input
        label="Moment Capacity"
        number
        step={0.01}
        required={required}
        value={destructiveTest.momentCapacity}
        onChange={(momentCapacity) => onChange({ ...destructiveTest, momentCapacity })}
      />
      <Input
        label="Shear Capacity"
        number
        step={0.01}
        required={required}
        value={destructiveTest.shearCapacity}
        onChange={(shearCapacity) => onChange({ ...destructiveTest, shearCapacity })}
      />
      <Input
        label="Normal Capacity"
        number
        step={0.01}
        required={required}
        value={destructiveTest.normalCapacity}
        onChange={(normalCapacity) => onChange({ ...destructiveTest, normalCapacity })}
      />
      <Input
        label="Density"
        number
        step={0.01}
        required={required}
        value={destructiveTest.density}
        onChange={(density) => onChange({ ...destructiveTest, density })}
      />
      <Input
        label="Date"
        value={destructiveTest.date}
        onChange={(date) => onChange({ ...destructiveTest, date })}
        required={required}
      />
      <Select
        label="User"
        value={destructiveTest.userId}
        onChange={(userId) => onChange({ ...destructiveTest, userId })}
        required={required}
        options={users.map((u) => ({ value: u._id, label: getUserString(u as DataModel['users']['document']) }))}
      />
    </div>
  );
};

import { DataModel } from '../../../../convex/_generated/dataModel';
import { Input } from '../../../uicomponents/form/Input';
import { Select } from '../../../uicomponents/form/Select';
import { ChemicalTestType, UserType } from '../../dataModelTypes';
import { getUserString } from '../../users.ts/userLogic';
import { LocationEdit } from '../location/LocationEdit';

export const ChemicalTestEdit: React.FC<{
  chemicalTest: ChemicalTestType;
  users: UserType[];
  required: boolean;
  onChange: (chemicalTest: ChemicalTestType) => void;
}> = ({ chemicalTest, users, required, onChange }) => {
  return (
    <div className="flex flex-row gap-4">
      <Input
        label="Carbonation Depth"
        number
        step={0.01}
        required={required}
        value={chemicalTest.carbonationDepth}
        onChange={(carbonationDepth) => onChange({ ...chemicalTest, carbonationDepth })}
      />
      <Input
        label="Chloride Content"
        number
        step={0.01}
        required={required}
        value={chemicalTest.chlorideContent}
        onChange={(chlorideContent) => onChange({ ...chemicalTest, chlorideContent })}
      />
      <Input
        label="Alkali Reactivity"
        number
        step={0.01}
        required={required}
        value={chemicalTest.alkaliReactivity}
        onChange={(alkaliReactivity) => onChange({ ...chemicalTest, alkaliReactivity })}
      />
      <Input
        label="Date"
        value={chemicalTest.date}
        onChange={(date) => onChange({ ...chemicalTest, date })}
        required={required}
      />
      <Select
        label="User"
        value={chemicalTest.userId}
        onChange={(userId) => onChange({ ...chemicalTest, userId })}
        required={required}
        options={users.map((u) => ({ value: u._id, label: getUserString(u as DataModel['users']['document']) }))}
      />
      <LocationEdit
        label="Location"
        location={chemicalTest.location}
        onChange={(location) => onChange({ ...chemicalTest, location })}
        required={required}
      />
    </div>
  );
};

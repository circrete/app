import { ComponentType, ReboundTestType, UserType } from '../../dataModelTypes';
import { ReboundTestEdit } from './ReboundTestEdit';
import { getDefaultReboundTest } from './reboundTestLogic';

export const ReboundTestMultiEdit: React.FC<{
  component: ComponentType;
  reboundTests: ReboundTestType[];
  users: UserType[];
  onChange: (reboundTests: ReboundTestType[]) => void;
}> = ({ component, reboundTests, users, onChange }) => (
  <div className="flex flex-col gap-4">
    {reboundTests.map((reboundTest, i) => (
      <ReboundTestEdit
        key={i}
        reboundTest={reboundTest}
        users={users}
        onChange={(reboundTest) => onChange(reboundTests.map((v, j) => (j === i ? reboundTest : v)))}
        onDelete={() => onChange(reboundTests.filter((_, j) => j !== i))}
      />
    ))}
    <button onClick={() => onChange([...reboundTests, getDefaultReboundTest(component)])}>+ Add Rebound Test</button>
  </div>
);

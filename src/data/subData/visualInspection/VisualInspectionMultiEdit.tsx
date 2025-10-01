import { ComponentType, UserType, VisualInspectionType } from '../../dataModelTypes';
import { VisualInspectionEdit } from './VisualInspectionEdit';
import { getDefaultVisualInspection } from './visualInspectionLogic';

export const VisualInspectionMultiEdit: React.FC<{
  component: ComponentType;
  visualInspections: VisualInspectionType[];
  users: UserType[];
  onChange: (visualInspections: VisualInspectionType[]) => void;
}> = ({ component, visualInspections, users, onChange }) => (
  <div className="flex flex-col gap-4">
    {visualInspections.map((visualInspection, i) => (
      <VisualInspectionEdit
        key={i}
        visualInspection={visualInspection}
        users={users}
        onChange={(visualInspection) => onChange(visualInspections.map((v, j) => (j === i ? visualInspection : v)))}
        onDelete={() => onChange(visualInspections.filter((_, j) => j !== i))}
      />
    ))}
    <button onClick={() => onChange([...visualInspections, getDefaultVisualInspection(component)])}>
      + Add Visual Inspection
    </button>
  </div>
);

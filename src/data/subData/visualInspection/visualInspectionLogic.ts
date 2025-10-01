import { ComponentType, UserType, VisualInspectionType } from '../../dataModelTypes';

export const getDefaultVisualInspection = (component: ComponentType): VisualInspectionType => ({
  img: '',
  damageType: '',
  date: '',
  userId: '',
  location: component.location
});

export const getVisualInspectionString = (
  visualInspection: VisualInspectionType | VisualInspectionType[] | undefined,
  users: UserType[]
): string | null => {
  if (!visualInspection) return null;

  let damages: string[] = [];
  let user: UserType | undefined = undefined;
  let date: Date | undefined = undefined;

  if (Array.isArray(visualInspection)) {
    if (visualInspection.length < 2) return getVisualInspectionString(visualInspection[0], users);

    // find the latest date
    date = visualInspection.map(({ date }) => new Date(date)).sort((a, b) => b.getTime() - a.getTime())[0];
    // get the string of all the unique types of damage
    damages.push(...new Set(visualInspection.map((v) => v.damageType)));
    // if its all the same user, add that user
    user = visualInspection.every((v) => v.userId === visualInspection[0].userId)
      ? users.find((u) => u._id === visualInspection[0].userId)
      : undefined;
  } else if (visualInspection) {
    date = new Date(visualInspection.date);
    damages.push(visualInspection.damageType);
    user = users.find((u) => u._id === visualInspection.userId);
  }

  let s = '';
  if (date) s += `${date.toLocaleDateString()}`;
  if (user) s += ` - ${user.name}`;
  if (damages.length > 0) s += ` - ${damages.join(', ')}`;

  return s;
};

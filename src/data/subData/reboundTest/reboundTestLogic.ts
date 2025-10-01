import { UserType, ReboundTestType, ComponentType } from '../../dataModelTypes';

export const getDefaultReboundTest = (component: ComponentType): ReboundTestType => ({
  reboundValue: [0],
  reboundDate: new Date().toISOString(),
  userId: undefined,
  location: component.location
});

export const getReboundTestString = (
  reboundTest: ReboundTestType | ReboundTestType[] | undefined,
  users: UserType[]
): string | null => {
  if (!reboundTest) return '';

  let values: number[] = [];
  let user: UserType | undefined = undefined;
  let date: Date | undefined = undefined;

  if (Array.isArray(reboundTest)) {
    if (reboundTest.length < 2) return getReboundTestString(reboundTest[0], users);

    // find the latest date
    date = reboundTest.map(({ reboundDate }) => new Date(reboundDate)).sort((a, b) => b.getTime() - a.getTime())[0];
    // get the string of all the unique types of damage
    reboundTest.forEach(({ reboundValue }) => values.push(...reboundValue));
    // if its all the same user, add that user
    user = reboundTest.every((v) => v.userId === reboundTest[0].userId)
      ? users.find((u) => u._id === reboundTest[0].userId)
      : undefined;
  } else if (reboundTest) {
    date = new Date(reboundTest.reboundDate);
    values.push(...reboundTest.reboundValue);
    user = users.find((u) => u._id === reboundTest.userId);
  }

  const averageValue = values.length ? values.reduce((a, b) => a + b, 0) / values.length : undefined;
  const medianValue = values.length ? values.sort((a, b) => a - b)[Math.floor(values.length / 2)] : undefined;

  if (!averageValue || !medianValue) return null;

  let s = '';
  if (averageValue) s += `a ${averageValue.toFixed(2)}`;
  if (medianValue) s += ` - m ${medianValue.toFixed(2)}`;
  if (date) s += ` - ${date.toLocaleDateString()}`;
  if (user) s += ` - ${user.name}`;

  return s;
};

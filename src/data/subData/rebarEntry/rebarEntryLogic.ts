import { RebarEntry } from '../../dataModelTypes';

export const getDefaultRebarEntry = (): RebarEntry => ({
  rebarDiameter: 0,
  rebarAmount: 0
});

export const getRebarString = (rebar: RebarEntry | RebarEntry[] | undefined): string | null => {
  if (!rebar) return null;

  if (Array.isArray(rebar)) {
    return rebar.map((r) => `${r.rebarDiameter} - ${r.rebarAmount}`).join(', ');
  }

  return `${rebar.rebarDiameter} - ${rebar.rebarAmount}`;
};

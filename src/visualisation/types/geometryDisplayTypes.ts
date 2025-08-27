export type GeometryDisplayType = {
  widthHeightLength: { width: number; height: number; length: number };
  realityPlanes: {
    position: [number, number, number];
    yaw: number;
    color?: [number, number, number];
    componentId: string;
  }[];
  abstractStackPlanes: {
    position: [number, number, number];
    yaw: number;
    color?: [number, number, number];
    componentId: string;
  }[];
};

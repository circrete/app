// this file is created using a config file on jonasward.eu/doc-configer using the following config string:
// {"enums":[{"label":"MaterialCategory","stringValues":["Timber","Concrete"]},{"label":"VisualConditionCategory","stringValues":["Good","Fair","Discard"]},{"label":"UserCategory","stringValues":["Admin","Tester","Manufacturer","Buyer"]},{"label":"ComponentCategory","stringValues":["Column","Slab"]},{"label":"CrossSectionCategory","stringValues":["Column","Slab","HollowCore"]}],"types":[{"label":"BuildingType","canReference":true,"fields":[["location","LocationType",false,false,true],["address","string",false,false,false],["ownerId","UserType",true,false,true],["formerUse","string",false,false,false],["gfa","number",false,false,false],["complexity","number",false,false,false],["img","string",false,false,false]]},{"label":"LocationType","canReference":false,"fields":[["longitude","number",false,false,false],["latitude","number",false,false,false],["height","number",false,false,false]]},{"label":"UserType","canReference":true,"fields":[["name","string",false,false,false],["address","string",false,false,false],["company","string",false,false,false],["mail","string",false,false,false],["userCategory","UserCategory",false,false,false]]},{"label":"GPRTestType","canReference":false,"fields":[["rebarDiameter","number",false,false,false],["coverDepth","number",false,false,false],["rebarAmount","number",false,false,false],["date","string",false,false,false],["userId","string",false,false,false],["location","LocationType",false,false,false]]},{"label":"ChemicalTestType","canReference":false,"fields":[["carbonationDepth","number",false,false,false],["chlorideContent","number",false,false,false],["alkaliReactivity","number",false,false,false],["date","string",false,false,false],["userId","string",false,false,false],["location","LocationType",false,false,false]]},{"label":"ComponentType","canReference":true,"fields":[["buildingId","BuildingType",true,false,true],["img","string",false,true,false],["manufacturerId","UserType",true,false,true],["condition","VisualConditionCategory",false,false,false],["noHarmfulSubstance","boolean",false,false,false],["availableFrom","string",false,false,false],["buyer","UserType",true,false,true],["price","number",false,false,false],["loadingCondition","string",false,false,false],["planReference","string",false,false,false],["yaw","number",false,false,false],["geometryTypeId","GeometryType",true,false,true],["floor","number",false,false,false],["location","LocationType",false,false,false],["visualInspection","VisualInspectionType",false,true,false],["liveload","number",false,false,false],["destructiveTest","DestructiveTestType",false,false,true],["coreTest","CoreTestType",false,false,true],["chemicalTest","ChemicalTestType",false,false,true],["gprTest","GPRTestType",false,false,true],["reboundTest","ReboundTestType",false,true,false]]},{"label":"CoreTestType","canReference":false,"fields":[["coreDiameter","number",false,false,false],["coreCompressiveStrength","number",false,false,false],["date","string",false,false,false],["userId","UserType",true,false,false],["location","LocationType",false,false,false]]},{"label":"CrossSectionType","canReference":true,"fields":[["crossSectionCategory","CrossSectionCategory",false,false,false],["width","number",false,false,false],["height","number",false,false,false],["moment","number",false,false,false],["shear","number",false,false,false],["normal","number",false,false,false],["rebarTypeId","RebarType",true,false,true],["concreteMaterialTypeId","MaterialType",true,false,false],["preStressStrandType","PreStressStrandType",false,false,false]]},{"label":"DestructiveTestType","canReference":false,"fields":[["geometryTypeId","GeometryType",true,false,false],["imgLongitudinal","string",false,false,false],["imgTransverse","string",false,false,false],["userId","UserType",true,false,false],["date","string",false,false,false],["shearStrength","number",false,false,false],["compressiveStrength","number",false,false,false],["tensileStrength","number",false,false,false],["youngsModulus","number",false,false,false],["momentCapacity","number",false,false,false],["shearCapacity","number",false,false,false],["normalCapacity","number",false,false,false],["density","number",false,false,false]]},{"label":"GeometryType","canReference":true,"fields":[["crossSectionId","CrossSectionType",true,false,false],["componentCategory","ComponentCategory",false,false,false],["length","number",false,false,true],["height","number",false,false,true],["originalGeometryId","GeometryType",true,false,true]]},{"label":"MaterialType","canReference":true,"fields":[["materialCategory","MaterialCategory",false,false,false],["compressiveStrength","number",false,false,false],["tensileStrength","number",false,false,false],["elasticModulus","number",false,false,false],["density","number",false,false,false],["exposureClass","string",false,false,false],["fc0k","number",false,false,false],["ft0k","number",false,false,false],["fc90k","number",false,false,false],["ft90k","number",false,false,false]]},{"label":"PreStressStrandType","canReference":false,"fields":[["force","number",false,false,false],["steelClass","string",false,false,false],["steelDiameter","number",false,false,false],["amount","number",false,false,false],["date","string",false,false,false],["location","LocationType",false,false,false],["manufacturerId","UserType",true,false,true]]},{"label":"RebarEntry","canReference":false,"fields":[["rebarDiameter","number",false,false,false],["rebarAmount","number",false,false,false]]},{"label":"RebarType","canReference":true,"fields":[["rebarMaterialId","MaterialType",true,false,true],["rebarEntries","RebarEntry",false,true,false]]},{"label":"ReboundTestType","canReference":false,"fields":[["reboundValue","number",false,true,false],["reboundDate","string",false,false,false],["userId","UserType",true,false,true],["location","LocationType",false,false,false]]},{"label":"VisualInspectionType","canReference":false,"fields":[["img","string",false,false,false],["damageType","string",false,false,false],["date","string",false,false,false],["userId","UserType",true,false,false],["location","LocationType",false,false,false]]}],"version":3}

// named enums
export enum MaterialCategory {
  Timber = 'Timber',
  Concrete = 'Concrete'
}

export enum VisualConditionCategory {
  Good = 'Good',
  Fair = 'Fair',
  Discard = 'Discard'
}

export enum UserCategory {
  Admin = 'Admin',
  Tester = 'Tester',
  Manufacturer = 'Manufacturer',
  Buyer = 'Buyer'
}

export enum ComponentCategory {
  Column = 'Column',
  Slab = 'Slab'
}

export enum CrossSectionCategory {
  Column = 'Column',
  Slab = 'Slab',
  HollowCore = 'HollowCore'
}

// union type of all defined types
export type TypeLabelUnion =
  | 'BuildingType'
  | 'LocationType'
  | 'UserType'
  | 'GPRTestType'
  | 'ChemicalTestType'
  | 'ComponentType'
  | 'CoreTestType'
  | 'CrossSectionType'
  | 'DestructiveTestType'
  | 'GeometryType'
  | 'MaterialType'
  | 'PreStressStrandType'
  | 'RebarEntry'
  | 'RebarType'
  | 'ReboundTestType'
  | 'VisualInspectionType';

// types
export type BuildingType = {
  _id: string;
  type: 'BuildingType';
  location?: LocationType;
  address: string;
  ownerId?: string;
  formerUse: string;
  gfa: number;
  complexity: number;
  img: string;
};

export type LocationType = {
  longitude: number;
  latitude: number;
  height: number;
};

export type UserType = {
  _id: string;
  type: 'UserType';
  name: string;
  address: string;
  company: string;
  mail: string;
  userCategory: UserCategory;
};

export type GPRTestType = {
  rebarDiameter: number;
  coverDepth: number;
  rebarAmount: number;
  date: string;
  userId: string;
  location: LocationType;
};

export type ChemicalTestType = {
  carbonationDepth: number;
  chlorideContent: number;
  alkaliReactivity: number;
  date: string;
  userId: string;
  location: LocationType;
};

export type ComponentType = {
  _id: string;
  type: 'ComponentType';
  buildingId?: string;
  img: string[];
  manufacturerId?: string;
  condition: VisualConditionCategory;
  noHarmfulSubstance: boolean;
  availableFrom: string;
  buyer?: string;
  price: number;
  loadingCondition: string;
  planReference: string;
  yaw: number;
  geometryTypeId?: string;
  floor: number;
  location: LocationType;
  visualInspection: VisualInspectionType[];
  liveload: number;
  destructiveTest?: DestructiveTestType;
  coreTest?: CoreTestType;
  chemicalTest?: ChemicalTestType;
  gprTest?: GPRTestType;
  reboundTest: ReboundTestType[];
};

export type CoreTestType = {
  coreDiameter: number;
  coreCompressiveStrength: number;
  date: string;
  userId: string;
  location: LocationType;
};

export type CrossSectionType = {
  _id: string;
  crossSectionCategory: CrossSectionCategory;
  width: number;
  height: number;
  moment: number;
  shear: number;
  normal: number;
  rebarTypeId?: string;
  concreteMaterialTypeId: string;
  preStressStrandType: PreStressStrandType;
};

export type DestructiveTestType = {
  geometryTypeId: string;
  imgLongitudinal: string;
  imgTransverse: string;
  userId: string;
  date: string;
  shearStrength: number;
  compressiveStrength: number;
  tensileStrength: number;
  youngsModulus: number;
  momentCapacity: number;
  shearCapacity: number;
  normalCapacity: number;
  density: number;
};

export type GeometryType = {
  _id: string;
  type: 'GeometryType';
  crossSectionId: string;
  componentCategory: ComponentCategory;
  length?: number;
  height?: number;
  originalGeometryId?: string;
};

export type MaterialType = {
  _id: string;
  type: 'MaterialType';
  materialCategory: MaterialCategory;
  compressiveStrength: number;
  tensileStrength: number;
  elasticModulus: number;
  density: number;
  exposureClass: string;
  fc0k: number;
  ft0k: number;
  fc90k: number;
  ft90k: number;
};

export type PreStressStrandType = {
  force: number;
  steelClass: string;
  steelDiameter: number;
  amount: number;
  date: string;
  location: LocationType;
  manufacturerId?: string;
};

export type RebarEntry = {
  rebarDiameter: number;
  rebarAmount: number;
};

export type RebarType = {
  _id: string;
  rebarMaterialId?: string;
  rebarEntries: RebarEntry[];
};

export type ReboundTestType = {
  reboundValue: number[];
  reboundDate: string;
  userId?: string;
  location: LocationType;
};

export type VisualInspectionType = {
  img: string;
  damageType: string;
  date: string;
  userId: string;
  location: LocationType;
};

// this type defines the collections that should be defined
export type DatabaseType = {
  buildings: BuildingType[];
  users: UserType[];
  components: ComponentType[];
  crossSections: CrossSectionType[];
  geometries: GeometryType[];
  materials: MaterialType[];
  rebars: RebarType[];
};

// union type
export type UnionType =
  | BuildingType
  | LocationType
  | UserType
  | GPRTestType
  | ChemicalTestType
  | ComponentType
  | CoreTestType
  | CrossSectionType
  | DestructiveTestType
  | GeometryType
  | MaterialType
  | PreStressStrandType
  | RebarEntry
  | RebarType
  | ReboundTestType
  | VisualInspectionType;

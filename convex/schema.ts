// this file is created using a config file on jonasward.eu/doc-configer using the following config string:
// {"enums":[{"label":"MaterialCategory","stringValues":["Timber","Concrete"]},{"label":"VisualConditionCategory","stringValues":["Good","Fair","Discard"]},{"label":"UserCategory","stringValues":["Admin","Tester","Manufacturer","Buyer"]},{"label":"ComponentCategory","stringValues":["Column","Slab"]},{"label":"CrossSectionCategory","stringValues":["Column","Slab","HollowCore"]}],"types":[{"label":"BuildingType","canReference":true,"fields":[["location","LocationType",false,false,true],["address","string",false,false,false],["ownerId","UserType",true,false,true],["formerUse","string",false,false,false],["gfa","number",false,false,false],["complexity","number",false,false,false],["img","string",false,false,false]]},{"label":"LocationType","canReference":false,"fields":[["longitude","number",false,false,false],["latitude","number",false,false,false],["height","number",false,false,false]]},{"label":"UserType","canReference":true,"fields":[["name","string",false,false,false],["address","string",false,false,false],["company","string",false,false,false],["mail","string",false,false,false],["userCategory","UserCategory",false,false,false]]},{"label":"GPRTestType","canReference":false,"fields":[["rebarDiameter","number",false,false,false],["coverDepth","number",false,false,false],["rebarAmount","number",false,false,false],["date","string",false,false,false],["userId","string",false,false,false],["location","LocationType",false,false,false]]},{"label":"ChemicalTestType","canReference":false,"fields":[["carbonationDepth","number",false,false,false],["chlorideContent","number",false,false,false],["alkaliReactivity","number",false,false,false],["date","string",false,false,false],["userId","string",false,false,false],["location","LocationType",false,false,false]]},{"label":"ComponentType","canReference":true,"fields":[["buildingId","BuildingType",true,false,true],["img","string",false,true,false],["manufacturerId","UserType",true,false,true],["condition","VisualConditionCategory",false,false,false],["noHarmfulSubstance","boolean",false,false,false],["availableFrom","string",false,false,false],["buyer","UserType",true,false,true],["price","number",false,false,false],["loadingCondition","string",false,false,false],["planReference","string",false,false,false],["yaw","number",false,false,false],["geometryTypeId","GeometryType",true,false,true],["floor","number",false,false,false],["location","LocationType",false,false,false],["visualInspection","VisualInspectionType",false,true,false],["liveload","number",false,false,false],["destructiveTest","DestructiveTestType",false,false,true],["coreTest","CoreTestType",false,false,true],["chemicalTest","ChemicalTestType",false,false,true],["gprTest","GPRTestType",false,false,true],["reboundTest","ReboundTestType",false,true,false]]},{"label":"CoreTestType","canReference":false,"fields":[["coreDiameter","number",false,false,false],["coreCompressiveStrength","number",false,false,false],["date","string",false,false,false],["userId","UserType",true,false,false],["location","LocationType",false,false,false]]},{"label":"CrossSectionType","canReference":true,"fields":[["crossSectionCategory","CrossSectionCategory",false,false,false],["width","number",false,false,false],["height","number",false,false,false],["moment","number",false,false,false],["shear","number",false,false,false],["normal","number",false,false,false],["rebarTypeId","RebarType",true,false,true],["concreteMaterialTypeId","MaterialType",true,false,false],["preStressStrandType","PreStressStrandType",false,false,false]]},{"label":"DestructiveTestType","canReference":false,"fields":[["geometryTypeId","GeometryType",true,false,false],["imgLongitudinal","string",false,false,false],["imgTransverse","string",false,false,false],["userId","UserType",true,false,false],["date","string",false,false,false],["shearStrength","number",false,false,false],["compressiveStrength","number",false,false,false],["tensileStrength","number",false,false,false],["youngsModulus","number",false,false,false],["momentCapacity","number",false,false,false],["shearCapacity","number",false,false,false],["normalCapacity","number",false,false,false],["density","number",false,false,false]]},{"label":"GeometryType","canReference":true,"fields":[["crossSectionId","CrossSectionType",true,false,false],["componentCategory","ComponentCategory",false,false,false],["length","number",false,false,true],["height","number",false,false,true],["originalGeometryId","GeometryType",true,false,true]]},{"label":"MaterialType","canReference":true,"fields":[["materialCategory","MaterialCategory",false,false,false],["compressiveStrength","number",false,false,false],["tensileStrength","number",false,false,false],["elasticModulus","number",false,false,false],["density","number",false,false,false],["exposureClass","string",false,false,false],["fc0k","number",false,false,false],["ft0k","number",false,false,false],["fc90k","number",false,false,false],["ft90k","number",false,false,false]]},{"label":"PreStressStrandType","canReference":false,"fields":[["force","number",false,false,false],["steelClass","string",false,false,false],["steelDiameter","number",false,false,false],["amount","number",false,false,false],["date","string",false,false,false],["location","LocationType",false,false,false],["manufacturerId","UserType",true,false,true]]},{"label":"RebarEntry","canReference":false,"fields":[["rebarDiameter","number",false,false,false],["rebarAmount","number",false,false,false]]},{"label":"RebarType","canReference":true,"fields":[["rebarMaterialId","MaterialType",true,false,true],["rebarEntries","RebarEntry",false,true,false]]},{"label":"ReboundTestType","canReference":false,"fields":[["reboundValue","number",false,true,false],["reboundDate","string",false,false,false],["userId","UserType",true,false,true],["location","LocationType",false,false,false]]},{"label":"VisualInspectionType","canReference":false,"fields":[["img","string",false,false,false],["damageType","string",false,false,false],["date","string",false,false,false],["userId","UserType",true,false,false],["location","LocationType",false,false,false]]}],"version":3}
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const locationType = v.object({
  longitude: v.float64(),
  latitude: v.float64(),
  height: v.float64()
});

const gPRTestType = v.object({
  rebarDiameter: v.float64(),
  coverDepth: v.float64(),
  rebarAmount: v.float64(),
  date: v.string(),
  userId: v.string(),
  location: locationType
});

const chemicalTestType = v.object({
  carbonationDepth: v.float64(),
  chlorideContent: v.float64(),
  alkaliReactivity: v.float64(),
  date: v.string(),
  userId: v.string(),
  location: locationType
});

const coreTestType = v.object({
  coreDiameter: v.float64(),
  coreCompressiveStrength: v.float64(),
  date: v.string(),
  userId: v.string(),
  location: locationType
});

const destructiveTestType = v.object({
  geometryTypeId: v.string(),
  imgLongitudinal: v.string(),
  imgTransverse: v.string(),
  userId: v.string(),
  date: v.string(),
  shearStrength: v.float64(),
  compressiveStrength: v.float64(),
  tensileStrength: v.float64(),
  youngsModulus: v.float64(),
  momentCapacity: v.float64(),
  shearCapacity: v.float64(),
  normalCapacity: v.float64(),
  density: v.float64()
});

const preStressStrandType = v.object({
  force: v.float64(),
  steelClass: v.string(),
  steelDiameter: v.float64(),
  amount: v.float64(),
  date: v.string(),
  location: locationType,
  manufacturerId: v.optional(v.string())
});

const rebarEntry = v.object({
  rebarDiameter: v.float64(),
  rebarAmount: v.float64()
});

const reboundTestType = v.object({
  reboundValue: v.array(v.float64()),
  reboundDate: v.string(),
  userId: v.optional(v.string()),
  location: locationType
});

const visualInspectionType = v.object({
  img: v.string(),
  damageType: v.string(),
  date: v.string(),
  userId: v.string(),
  location: locationType
});

export default defineSchema({
  buildings: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    location: v.optional(locationType),
    address: v.string(),
    ownerId: v.optional(v.string()),
    formerUse: v.string(),
    gfa: v.float64(),
    complexity: v.float64(),
    img: v.string()
  }),
  users: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    name: v.string(),
    address: v.string(),
    company: v.string(),
    mail: v.string(),
    userCategory: v.string()
  }),
  components: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    buildingId: v.optional(v.string()),
    img: v.array(v.string()),
    manufacturerId: v.optional(v.string()),
    condition: v.string(),
    noHarmfulSubstance: v.boolean(),
    availableFrom: v.string(),
    buyer: v.optional(v.string()),
    price: v.float64(),
    loadingCondition: v.string(),
    planReference: v.string(),
    yaw: v.float64(),
    geometryTypeId: v.optional(v.string()),
    floor: v.float64(),
    location: locationType,
    visualInspection: v.array(visualInspectionType),
    liveload: v.float64(),
    destructiveTest: v.optional(destructiveTestType),
    coreTest: v.optional(coreTestType),
    chemicalTest: v.optional(chemicalTestType),
    gprTest: v.optional(gPRTestType),
    reboundTest: v.array(reboundTestType)
  }),
  crossSections: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    crossSectionCategory: v.string(),
    width: v.float64(),
    height: v.float64(),
    moment: v.float64(),
    shear: v.float64(),
    normal: v.float64(),
    rebarTypeId: v.optional(v.string()),
    concreteMaterialTypeId: v.string(),
    preStressStrandType: preStressStrandType
  }),
  geometries: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    crossSectionId: v.string(),
    componentCategory: v.string(),
    length: v.optional(v.float64()),
    height: v.optional(v.float64()),
    originalGeometryId: v.optional(v.string())
  }),
  materials: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    materialCategory: v.string(),
    compressiveStrength: v.float64(),
    tensileStrength: v.float64(),
    elasticModulus: v.float64(),
    density: v.float64(),
    exposureClass: v.string(),
    fc0k: v.float64(),
    ft0k: v.float64(),
    fc90k: v.float64(),
    ft90k: v.float64()
  }),
  rebars: defineTable({
    _id: v.string(),
    id: v.optional(v.string()),
    type: v.optional(v.string()),
    rebarMaterialId: v.optional(v.string()),
    rebarEntries: v.array(rebarEntry)
  })
});

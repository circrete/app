import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  buildings: defineTable({
    address: v.string(),
    complexity: v.float64(),
    formerUse: v.string(),
    gfa: v.float64(),
    img: v.string(),
    id: v.optional(v.string()),
    location: v.optional(
      v.object({
        height: v.float64(),
        latitude: v.float64(),
        longitude: v.float64()
      })
    ),
    ownerId: v.optional(v.string()),
    type: v.string()
  }),
  components: defineTable({
    availableFrom: v.string(),
    buildingId: v.optional(v.string()),
    buyer: v.string(),
    condition: v.string(),
    floor: v.float64(),
    geometryTypeId: v.optional(v.string()),
    img: v.array(v.any()),
    liveload: v.float64(),
    loadingCondition: v.string(),
    id: v.optional(v.string()),
    location: v.object({
      height: v.float64(),
      latitude: v.float64(),
      longitude: v.float64()
    }),
    manufacturerId: v.optional(v.string()),
    noHarmfulSubstance: v.boolean(),
    planReference: v.string(),
    price: v.float64(),
    reboundTest: v.array(
      v.object({
        location: v.object({
          height: v.float64(),
          latitude: v.float64(),
          longitude: v.float64()
        }),
        reboundDate: v.string(),
        reboundValue: v.array(v.float64()),
        userId: v.optional(v.string())
      })
    ),
    type: v.string(),
    visualInspection: v.array(v.any()),
    yaw: v.float64()
  }),
  crossSections: defineTable({
    concreteMaterialTypeId: v.string(),
    crossSectionCategory: v.string(),
    height: v.float64(),
    moment: v.float64(),
    normal: v.float64(),
    id: v.optional(v.string()),
    preStressStrandType: v.object({
      amount: v.float64(),
      date: v.string(),
      force: v.float64(),
      location: v.object({
        height: v.float64(),
        latitude: v.float64(),
        longitude: v.float64()
      }),
      manufacturerId: v.optional(v.string()),
      steelClass: v.string(),
      steelDiameter: v.float64()
    }),
    rebarTypeId: v.optional(v.string()),
    shear: v.float64(),
    type: v.string(),
    width: v.float64()
  }),
  geometries: defineTable({
    componentCategory: v.string(),
    crossSectionId: v.optional(v.string()),
    length: v.float64(),
    id: v.optional(v.string()),
    type: v.string()
  }),
  materials: defineTable({
    compressiveStrength: v.float64(),
    crossSectionId: v.optional(v.string()),
    density: v.float64(),
    elasticModulus: v.float64(),
    exposureClass: v.string(),
    fc0k: v.float64(),
    fc90k: v.float64(),
    ft0k: v.float64(),
    ft90k: v.float64(),
    materialCategory: v.string(),
    id: v.optional(v.string()),
    tensileStrength: v.float64()
  }),
  rebars: defineTable({
    rebarEntries: v.array(
      v.object({
        rebarAmount: v.float64(),
        rebarDiameter: v.float64()
      })
    ),
    rebarMaterialId: v.optional(v.string()),
    id: v.optional(v.string()),
    type: v.string()
  }),
  users: defineTable({
    address: v.string(),
    company: v.string(),
    mail: v.string(),
    name: v.string(),
    id: v.optional(v.string()),
    userCategory: v.string()
  })
});

import { mutation } from '../../_generated/server';
import { v } from 'convex/values';

export const editComponent = mutation({
  args: {
    componentId: v.id('components'),
    type: v.optional(v.string()),
    condition: v.optional(v.string()),
    floor: v.optional(v.float64()),
    location: v.optional(
      v.object({
        height: v.float64(),
        latitude: v.float64(),
        longitude: v.float64()
      })
    ),
    price: v.optional(v.float64()),
    yaw: v.optional(v.float64()),
    liveload: v.optional(v.float64()),
    loadingCondition: v.optional(v.string()),
    availableFrom: v.optional(v.string()),
    buyer: v.optional(v.string()),
    planReference: v.optional(v.string()),
    noHarmfulSubstance: v.optional(v.boolean()),
    buildingId: v.optional(v.string()),
    geometryTypeId: v.optional(v.string()),
    manufacturerId: v.optional(v.string()),
    img: v.optional(v.array(v.any())),
    reboundTest: v.optional(
      v.array(
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
      )
    ),
    visualInspection: v.optional(v.array(v.any()))
  },
  handler: async (ctx, args) => {
    const { componentId, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    await ctx.db.patch(componentId, patch);

    return { success: true };
  }
});

export const editMultipleComponents = mutation({
  args: {
    componentIds: v.array(v.id('components')),
    type: v.optional(v.string()),
    condition: v.optional(v.string()),
    floor: v.optional(v.float64()),
    location: v.optional(
      v.object({
        height: v.float64(),
        latitude: v.float64(),
        longitude: v.float64()
      })
    ),
    price: v.optional(v.float64()),
    yaw: v.optional(v.float64()),
    liveload: v.optional(v.float64()),
    loadingCondition: v.optional(v.string()),
    availableFrom: v.optional(v.string()),
    buyer: v.optional(v.string()),
    planReference: v.optional(v.string()),
    noHarmfulSubstance: v.optional(v.boolean()),
    buildingId: v.optional(v.string()),
    geometryTypeId: v.optional(v.string()),
    manufacturerId: v.optional(v.string()),
    img: v.optional(v.array(v.any())),
    reboundTest: v.optional(
      v.array(
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
      )
    ),
    visualInspection: v.optional(v.array(v.any()))
  },
  handler: async (ctx, args) => {
    const { componentIds, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    for (const componentId of componentIds) {
      await ctx.db.patch(componentId, patch);
    }

    return { success: true };
  }
});

export const createComponent = mutation({
  args: {
    type: v.string(),
    condition: v.string(),
    floor: v.float64(),
    location: v.object({
      height: v.float64(),
      latitude: v.float64(),
      longitude: v.float64()
    }),
    price: v.float64(),
    yaw: v.float64(),
    liveload: v.float64(),
    loadingCondition: v.string(),
    availableFrom: v.string(),
    buyer: v.string(),
    planReference: v.string(),
    noHarmfulSubstance: v.boolean(),
    buildingId: v.optional(v.string()),
    geometryTypeId: v.optional(v.string()),
    manufacturerId: v.optional(v.string()),
    img: v.array(v.any()),
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
    visualInspection: v.array(v.any())
  },
  handler: async (ctx, args) => {
    const componentId = await ctx.db.insert('components', {
      ...args
    });

    return componentId;
  }
});

import { v } from 'convex/values';
import { mutation } from '../../_generated/server';

export const createBuilding = mutation({
  args: {
    buildingType: v.string(),
    formerUse: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('buildings', {
      type: args.buildingType,
      formerUse: args.formerUse,
      address: '',
      complexity: 0,
      gfa: 0,
      img: '',
      location: {
        height: 0,
        latitude: 0,
        longitude: 0
      }
    });
  }
});

export const editBuilding = mutation({
  args: {
    buildingId: v.id('buildings'),
    type: v.optional(v.string()),
    formerUse: v.optional(v.string()),
    address: v.optional(v.string()),
    complexity: v.optional(v.number()),
    gfa: v.optional(v.number()),
    img: v.optional(v.string()),
    ownerId: v.optional(v.string()),
    location: v.optional(
      v.object({
        height: v.number(),
        latitude: v.number(),
        longitude: v.number()
      })
    )
  },
  handler: async (ctx, args) => {
    // strip args that are undefined from patch object
    const patch = Object.fromEntries(
      Object.entries(args)
        .filter(([_, v]) => v !== undefined)
        .filter(([l]) => l !== 'buildingId')
    );
    await ctx.db.patch(args.buildingId, patch);
  }
});

export const editMultipleBuildings = mutation({
  args: {
    buildingIds: v.array(v.id('buildings')),
    type: v.optional(v.string()),
    formerUse: v.optional(v.string()),
    address: v.optional(v.string()),
    complexity: v.optional(v.number()),
    gfa: v.optional(v.number()),
    img: v.optional(v.string()),
    ownerId: v.optional(v.string()),
    location: v.optional(
      v.object({
        height: v.number(),
        latitude: v.number(),
        longitude: v.number()
      })
    )
  },
  handler: async (ctx, args) => {
    const { buildingIds, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    for (const buildingId of buildingIds) {
      await ctx.db.patch(buildingId, patch);
    }
  }
});

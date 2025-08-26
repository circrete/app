import { v } from 'convex/values';
import { mutation } from '../../_generated/server';

export const createGeometry = mutation({
  args: {
    type: v.string(),
    componentCategory: v.string(),
    length: v.float64(),
    crossSectionId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const geometryId = await ctx.db.insert('geometries', {
      ...args
    });
    return geometryId;
  }
});

export const editGeometry = mutation({
  args: {
    geometryId: v.id('geometries'),
    type: v.optional(v.string()),
    componentCategory: v.optional(v.string()),
    length: v.optional(v.float64()),
    crossSectionId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { geometryId, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    await ctx.db.patch(geometryId, patch);
    return { success: true };
  }
});

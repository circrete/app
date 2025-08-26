import { v } from 'convex/values';
import { mutation } from '../../_generated/server';

export const createCrossSection = mutation({
  args: {
    type: v.string(),
    crossSectionCategory: v.string(),
    height: v.float64(),
    width: v.float64(),
    concreteMaterialTypeId: v.string(),
    rebarTypeId: v.optional(v.string()),
    moment: v.float64(),
    normal: v.float64(),
    shear: v.float64(),
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
    })
  },
  handler: async (ctx, args) => {
    const crossSectionId = await ctx.db.insert('crossSections', {
      ...args
    });
    return crossSectionId;
  }
});

export const editCrossSection = mutation({
  args: {
    crossSectionId: v.id('crossSections'),
    type: v.optional(v.string()),
    crossSectionCategory: v.optional(v.string()),
    height: v.optional(v.float64()),
    width: v.optional(v.float64()),
    concreteMaterialTypeId: v.optional(v.string()),
    rebarTypeId: v.optional(v.string()),
    moment: v.optional(v.float64()),
    normal: v.optional(v.float64()),
    shear: v.optional(v.float64()),
    preStressStrandType: v.optional(
      v.object({
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
      })
    )
  },
  handler: async (ctx, args) => {
    const { crossSectionId, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    await ctx.db.patch(crossSectionId, patch);
    return { success: true };
  }
});

import { v } from 'convex/values';
import { mutation } from '../../_generated/server';

export const createMaterial = mutation({
  args: {
    materialCategory: v.string(),
    compressiveStrength: v.float64(),
    tensileStrength: v.float64(),
    density: v.float64(),
    elasticModulus: v.float64(),
    exposureClass: v.string(),
    fc0k: v.float64(),
    fc90k: v.float64(),
    ft0k: v.float64(),
    ft90k: v.float64(),
    crossSectionId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const materialId = await ctx.db.insert('materials', {
      ...args
    });
    return materialId;
  }
});

export const editMaterial = mutation({
  args: {
    materialId: v.id('materials'),
    materialCategory: v.optional(v.string()),
    compressiveStrength: v.optional(v.float64()),
    tensileStrength: v.optional(v.float64()),
    density: v.optional(v.float64()),
    elasticModulus: v.optional(v.float64()),
    exposureClass: v.optional(v.string()),
    fc0k: v.optional(v.float64()),
    fc90k: v.optional(v.float64()),
    ft0k: v.optional(v.float64()),
    ft90k: v.optional(v.float64()),
    crossSectionId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { materialId, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    await ctx.db.patch(materialId, patch);
    return { success: true };
  }
});

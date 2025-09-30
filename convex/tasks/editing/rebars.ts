import { v } from 'convex/values';
import { mutation } from '../../_generated/server';

export const createRebar = mutation({
  args: {
    rebarEntries: v.array(
      v.object({
        rebarAmount: v.float64(),
        rebarDiameter: v.float64()
      })
    ),
    rebarMaterialId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const rebarId = await ctx.db.insert('rebars', {
      type: 'RebarType',
      ...args
    });
    return rebarId;
  }
});

export const editRebar = mutation({
  args: {
    rebarId: v.id('rebars'),
    rebarEntries: v.optional(
      v.array(
        v.object({
          rebarAmount: v.float64(),
          rebarDiameter: v.float64()
        })
      )
    ),
    rebarMaterialId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { rebarId, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    await ctx.db.patch(rebarId, patch);
    return { success: true };
  }
});

export const editMultipleRebars = mutation({
  args: {
    rebarIds: v.array(v.id('rebars')),
    rebarEntries: v.optional(
      v.array(
        v.object({
          rebarAmount: v.float64(),
          rebarDiameter: v.float64()
        })
      )
    ),
    rebarMaterialId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { rebarIds, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    for (const rebarId of rebarIds) {
      await ctx.db.patch(rebarId, patch);
    }
    return { success: true };
  }
});

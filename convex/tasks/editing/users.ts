import { v } from 'convex/values';
import { mutation } from '../../_generated/server';

export const createUser = mutation({
  args: {
    name: v.string(),
    company: v.string(),
    address: v.string(),
    mail: v.string(),
    userCategory: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', {
      ...args
    });
    return userId;
  }
});

export const editUser = mutation({
  args: {
    userId: v.id('users'),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    address: v.optional(v.string()),
    mail: v.optional(v.string()),
    userCategory: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { userId, ...updateData } = args;

    // strip args that are undefined from patch object
    const patch = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== undefined));

    await ctx.db.patch(userId, patch);
    return { success: true };
  }
});

// Update your server import like this:

import { v } from 'convex/values';
import { query } from '../../_generated/server';

// Add the following function to the file:
export const getAll = query({
  args: {
    buildingId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const components = args.buildingId
      ? await ctx.db
          .query('components')
          .filter((q) => q.eq(q.field('buildingId'), args.buildingId))
          .take(1e6)
      : await ctx.db.query('components').order('desc').take(1e6);

    // Reverse the list so that it's in a chronological order.
    return components.reverse();
  }
});

// Add the following function to the file:
export const getLatest = query({
  args: {},
  handler: async (ctx) => {
    const components = await ctx.db.query('components').order('desc').take(50);
    // Reverse the list so that it's in a chronological order.
    return components.reverse();
  }
});

// Update your server import like this:

import { query } from '../../_generated/server';

// Add the following function to the file:
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const buildings = await ctx.db.query('buildings').order('desc').take(1e6);
    // Reverse the list so that it's in a chronological order.
    return buildings.reverse();
  }
});

// Add the following function to the file:
export const getLatest = query({
  args: {},
  handler: async (ctx) => {
    const buildings = await ctx.db.query('buildings').order('desc').take(50);
    // Reverse the list so that it's in a chronological order.
    return buildings.reverse();
  }
});

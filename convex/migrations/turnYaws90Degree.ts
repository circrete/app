// for all components swap the longitude and latitude

import { mutation } from '../_generated/server';

export const turnYaws90Degree = mutation({
  args: {},
  handler: async (ctx) => {
    const components = await ctx.db.query('components').collect();
    for (const component of components) ctx.db.patch(component._id, { yaw: component.yaw + 90 });
  }
});

// for all components swap the longitude and latitude

import { mutation } from '../_generated/server';

export const swapLongitudeLatitude = mutation({
  args: {},
  handler: async (ctx) => {
    const components = await ctx.db.query('components').collect();
    for (const component of components) {
      if (component.location)
        ctx.db.patch(component._id, {
          location: {
            latitude: component.location.longitude as number,
            longitude: component.location.latitude as number,
            height: component.location.height as number
          }
        });
    }
  }
});

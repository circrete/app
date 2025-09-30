// for all components swap the longitude and latitude

import { TableNames } from '../_generated/dataModel';
import { mutation } from '../_generated/server';

export const removeIdAttributes = mutation({
  args: {},
  handler: async (ctx) => {
    // const tableNames = ['components', 'crossSections', 'geometries', 'rebars', 'materials', 'users', 'buildings'];
    // for (const tableName of tableNames) {
    //   const components = await ctx.db.query(tableName as TableNames).collect();
    //   for (const component of components) {
    //     if (component.id)
    //       ctx.db.patch(component._id, {
    //         id: undefined
    //       });
    //   }
    // }
  }
});

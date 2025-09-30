// for all components swap the longitude and latitude

import { TableNames } from '../_generated/dataModel';
import { mutation } from '../_generated/server';

export const addType = mutation({
  args: {},
  handler: async (ctx) => {
    const tableNames = [
      ['materials', 'MaterialType'],
      ['users', 'UserType']
    ];
    for (const [tableName, typeName] of tableNames) {
      const components = await ctx.db.query(tableName as TableNames).collect();
      for (const component of components)
        ctx.db.patch(component._id, {
          type: typeName
        });
    }
  }
});

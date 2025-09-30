/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as migrations_addType from "../migrations/addType.js";
import type * as migrations_removeIdAttributes from "../migrations/removeIdAttributes.js";
import type * as migrations_swapLongitudeLatitude from "../migrations/swapLongitudeLatitude.js";
import type * as migrations_turnYaws90Degree from "../migrations/turnYaws90Degree.js";
import type * as queries_collect_buildings from "../queries/collect/buildings.js";
import type * as queries_collect_components from "../queries/collect/components.js";
import type * as queries_collect_crossSections from "../queries/collect/crossSections.js";
import type * as queries_collect_geometries from "../queries/collect/geometries.js";
import type * as queries_collect_materials from "../queries/collect/materials.js";
import type * as queries_collect_rebars from "../queries/collect/rebars.js";
import type * as queries_collect_users from "../queries/collect/users.js";
import type * as tasks_editing_buildings from "../tasks/editing/buildings.js";
import type * as tasks_editing_components from "../tasks/editing/components.js";
import type * as tasks_editing_crossSections from "../tasks/editing/crossSections.js";
import type * as tasks_editing_geometries from "../tasks/editing/geometries.js";
import type * as tasks_editing_materials from "../tasks/editing/materials.js";
import type * as tasks_editing_rebars from "../tasks/editing/rebars.js";
import type * as tasks_editing_users from "../tasks/editing/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "migrations/addType": typeof migrations_addType;
  "migrations/removeIdAttributes": typeof migrations_removeIdAttributes;
  "migrations/swapLongitudeLatitude": typeof migrations_swapLongitudeLatitude;
  "migrations/turnYaws90Degree": typeof migrations_turnYaws90Degree;
  "queries/collect/buildings": typeof queries_collect_buildings;
  "queries/collect/components": typeof queries_collect_components;
  "queries/collect/crossSections": typeof queries_collect_crossSections;
  "queries/collect/geometries": typeof queries_collect_geometries;
  "queries/collect/materials": typeof queries_collect_materials;
  "queries/collect/rebars": typeof queries_collect_rebars;
  "queries/collect/users": typeof queries_collect_users;
  "tasks/editing/buildings": typeof tasks_editing_buildings;
  "tasks/editing/components": typeof tasks_editing_components;
  "tasks/editing/crossSections": typeof tasks_editing_crossSections;
  "tasks/editing/geometries": typeof tasks_editing_geometries;
  "tasks/editing/materials": typeof tasks_editing_materials;
  "tasks/editing/rebars": typeof tasks_editing_rebars;
  "tasks/editing/users": typeof tasks_editing_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

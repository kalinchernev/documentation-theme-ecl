// @flow

/**
 * Describes a field with monetary information.
 * @type {BudgetItem}
 */
type BudgetItem = {
  currency: string,
  raw: string,
  value: number
};

/**
 * Describes field `project.budget`.
 * @type {Budget}
 */
type Budget = {
  eu_contrib: BudgetItem
};

/**
 * Describes a simple project.
 * @type {Project}
 */
export type Project = {
  budget: Budget,
  funding: Array<string>
};

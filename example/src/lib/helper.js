// @flow
// Disclaimer: the code below does not do anything
// It stands only for a mock to generate example documentation

import type { Project } from "../_types/Project";

/**
 * Get funding by a split
 *
 * @memberof ProjectModuleExample
 * @param {Object} funding The funding to split
 * @description Just a description.
 * @returns {Array} List of funding items
 *
 * @example
 * input => "foo; bar; baz"
 * output => ["foo", "bar", "baz"]
 */
const getFunding = funding => funding.split(";").filter(i => i);

/**
 * The main module
 *
 * @name ProjectModuleExample
 * @param {Object} input Some object to work with
 * @returns {Project} JSON matching the type fields.
 */
export default (record: Object): Project => {
  const funding = "EUR 1 000 000";

  return {
    budget: {
      eu_contrib: {
        currency: "EUR",
        raw: funding,
        value: 1000000
      }
    },
    funding: getFunding(funding)
  };
};

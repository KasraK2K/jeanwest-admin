import {
  IPagination,
  IOptions,
  IFilters,
} from "@/interfaces/others/pagination.interface";
import * as _ from "lodash";

export const paginationGenerator = (
  options: IOptions,
  filters?: IFilters
): IPagination => {
  const pagination = {
    option: options,
    filter: filters,
  };
  const filterKeys =
    pagination && pagination.filter && _.keys(pagination.filter);
  // delete empty keys
  if (filterKeys && filterKeys.length) {
    for (const key of filterKeys) {
      if (pagination.filter && pagination.filter[key]) {
        const eachFilterValue = _.values(pagination.filter[key])[0];
        if (
          !key ||
          (!eachFilterValue &&
            eachFilterValue !== false &&
            eachFilterValue !== 0)
        )
          delete pagination.filter[key];
      }
    }
  }
  // delete empty filter
  if (!pagination.filter || !Object.keys(pagination.filter).length)
    delete pagination.filter;
  return pagination;
};

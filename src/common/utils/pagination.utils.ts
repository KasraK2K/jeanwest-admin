import {
  IPagination,
  IOptions,
  IFilters,
} from "@/interfaces/others/pagination.interface";

export const paginationGenerator = (
  options: IOptions,
  filters?: IFilters
): IPagination => {
  const pagination = {
    option: options,
    filter: filters,
  };
  const filterKeys =
    pagination && pagination.filter && Object.keys(pagination.filter);
  // delete empty keys
  if (filterKeys && filterKeys.length) {
    for (const key of filterKeys)
      if (
        pagination.filter &&
        pagination.filter[key] &&
        (key === undefined || key === null)
      )
        delete pagination.filter[key];
  }
  // delete empty filter
  if (!pagination.filter || !Object.keys(pagination.filter).length)
    delete pagination.filter;
  return pagination;
};

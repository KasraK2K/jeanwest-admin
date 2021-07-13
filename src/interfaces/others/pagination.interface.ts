export interface IPagination {
  option: IOptions;
  filter?: IFilters;
}

export interface IOptions {
  page: { eq: number };
  limit: { eq: number };
}

export interface IFilters {
  [key: string]: Record<string, unknown>;
}

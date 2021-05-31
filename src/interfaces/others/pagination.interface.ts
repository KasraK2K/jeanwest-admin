export interface IPagination {
  option: IOptions;
  filter?: Record<string, unknown>;
}

interface IOptions {
  page: { eq: number };
  limit: { eq: number };
}
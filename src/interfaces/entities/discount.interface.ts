import { IGroup } from "./group.interface";

export interface IDiscount {
  name: string;
  code: string;
  reductionPrice: number;
  isPercentage: boolean;
  promotionGroup: IGroup;
  countLimit?: number;
  usageCount?: number;
  maxTotal?: number;
  minTotal?: number;
  singularity?: boolean;
  expirationDate?: string;
  startDate?: string;
}

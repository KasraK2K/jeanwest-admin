export interface IDiscount {
  name: string;
  code: string;
  reductionPrice: number;
  isPercentage: boolean;
  countLimit?: number;
  usageCount?: number;
  maxTotal?: number;
  minTotal?: number;
  description: {
    context?: string;
  };
  singularity?: boolean;
  expirationDate?: string;
  startDate?: string;
}

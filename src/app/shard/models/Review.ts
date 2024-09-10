
export interface Review {
  id: number;
  title: string;
  comment: string;
  customerName: string;
  rate: number;
  asAnonymous: boolean;
  createdAt: Date;
}

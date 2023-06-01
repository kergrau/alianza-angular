export interface Client {
  id?: number;
  sharedKey?: string;
  businessId: string;
  email: string;
  phone: number;
  dataAdded?: Date;
}

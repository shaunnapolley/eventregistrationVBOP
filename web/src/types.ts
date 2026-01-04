export type Category = {
  id: string;
  name: string;
  count: number;
  isActive?: boolean;
};

export type EventEntry = {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  formName: string;
  transactionReference: string;
  status: "draft" | "published" | "paused" | "closed";
  lastModified: string;
};

import { Category, EventEntry } from "../types";

export const categories: Category[] = [
  { id: "all", name: "All Forms", count: 24, isActive: true },
  { id: "recent", name: "Recent", count: 12 },
  { id: "drafts", name: "Drafts", count: 8 },
  { id: "templates", name: "Templates", count: 6 },
  { id: "archived", name: "Archived", count: 3 },
  { id: "events", name: "Event Forms", count: 10 },
  { id: "surveys", name: "Surveys", count: 14 },
  { id: "others", name: "Others", count: 2 },
];

export const events: EventEntry[] = [
  {
    id: "evt-1",
    name: "Event Registration 1",
    contactName: "Jane Cooper",
    contactEmail: "jane.cooper@example.com",
    formName: "Annual Gala",
    transactionReference: "TRX-20481",
    status: "draft",
    lastModified: "2024-10-11 04:15 pm",
  },
  {
    id: "evt-2",
    name: "Event Registration 2",
    contactName: "Savannah Nguyen",
    contactEmail: "savannah.nguyen@example.com",
    formName: "Community Meetup",
    transactionReference: "TRX-18532",
    status: "published",
    lastModified: "2024-10-09 01:22 pm",
  },
  {
    id: "evt-3",
    name: "Event Registration 3",
    contactName: "Annette Black",
    contactEmail: "annette.black@example.com",
    formName: "Fundraiser",
    transactionReference: "TRX-09912",
    status: "paused",
    lastModified: "2024-09-21 11:18 am",
  },
  {
    id: "evt-4",
    name: "Event Registration 4",
    contactName: "Cody Fisher",
    contactEmail: "cody.fisher@example.com",
    formName: "Workshop Series",
    transactionReference: "TRX-45298",
    status: "closed",
    lastModified: "2024-09-04 02:45 pm",
  },
];

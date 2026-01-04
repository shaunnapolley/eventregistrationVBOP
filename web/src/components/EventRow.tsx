import classNames from "classnames";
import styles from "./EventRow.module.css";
import type { EventEntry } from "../types";

type EventRowProps = {
  entry: EventEntry;
  onAction?: (action: string, id: string) => void;
};

const statusConfig: Record<
  EventEntry["status"],
  { label: string; color: string }
> = {
  draft: { label: "Draft", color: "#f97316" },
  published: { label: "Published", color: "#22c55e" },
  paused: { label: "Paused", color: "#eab308" },
  closed: { label: "Closed", color: "#64748b" },
};

const iconLabels = [
  { key: "edit", symbol: "✏️", title: "Edit form" },
  { key: "email", symbol: "✉️", title: "Send email" },
  { key: "link", symbol: "🔗", title: "Copy link" },
  { key: "duplicate", symbol: "📄", title: "Duplicate form" },
  { key: "delete", symbol: "🗑️", title: "Delete form" },
];

const EventRow = ({ entry, onAction }: EventRowProps) => {
  const { name, contactName, contactEmail, formName, transactionReference } =
    entry;
  const status = statusConfig[entry.status];

  return (
    <article className={styles.row} aria-label={`${name} row`}>
      <div>
        <div className={styles.title}>{name}</div>
        <div className={styles.meta}>{entry.lastModified}</div>
      </div>
      <div className={styles.contact}>
        <div className={styles.label}>{contactName}</div>
        <div className={styles.email}>{contactEmail}</div>
      </div>
      <div className={styles.label}>{formName}</div>
      <div className={styles.label}>{transactionReference}</div>
      <div className={styles.status}>
        <span
          className={styles.statusDot}
          style={{ backgroundColor: status.color }}
          aria-hidden="true"
        />
        {status.label}
      </div>
      <div className={styles.actions} aria-label="Row actions">
        {iconLabels.map((action) => (
          <button
            key={action.key}
            className={classNames(styles.iconButton)}
            type="button"
            aria-label={`${action.title} for ${name}`}
            title={action.title}
            onClick={() => onAction?.(action.key, entry.id)}
          >
            {action.symbol}
          </button>
        ))}
      </div>
    </article>
  );
};

export default EventRow;

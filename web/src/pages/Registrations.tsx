import { useMemo, useState } from "react";
import SidebarItem from "../components/SidebarItem";
import EventRow from "../components/EventRow";
import { categories as categoryFixtures, events as eventFixtures } from "../data/fixtures";
import type { Category, EventEntry } from "../types";
import styles from "./Registrations.module.css";

type Filters = {
  form: string;
  name: string;
  reference: string;
};

const Registrations = () => {
  const [filters, setFilters] = useState<Filters>({
    form: "",
    name: "",
    reference: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 600);
  };

  const filteredEvents = useMemo(() => {
    return eventFixtures.filter((event) => {
      const matchesCategory =
        selectedCategory === "all"
          ? true
          : selectedCategory === "drafts"
            ? event.status === "draft"
            : selectedCategory === "recent"
              ? true
              : selectedCategory === "archived"
                ? event.status === "closed"
                : true;
      const matchesForm = event.formName
        .toLowerCase()
        .includes(filters.form.toLowerCase());
      const matchesName = event.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesReference = event.transactionReference
        .toLowerCase()
        .includes(filters.reference.toLowerCase());

      return matchesCategory && matchesForm && matchesName && matchesReference;
    });
  }, [filters.form, filters.name, filters.reference, selectedCategory]);

  const stateLabel = isLoading
    ? "Loading forms..."
    : filteredEvents.length === 0
      ? "No forms match your search yet. Try adjusting the filters."
      : "";

  const renderSidebar = (items: Category[]) =>
    items.map((category) => (
      <SidebarItem
        key={category.id}
        category={{
          ...category,
          isActive: selectedCategory === category.id,
        }}
        onSelect={setSelectedCategory}
      />
    ));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Registrations</h1>
          <span className={styles.titleBadge}>{eventFixtures.length}</span>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.button}
            aria-label="Export payment report"
          >
            Payment Report
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.primary}`}
            aria-label="Build a new form"
          >
            Build New Form
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Close dialog"
            title="Close"
          >
            ×
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Form categories">
          {renderSidebar(categoryFixtures)}
        </aside>

        <main className={styles.main}>
          <div className={styles.searchBar}>
            <input
              aria-label="Filter by form name"
              className={styles.input}
              placeholder="Form"
              value={filters.form}
              onChange={(event) =>
                handleFilterChange("form", event.target.value)
              }
            />
            <input
              aria-label="Filter by name"
              className={styles.input}
              placeholder="Name"
              value={filters.name}
              onChange={(event) =>
                handleFilterChange("name", event.target.value)
              }
            />
            <input
              aria-label="Filter by transaction reference"
              className={styles.input}
              placeholder="Transaction Reference"
              value={filters.reference}
              onChange={(event) =>
                handleFilterChange("reference", event.target.value)
              }
            />
            <button
              type="button"
              className={`${styles.button} ${styles.primary}`}
              aria-label="Search forms"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className={styles.list}>
            <div className={styles.listHeader}>
              <span>Form Name</span>
              <span>Contact</span>
              <span>Form</span>
              <span>Trans. Ref.</span>
              <span>Status</span>
            </div>

            {stateLabel ? (
              <div className={styles.state}>{stateLabel}</div>
            ) : (
              filteredEvents.map((entry) => (
                <EventRow
                  key={entry.id}
                  entry={entry}
                  onAction={(action, id) => {
                    console.info(`Action ${action} on ${id}`);
                  }}
                />
              ))
            )}
          </div>

          <div className={styles.listFooter} aria-label="Pagination">
            <span className={styles.pill}>1 of 1</span>
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.dotActive}`} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Registrations;

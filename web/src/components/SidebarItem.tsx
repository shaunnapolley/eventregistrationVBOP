import classNames from "classnames";
import styles from "./SidebarItem.module.css";
import type { Category } from "../types";

type SidebarItemProps = {
  category: Category;
  onSelect?: (categoryId: string) => void;
};

const SidebarItem = ({ category, onSelect }: SidebarItemProps) => {
  const { id, name, count, isActive } = category;

  return (
    <button
      className={classNames(styles.item, { [styles.active]: isActive })}
      type="button"
      aria-pressed={isActive}
      aria-label={`${name} (${count} forms)`}
      onClick={() => onSelect?.(id)}
    >
      <span className={styles.label}>
        <span className={styles.iconCircle}>{name.charAt(0)}</span>
        {name}
      </span>
      <span className={styles.pill}>{count}</span>
    </button>
  );
};

export default SidebarItem;

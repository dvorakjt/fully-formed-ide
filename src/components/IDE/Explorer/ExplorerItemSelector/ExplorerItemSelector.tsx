import Image from "next/image";
import { calculateLeftPadding } from "@/util/explorer/calculate-left-padding";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { MouseEventHandler } from "react";
import styles from "./styles.module.scss";

interface ExplorerItemSelectorProps {
  itemName: string;
  iconSrc: string | StaticImport;
  iconAlt: string;
  indentation: number;
  showName: boolean;
  ["aria-label"]: string;
  onClick: MouseEventHandler;
  onDoubleClick?: MouseEventHandler;
}

export function ExplorerItemSelector({
  itemName,
  iconSrc,
  iconAlt,
  indentation,
  showName,
  ["aria-label"]: ariaLabel,
  onClick,
  onDoubleClick,
}: ExplorerItemSelectorProps) {
  const iconSize = parseInt(styles.iconSize);
  const outerSpacing = parseInt(styles.outerSpacing);
  const innerSpacing = parseInt(styles.innerSpacing);
  const paddingLeft = calculateLeftPadding({
    depth: indentation,
    iconSize,
    outerSpacing,
    innerSpacing,
  });

  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      aria-label={ariaLabel}
      className={showName ? styles.selectorWithName : styles.selector}
      style={{ paddingLeft }}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={iconSize}
        height={iconSize}
        priority
      />
      {showName && <span className={styles.name}>{itemName}</span>}
    </button>
  );
}

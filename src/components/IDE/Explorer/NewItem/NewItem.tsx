import Image from 'next/image';
import { ExplorerItemNameEditor } from '../ExplorerItemNameEditor';
import { calculateExplorerItemLeftPadding } from '@/util/calculate-explorer-item-left-padding';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import styles from './styles.module.scss';

interface NewItemProps {
  inputLabel: string;
  siblingNames: string[];
  iconSrc: string | StaticImport;
  iconAlt: string;
  indentation: number;
  createItem(name: string): void;
  cancelCreate(): void;
}

export function NewItem(props: NewItemProps) {
  const iconSize = parseInt(styles.iconSize);
  const outerSpacing = parseInt(styles.outerSpacing);
  const innerSpacing = parseInt(styles.innerSpacing);
  const paddingLeft = calculateExplorerItemLeftPadding({
    indentation: props.indentation,
    iconSize,
    outerSpacing,
    innerSpacing,
  });

  return (
    <div className={styles.newItem} style={{ paddingLeft }}>
      <Image
        src={props.iconSrc}
        alt={props.iconAlt}
        width={iconSize}
        height={iconSize}
      />
      <ExplorerItemNameEditor
        itemName=""
        siblingNames={props.siblingNames}
        inputLabel={props.inputLabel}
        confirmChanges={props.createItem}
        cancelChanges={props.cancelCreate}
      />
    </div>
  );
}

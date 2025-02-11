import Image from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import type { MouseEventHandler } from 'react';
import styles from './styles.module.scss';

interface Control {
  iconSrc: string | StaticImport;
  label: string;
  onClick: MouseEventHandler;
  disabled?: boolean;
}

interface ExplorerItemControlsProps {
  controls: Control[];
}

export function ExplorerItemControls({ controls }: ExplorerItemControlsProps) {
  return (
    <menu className={styles.controls}>
      {controls.map(control => {
        return (
          <li key={control.label}>
            <button onClick={control.onClick} disabled={control.disabled}>
              <Image
                src={control.iconSrc}
                alt={control.label}
                height={parseInt(styles.iconSize)}
                width={parseInt(styles.iconSize)}
                priority
              />
            </button>
          </li>
        );
      })}
    </menu>
  );
}

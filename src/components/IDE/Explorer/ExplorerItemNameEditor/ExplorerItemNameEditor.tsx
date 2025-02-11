'use client';
import { useRef, useId, useEffect, type KeyboardEventHandler } from 'react';
import {
  Field,
  StringValidators,
  usePipe,
  useUserInput,
  ValidityUtils,
} from 'fully-formed';
import { UniquenessValidator } from './uniqueness-validator';
import styles from './styles.module.scss';

interface ExplorerItemNameEditorProps {
  itemName: string;
  siblingNames: string[];
  inputLabel: string;
  confirmChanges: (name: string) => void;
  cancelChanges: () => void;
}

export function ExplorerItemNameEditor({
  itemName,
  siblingNames,
  inputLabel,
  confirmChanges,
  cancelChanges,
}: ExplorerItemNameEditorProps) {
  const inputId = useId();

  const fieldRef = useRef(
    new Field({
      name: 'editMenuItemName',
      defaultValue: itemName,
      validators: [
        StringValidators.required({
          invalidMessage: 'Please enter a filename.',
          trimBeforeValidation: true,
        }),
        new UniquenessValidator(siblingNames),
      ],
    }),
  );

  const inputProps = useUserInput(fieldRef.current);

  const inputClassName = usePipe(
    fieldRef.current,
    ({ hasBeenModified, validity }) => {
      return ValidityUtils.isValid(validity) || !hasBeenModified ?
          styles.input
        : styles.invalidInput;
    },
  );

  const errorMessage = usePipe(
    fieldRef.current,
    ({ hasBeenModified, messages }) => {
      return hasBeenModified && messages[0]?.text ? messages[0].text : '';
    },
  );

  const errorMessageId = `${inputId}-error`;

  const handleKeyDown: KeyboardEventHandler = e => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      stopEditing();
    }
  };

  function stopEditing() {
    if (!ValidityUtils.isValid(fieldRef.current)) {
      cancelChanges();
    } else {
      confirmChanges(fieldRef.current.state.value.trim());
    }
  }

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const targetIsInput =
        e.target && (e.target as HTMLElement).id === inputId;

      if (!targetIsInput) {
        stopEditing();
      }
    }

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  });

  return (
    <div className={styles.container}>
      <input
        name={fieldRef.current.name}
        id={inputId}
        type="text"
        {...inputProps}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        aria-label={inputLabel}
        aria-describedby={errorMessageId}
        aria-invalid={!!errorMessage}
        aria-required
        autoFocus
        autoComplete="none"
        spellCheck={false}
      />
      <span id={errorMessageId} role="alert" className={styles.error}>
        {errorMessage}
      </span>
    </div>
  );
}

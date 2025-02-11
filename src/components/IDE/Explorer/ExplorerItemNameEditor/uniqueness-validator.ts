import { ValidatorResult, Validity, type IValidator } from 'fully-formed';

export class UniquenessValidator implements IValidator<string> {
  private menuItemNames: Set<string>;

  constructor(menuItemNames: string[]) {
    this.menuItemNames = new Set(menuItemNames);
  }

  validate(value: string): ValidatorResult {
    value = value.trim();

    if (this.menuItemNames.has(value)) {
      return {
        validity: Validity.Invalid,
        message: {
          text: `File or folder "${value}" already exists in the current directory.`,
          validity: Validity.Invalid,
        },
      };
    }

    return {
      validity: Validity.Valid,
    };
  }
}

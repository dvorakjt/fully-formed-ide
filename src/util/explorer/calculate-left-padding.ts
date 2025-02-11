interface CalculateLeftPaddingParams {
  depth: number;
  iconSize: number;
  outerSpacing: number;
  innerSpacing: number;
}

export function calculateLeftPadding({
  depth,
  iconSize,
  outerSpacing,
  innerSpacing,
}: CalculateLeftPaddingParams) {
  return `${(iconSize + innerSpacing) * depth + outerSpacing}px`;
}

/**
 * CodeTales color palette
 */

export const COLORS = {
  DARK: '#1B1919',
  PINK: '#DB2D69',
  WHITE: '#FFF'
};

/**
 * Interface for a theme color palette
 */
export interface ColorPalette {
  dark: string;
  pink: string;
  white: string;
}

/**
 * CodeTales color palette object
 */
export const colorPalette: ColorPalette = {
  dark: COLORS.DARK,
  pink: COLORS.PINK,
  white: COLORS.WHITE
};

/**
 * Helper function to get a color by its name
 * @param colorName Name of the color (dark, pink, white)
 * @returns The color code or undefined if not found
 */
export function getColor(colorName: keyof ColorPalette): string | undefined {
  return colorPalette[colorName];
}
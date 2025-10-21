/**
 * Gallery View Settings
 * Manages user preferences for gallery display (compact mode, size, fit mode)
 */

export type SizeMode = 'small' | 'medium' | 'large' | 'xlarge';
export type FitMode = 'contain' | 'cover';

export interface GallerySettings {
  compact: boolean;  // Compact mode: no gaps, metadata on hover
  size: SizeMode;
  fit: FitMode;
}

const STORAGE_KEY = 'comfyui-browser-gallery-settings';

const DEFAULT_SETTINGS: GallerySettings = {
  compact: false,
  size: 'medium',
  fit: 'contain',
};

/**
 * Load gallery settings from localStorage
 */
export function loadGallerySettings(): GallerySettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        compact: parsed.compact ?? DEFAULT_SETTINGS.compact,
        size: parsed.size || DEFAULT_SETTINGS.size,
        fit: parsed.fit || DEFAULT_SETTINGS.fit,
      };
    }
  } catch (error) {
    console.error('Failed to load gallery settings:', error);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Save gallery settings to localStorage
 */
export function saveGallerySettings(settings: GallerySettings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save gallery settings:', error);
  }
}

/**
 * Get Tailwind CSS classes for grid based on settings
 */
export function getGridClasses(settings: GallerySettings): string {
  const classes: string[] = ['grid'];

  // Size (columns)
  switch (settings.size) {
    case 'small':
      classes.push('grid-cols-6', 'lg:grid-cols-8');
      break;
    case 'medium':
      classes.push('grid-cols-4', 'lg:grid-cols-6');
      break;
    case 'large':
      classes.push('grid-cols-2', 'lg:grid-cols-4');
      break;
    case 'xlarge':
      classes.push('grid-cols-1', 'lg:grid-cols-2');
      break;
  }

  // Gap (compact vs normal)
  if (settings.compact) {
    classes.push('gap-0');
  } else {
    classes.push('gap-2');
  }

  return classes.join(' ');
}

/**
 * Get item height class based on size and mode
 * Compact mode: square ratio (1:1) except XL which is 3:4
 * Normal mode: taller heights for better viewing
 */
export function getItemHeightClass(size: SizeMode, compact: boolean): string {
  if (compact) {
    // Compact mode: square containers for most sizes, 3:4 for XL
    switch (size) {
      case 'small':
        // Grid is 6-8 cols, so each item ~12-16% width → square height
        return 'aspect-square';
      case 'medium':
        // Grid is 4-6 cols, so each item ~16-25% width → square height
        return 'aspect-square';
      case 'large':
        // Grid is 2-4 cols, so each item ~25-50% width → square height
        return 'aspect-square';
      case 'xlarge':
        // Grid is 1-2 cols, so each item ~50-100% width → 3:4 ratio
        return 'aspect-[3/4]';
    }
  } else {
    // Normal mode: fixed heights (S is perfect, M/L/XL need more height)
    switch (size) {
      case 'small':
        return 'h-32 sm:h-40';  // Small: perfect as is
      case 'medium':
        return 'h-48 sm:h-64';  // Medium: increased from h-40/h-56
      case 'large':
        return 'h-64 sm:h-96';  // Large: increased from h-56/h-80
      case 'xlarge':
        return 'h-96 sm:h-[32rem]';  // XL: increased from h-80/h-96
    }
  }
}

/**
 * Get padding class based on compact mode
 */
export function getPaddingClass(compact: boolean): string {
  return compact ? 'p-0' : 'p-2';
}

/**
 * Get object-fit class for images/videos
 */
export function getFitClass(fit: FitMode): string {
  return fit === 'contain' ? 'object-contain' : 'object-cover';
}

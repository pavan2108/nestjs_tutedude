import { SetMetadata } from '@nestjs/common';

// Metadata key for public routes
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route as public, skipping global auth guard
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

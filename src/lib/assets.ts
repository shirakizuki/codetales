// Import assets from the assets directory
import codetalesLogo from '../assets/codetales.png';
import reactLogo from '../assets/react.svg';

// Define public asset URLs
const publicAssetBaseUrl = import.meta.env.VITE_BASE_URL;

/**
 * Interface defining project assets
 */
interface DefineAssets {
    images: {
        codetalesLogo: string;
        reactLogo: string;
    };
    icons: {
        codetalesIco: string;
        viteLogo: string;
    };
}

/**
 * Assets object with all project assets
 */
export const assets: DefineAssets = {
    images: {
        codetalesLogo,
        reactLogo,
    },
    icons: {
        codetalesIco: `${publicAssetBaseUrl}codetales.ico`,
        viteLogo: `${publicAssetBaseUrl}vite.svg`,
    },
};

/**
 * Helper function to get an asset by path
 * @param path Path to the asset (e.g., 'images.codetalesLogo')
 * @returns The asset or undefined if not found
 */
export function getAsset(path: string): string | undefined {
    const parts = path.split('.');
    let result: any = assets;
    
    for (const part of parts) {
        if (result[part] === undefined) {
            return undefined;
        }
        result = result[part];
    }
    
    return result;
}
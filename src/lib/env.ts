interface ImportMetaEnv {
    [key: string]: string | undefined;
}

declare global {
    interface ImportMeta extends Readonly<{
        env: ImportMetaEnv;
    }> {}
}

function getEnvironment(key: string): string {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
}

console.log('ASDASD');

export const env = {
    firebaseApiKey: getEnvironment('VITE_FIREBASE_API_KEY'),
    firebaseAuthDomain: getEnvironment('VITE_FIREBASE_AUTH_DOMAIN'),
    firebaseProjectId: getEnvironment('VITE_FIREBASE_PROJECT_ID'),
    firebaseStorageBucket: getEnvironment('VITE_FIREBASE_STORAGE_BUCKET'),
    firebaseMessagingSenderId: getEnvironment('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    firebaseAppId: getEnvironment('VITE_FIREBASE_APP_ID'),
    firebaseMeasurementId: getEnvironment('VITE_FIREBASE_MEASUREMENT_ID'),
}
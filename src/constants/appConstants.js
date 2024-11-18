export const DEV_ENVIRONMENT = false;

export const DB_URL = DEV_ENVIRONMENT
    ? "http://127.0.0.1:5000/"
    : "https://two5id-hof-backend.onrender.com/" //TODO: Input the actual URL here
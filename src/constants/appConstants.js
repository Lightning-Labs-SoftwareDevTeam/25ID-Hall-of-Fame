export const DEV_ENVIRONMENT = true;

export const DB_URL = DEV_ENVIRONMENT
    ? "http://127.0.0.1:5000/"
    : "http://127.0.0.1:5000/" //TODO: Input the actual URL here
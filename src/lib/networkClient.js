import { DB_URL } from "../constants/appConstants";

const acceptableResponseCodes = [200, 201]

async function NetworkRequest({ urlExtension, method, headers = {}, body = null }) {
    try {
        const response = await fetch(`${DB_URL}${urlExtension}`, {
            method: method,
            headers: headers,
            body: body
        });

        if (!acceptableResponseCodes.includes(response.status)) {
            console.log(response)
            let errorResponse = await response.json();
            let error = errorResponse.error;
            console.log(error)
            if (error) {
                throw(error);
            } else {
                throw(errorResponse)
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw(error);
    }
}

export default NetworkRequest;
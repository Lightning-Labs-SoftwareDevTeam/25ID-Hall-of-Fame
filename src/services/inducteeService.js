import { GET, POST, PUT, DELETE, AUTHORIZATION_HEADER } from '../lib/networkRequestConstants';
import NetworkRequest from '../lib/networkClient';

const urlExtension = '/inductees'

const inducteeService = {
    async getInductees() {
        try {
            const data = await NetworkRequest({
                urlExtension: urlExtension,
                method: GET
            })

            return data;
        } catch (error) {
            throw(error);
        }
    },

    async deleteInductee(token, id) {
        const headers = {
            ...AUTHORIZATION_HEADER(token)
        }
        try {
            await NetworkRequest({
                urlExtension: `${urlExtension}/${id}`,
                method: DELETE,
                headers: headers
            })

            return true
        } catch (error) {
            throw(error)
        }
    },

    async addInductee(token, inductee) {
        const headers = {
            ...AUTHORIZATION_HEADER(token)
        }
        try {
            const data = await NetworkRequest({
                urlExtension: `${urlExtension}`,
                method: PUT,
                headers: headers,
                body: inductee.jsonify() //TODO: This needs to be defined
            })

            return data
        } catch (error) {
            throw(error);
        }
    },

    async editInductee(token, id, inductee) {
        const headers = {
            ...AUTHORIZATION_HEADER(token)
        }
        try {
            const data = await NetworkRequest({
                urlExtension: `${urlExtension}/${id}`,
                method: POST,
                headers: headers,
                body: inductee.jsonify()
            })

            return data
        } catch (error) {
            throw(error);
        }
    }
}

export default inducteeService;
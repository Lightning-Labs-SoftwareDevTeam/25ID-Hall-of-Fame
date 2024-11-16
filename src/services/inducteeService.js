import { GET, POST, PUT, DELETE, AUTHORIZATION_HEADER, FORM_DATA_HEADER } from '../lib/networkRequestConstants';
import NetworkRequest from '../lib/networkClient';
import InducteeDTO from '../dtos/inducteeDTO/inducteeDTO';

const urlExtension = 'inductees'

const inducteeService = {
    async getInductees() {
        try {
            const data = await NetworkRequest({
                urlExtension: urlExtension,
                method: GET
            })

            const inducteeDTOs = []
            for (const inductee of data) {
                const inducteeDTO = InducteeDTO.fromData(inductee);
                inducteeDTOs.push(inducteeDTO);
            }
            console.log(inducteeDTOs);

            return inducteeDTOs;
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

            return true;
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
                method: POST,
                headers: headers,
                body: await inductee.createBody()
            })

            return data;
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
                method: PUT,
                headers: headers,
                body: await inductee.createBody()
            })

            return data;
        } catch (error) {
            throw(error);
        }
    }
}

export default inducteeService;
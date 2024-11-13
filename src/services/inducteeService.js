import { GET, POST, PUT, DELETE } from '../lib/networkRequestConstants';
import NetworkRequest from '../lib/networkClient';

const inducteeService = {
    async getInductees() {
        try {
            const data = await NetworkRequest({
                urlExtension: '/inductees',
                method: GET
            })

            return data;
        } catch (error) {
            throw(new Error(error));
        }
    }
}

export default inducteeService;
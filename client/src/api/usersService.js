import { session } from './axiosConfig';


export const getUser = async () => {
    try {
        const response = await session.get("/LoginApp");
        return response;
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
};
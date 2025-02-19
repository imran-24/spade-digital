import axios from 'axios';



export const getRooms = async () => {
    try {
        const response = await axios.get("/api/rooms");
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Network response was not ok");
    }
};
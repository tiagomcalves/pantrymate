import axios from "axios";

export const fetchAlerts = async () => {

    const URL_DISPENSAALERTASDATA = "http://localhost:8000/products/api/items-dispensa/alertas/";

    try {
        const response = await axios.get(URL_DISPENSAALERTASDATA, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

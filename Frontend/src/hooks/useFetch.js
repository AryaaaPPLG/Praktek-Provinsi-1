import { useState, useEffect } from "react";
import api from "../Api";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await api.get(url);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Terjadi Kesalahan");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return  { data, loading, error }
}
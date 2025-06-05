import axios from "axios";
import { useEffect, useState } from "react";

export default function Ip(){
    const [ip, setIp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        // Fetch IP address using a third-party API (e.g., ipify)
        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                setIp(response.data.ip);
                setLoading(false);
            })
            .catch((err) => {
                setError("Could not fetch IPv4 address.");
                console.error(err);
              });
    }, []);

    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    return(
        <>{ip}</>
    )
}
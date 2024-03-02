import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FindUser() {
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/forgotpassword/${username}/findUser`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                if (data) {
                    // Handle successful data retrieval
                    localStorage.clear();
                    localStorage.setItem("userAuth", JSON.stringify(data));

                    navigate(`/`);
                }
            } catch (error) {
                // Handle errors during data fetching
                console.error('Error during data fetching:', error.message);
            }
        };

        fetchData();
    }, [username, navigate]);

    return <div></div>;
}
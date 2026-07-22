import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchVehicles = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {

                const response = await api.get("/vehicles", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setVehicles(response.data);

            } catch (error) {

                console.error(error);

                setError("Unable to load vehicles");
            }
        };

        fetchVehicles();

    }, [navigate]);

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div>

            <h1>PowerGrid Dashboard</h1>

            <button onClick={handleLogout}>
                Logout
            </button>

            <h2>Vehicle List</h2>

            {error && <p>{error}</p>}

            <table border="1">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Fuel Type</th>
                </tr>
                </thead>

                <tbody>

                {vehicles.map((vehicle) => (

                    <tr key={vehicle.id}>

                        <td>{vehicle.id}</td>
                        <td>{vehicle.brand}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.price}</td>
                        <td>{vehicle.color}</td>
                        <td>{vehicle.fuelType}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;
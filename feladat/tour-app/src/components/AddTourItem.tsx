import { useState, useEffect } from "preact/hooks";
import "./AddTourItem.css";
import { route } from "preact-router";

// Állapotok az űrlap mezőihez
const AddTourItem = ({ onSave }) => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [date, setDate] = useState("");
    const [distance, setDistance] = useState("");
    const [newTours, setNewTours] = useState([]); // Újonnan hozzáadott túrák
    const [storedTours, setStoredTours] = useState([]);  // Tárolt túrák

    // LocalStorage-ból betöltjük az adatokat
    useEffect(() => {
        const storedTours = JSON.parse(localStorage.getItem("tours")) || [];
        setStoredTours(storedTours);
    }, []);

    // Maximális ID meghatározása a teljes lista alapján
    const allTours = [...storedTours, ...newTours];
    const maxId = allTours.length > 0 ? Math.max(...allTours.map(t => t.id)) : 0;

    // Új túra hozzáadása callback függvény
    const handleAddTour = () => {
        if (name && location && description && image && date && distance) { // Ha ki van töltve minden mező...
            const newTour = {
                id: maxId + 1,  // Az új ID mindig egyel nagyobb, mint a legnagyobb meglévő ID
                name: name,
                location: location,
                description: description,
                image: image,
                date: date,
                distance: distance
            };
            /* Az alábbi új túrákat látja a felhasználó az űrlapon a "Hozzáadott túrák" listában. Ezek még nem kerültek bele a localStorage-ba véglegesen.
            Egyszerre többet is hozzáadhat.
            Ha a felhasználó mégsem akarja elmenteni őket, itt még megnyomhatja a "Mégse" gombot, és nem történik mentés.*/
            const updatedTours = [...newTours, newTour];
            setNewTours(updatedTours);

            // Input mezők ürítése
            setName("");
            setLocation("");
            setDescription("");
            setImage("");
            setDate("");
            setDistance("");
        } else { // Hiányzó adat esetén alert
            alert("Kérlek töltsd ki az összes mezőt!");
        }
    };

    // Új túrák mentése callback függvény
    const handleSaveTours = () => {
        if (newTours.length > 0) {
            // Az összes túra (új túrák + tárolt túrák) összevonása
            const allTours = [...storedTours, ...newTours];
            localStorage.setItem("tours", JSON.stringify(allTours)); // Frissítjük a LocalStorage-t
            onSave(allTours); // Meghívja az App-beli addTours-t
        } else {
            alert("Nincs hozzáadott túra a mentéshez!");
        }
    };
    // Alábbiakat maga az AddTourItem komponens adja vissza (= kirendereli a formot)
    return (
        <div class="add-tour-form">
            <h2>Új túra hozzáadása</h2>
            <div class="form-group">
                <label htmlFor="name">Túra neve:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName((e.target as HTMLInputElement).value)}
                    placeholder="Túra neve"
                />
            </div>

            <div class="form-group">
                <label htmlFor="location">Helyszín:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation((e.target as HTMLInputElement).value)}
                    placeholder="Helyszín"
                />
            </div>

            <div class="form-group">
                <label htmlFor="description">Leírás:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                    placeholder="Leírás"
                />
            </div>

            <div class="form-group">
                <label htmlFor="image">Kép URL:</label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage((e.target as HTMLInputElement).value)}
                    placeholder="Kép URL"
                />
            </div>

            <div class="form-group">
                <label htmlFor="date">Túra dátuma:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate((e.target as HTMLInputElement).value)}
                />
            </div>

            <div class="form-group">
                <label htmlFor="distance">Túra távja:</label>
                <input
                    type="text"
                    id="distance"
                    value={distance}
                    onChange={(e) => setDistance((e.target as HTMLInputElement).value)}
                    placeholder="Túra távja"
                />
            </div>

            <div class="form-buttons">
                <button onClick={handleAddTour}>Túra hozzáadása</button>
                <button onClick={handleSaveTours}>Mentés</button>
                <button class="cancel-button" onClick={() => { route(`/tours/`) }}>Mégse</button>
            </div>

            <div>
                <h3>Hozzáadott túrák:</h3>
                {newTours.length > 0 ? (
                    <ul>
                        {newTours.map((tour) => (
                            <li key={tour.id}>
                                <strong>{tour.name}</strong> - {tour.location}
                                <br />
                                {tour.description}
                                <br />
                                <em>Dátum: {tour.date}</em>
                                <br />
                                <em>Táv: {tour.distance}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nincsenek hozzáadott túrák.</p>
                )}
            </div>
        </div>
    );
};

export default AddTourItem;
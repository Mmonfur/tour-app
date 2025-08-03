import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import "./TourDetails.css";

const TourDetails = ({ id, onDelete, onSave, editMode: propEditMode }) => {
    console.log("TourDetails komponens renderelve id:", id);

    const tourId = parseInt(id, 10);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(propEditMode || false);
    const [tour, setTour] = useState(null);
    const [originalTour, setOriginalTour] = useState(null);

    useEffect(() => {
        console.log("Tour keresése az id alapján:", tourId);

        // Betöltjük a helyi tárolóból tárolt túrákat (ne hagyjuk, hogy undefined vagy null legyen)
        const storedTours = JSON.parse(localStorage.getItem("tours") || "[]");

        // Keresés a tárolt túrák között
        const foundTour = storedTours.find((t) => t.id === tourId);

        if (foundTour) {
            console.log("Tour megtalálva:", foundTour);
            setTour(foundTour);
        } else {
            console.log("Nincs ilyen tour az adatokban.");
        }
    }, [tourId]);

    if (!tour) {
        return <p>Tour not found.</p>;
    }

    const formattedDate = tour.date
        ? new Date(tour.date).toLocaleDateString("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Nincs megadva dátum";

    return (
        <div class="tour-details">
            <h2>{editMode ? "Túra szerkesztése" : tour.name}</h2>
            {editMode ? (
                <div >
                    <div class="form-group">
                        <label htmlFor="name">Túra neve:</label>
                        <input
                            type="text"
                            id="name"
                            value={tour.name}
                            onChange={(e: Event) => setTour({ ...tour, name: (e.target as HTMLInputElement).value })}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="location">Helyszín:</label>
                        <input
                            type="text"
                            id="location"
                            value={tour.location}
                            onChange={(e: Event) => setTour({ ...tour, location: (e.target as HTMLInputElement).value })}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="image">Kép URL:</label>
                        <input
                            type="text"
                            id="image"
                            value={tour.image}
                            onChange={(e: Event) => setTour({ ...tour, image: (e.target as HTMLInputElement).value })}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="description">Leírás:</label>
                        <textarea
                            id="description"
                            value={tour.description}
                            onChange={(e: Event) => setTour({ ...tour, description: (e.target as HTMLInputElement).value })}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="date">Dátum:</label>
                        <input
                            type="date"
                            id="date"
                            value={tour.date}
                            onChange={(e: Event) => setTour({ ...tour, date: (e.target as HTMLInputElement).value })}
                        />
                    </div>

                    <div class="form-group">
                        <label htmlFor="distance">Táv:</label>
                        <input
                            type="text"
                            id="distance"
                            value={tour.distance}
                            onChange={(e: Event) => setTour({ ...tour, name: (e.target as HTMLInputElement).value })}
                        />
                    </div>

                    <div class="form-buttons">
                        <button onClick={() => { onSave(tour); setEditMode(false); route(`/tours/${tour.id}`); }}>
                            Mentés
                        </button>
                        <button class="cancel-button" onClick={() => { 
                            if (originalTour) { setTour(originalTour); } 
                            setEditMode(false); 
                            route(`/tours/${tour.id}`); 
                        }}>
                            Mégse
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <img src={tour.image} alt={tour.name} class="tour-image" />
                    <div class="tour-info">
                        <span><i class="fas fa-map-marker-alt"></i> {tour.location}</span>
                        <span><i class="fas fa-calendar-alt"></i> {formattedDate}</span>
                        <span><i class="fas fa-random"></i> Táv: {tour.distance}</span>
                    </div>
                    <hr class="tour-divider" />
                    <p class="tour-description">{tour.description}</p>
                    <button class="nav-button bg-primary" onClick={() => route("/")}>
                        <i class="fas fa-list"></i>
                    </button>
                    <button class="delete-button bg-danger" onClick={() => { 
                        console.log("Modális megnyitása törléshez.");
                        setShowModal(true); 
                    }}><i class="fas fa-trash"></i>
                    </button>
                    <button class="bg bg-success" onClick={() => {
                        console.log("Szerkesztési mód aktiválása.");
                        setEditMode(true);
                        setOriginalTour(tour); // Eredeti adatok mentése
                        route(`/tours/${tour.id}/edit`)
                    }}><i class="fas fa-edit"></i>                     
                    </button>

                    {showModal && (
                        <div class="modal">
                            <div class="modal-content">
                                <h4>Biztos, hogy törölni szeretnéd ezt a túrát?</h4>
                                <button class="bg bg-danger" onClick={() => onDelete(tour.id)}>Igen</button>
                                <button class="bg bg-secondary" onClick={() => {
                                    console.log("Törlés megszakítva.");
                                    setShowModal(false);
                                }}>Mégse</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TourDetails;
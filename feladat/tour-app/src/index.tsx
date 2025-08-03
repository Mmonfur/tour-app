import "bootstrap/dist/css/bootstrap.min.css";
import { render } from 'preact';
import { Router, Route, route } from 'preact-router';
import Header from "./components/Header";
import TourList from "./components/TourList";
import TourDetails from "./components/TourDetails";
import AddTourItem from "./components/AddTourItem";
import NavBar from "./components/NavBar";
import { useState } from "preact/hooks";
import { tours as initialTours } from "./data/tours";  // Kezdeti túrák importálása
import { navigate } from "wouter/use-browser-location";

export function App() {

    const [tours, setTours] = useState(() => {
        // Ellenőrizzük, hogy van-e már mentett túra a localStorage-ban
        const storedTours = JSON.parse(localStorage.getItem("tours") || "[]");
        if (storedTours.length === 0) {
            // Ha nincs mentett túra, akkor beletesszük a tours tömböt
            localStorage.setItem("tours", JSON.stringify(initialTours));
            return initialTours;
        }
        return storedTours;  // Ha van, betöltjük a helyi tárolóból
    });

    // Végleges mentés a localStorage-ba
    const addTours = (newTours) => {
        const updatedTours = [...tours];

        newTours.forEach((newTour) => {
            if (!updatedTours.some((tour) => tour.id === newTour.id)) {
                updatedTours.push(newTour);  // Csak új túra kerül hozzáadásra
            }
        });

        setTours(updatedTours);
        localStorage.setItem("tours", JSON.stringify(updatedTours));  // Az új listát elmentjük
        route('/tours');  // Navigálás a túrák listájára
    };

    // Handle save function, amit a TourDetails komponens hív
    const handleSave = (updatedTour) => {
        setTours(prevTours => {
            // A frissített túrák listájának elkészítése
            const updatedTours = prevTours.map(tour => {
                if (tour.id === updatedTour.id) {
                    return updatedTour;  // A módosított túra
                }
                return tour;  // A nem módosított túrák
            });

            // Frissítjük a localStorage-t
            localStorage.setItem("tours", JSON.stringify(updatedTours));
    
            // Frissítjük az aktuális túrák listáját
            setTours(updatedTours);  // Frissítjük az aktuális túrák listáját
    
            // Navigáljunk a módosított túrához a szerkesztési oldalra
            navigate(`/tours/${updatedTour.id}/edit`);
    
            return updatedTours;
        }); 
    };

    // Handle delete function, amit a TourDetails komponens hív
    const handleDelete = (tourId) => {
        // Töröljük a túrát a tours állapotból
        const updatedTours = tours.filter((tour) => tour.id !== tourId);
        setTours(updatedTours);  // Frissítjük a state-et

        // Frissítjük a localStorage-t
        localStorage.setItem("tours", JSON.stringify(updatedTours));

        // Navigálás a /tours oldalra miután az állapot frissült
        route("/tours");
    };

    return (
        <div>
            <Header />
            <NavBar />
            <Router>
                <Route path="/" component={TourList} tours={tours} />
                <Route path="/tours" component={TourList} tours={tours}/>
                <Route path="/tours/:id" component={TourDetails} onSave={handleSave} onDelete={handleDelete} />
                {/*a TourDetails komponens megkapja az onSave propot, amely a handleSave függvényre mutat.*/ }
                <Route path="/tours/:id/edit" component={TourDetails} onSave={handleSave} onDelete={handleDelete} /> 
                <Route path="/tours/new" component={AddTourItem} onSave={addTours} />
            </Router>
        </div>
    );
}

render(<App />, document.getElementById('app'));
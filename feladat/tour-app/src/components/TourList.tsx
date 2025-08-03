import { useState } from "preact/hooks";
import { route } from "preact-router";
import "./TourList.css";

const TourList = ({ tours }) => {
    const [view, setView] = useState("grid"); // Állapotváltozó 

    // Nézet váltás
    const toggleView = () => {
        setView(view === "grid" ? "list" : "grid");
    };

    return (
        <div>
            <button class="bg bg-primary" onClick={toggleView}>
                {view === "grid" ? <i class="fa fa-list"></i> : <i class="fa fa-th"></i>}
            </button>
            <button class="bg bg-primary" onClick={() => route('/tours/new')}><i class="fa fa-plus"></i></button>
            <div className={view === "grid" ? "grid-view" : "list-view"}>
                {tours.map((tour) => (
                    <div key={tour.id} className={view === "grid" ? "card" : "list-item"}>
                        {view === "grid" ? ( // Rácsos nézetben kép is van
                            <>
                                <img src={tour.image} alt={tour.name} />
                                <h3>{tour.name}</h3>
                                <p>{tour.location}</p>
                                <p>{tour.description}</p>
                                <a href={`/tours/${tour.id}`}>Részletek</a>
                            </>
                        ) : ( // Listás nézetben csak egy linket jelenít meg a túra nevével
                            <div>
                                <a href={`/tours/${tour.id}`}>{tour.name}</a> 
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourList;
import React,{useState, useEffect} from 'react'
import '../css/grids.css'
export default function Grids() {
    const [cells, setCells] = useState([]);

    useEffect(() => {
        // Create an array of 60 items (e.g., 0 to 59)
        setCells(Array.from({ length: 80 }));
    }, []);
    return (
        <div>
            <div className="skewed-grid">
                {cells.map((_, idx) => (
                    <div key={idx} className="grid-cell"></div>
                ))}
            </div>
        </div>
    )
}

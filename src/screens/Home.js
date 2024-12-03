import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
    const[search, setSearch] = useState('')
    const [foodItem, setFoodItem] = useState([]);
    const [foodCat, setFoodCat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            // Extract unique categories
            const uniqueCategories = [
                ...new Set(data.map((item) => item.CategoryName)),
            ].map((categoryName) => ({ CategoryName: categoryName }));

            setFoodItem(data);
            setFoodCat(uniqueCategories);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
           <div> <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption ' style={{zIndex :"10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="images/burger.jpg" className="d-block w-100" style = {{ filter : "brightness(36%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/pastry.jpg" className="d-block w-100"  style = {{ filter : "brightness(36%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="images/barbecue.jpg" className="d-block w-100"  style = {{ filter : "brightness(36%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div></div>
            <div className="container my-4">
                {Array.isArray(foodCat) && foodCat.length > 0 ? (
                    foodCat.map((category) => (
                        <div key={category.CategoryName}>
                            <h3 className="fs-3 mb-3">{category.CategoryName}</h3>
                            <hr />
                            <div className="row">
                                {Array.isArray(foodItem) && foodItem.length > 0 ? (
                                    foodItem
                                        .filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                                        .map((filteredItem) => (
                                            <div key={filteredItem._id} className="col-12 col-mb-6 col-lg-3">
                                                <Card foodItems={filteredItem}
                                                options = {filteredItem.options[0]} 
                                                />
                                            </div>
                                        ))
                                ) : (
                                    <div>No items found for this category.</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No categories available.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

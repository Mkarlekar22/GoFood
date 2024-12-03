import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const response = await res.json();
            setorderData(response);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };
    

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                {orderData?.order_data?.length > 0 ? (
    orderData.order_data.slice(0).reverse().map((order, orderIndex) => (
        <div key={orderIndex}>
            <div className='m-auto mt-5'><strong>Order Date:</strong> {new Date(order[1]).toLocaleDateString()}<hr /></div>
            {order[0].map((item, itemIndex) => (
                <div className='col-12 col-md-6 col-lg-3' key={itemIndex}>
                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img src={item.img || "placeholder-image-url"} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                <span className='m-1'>{item.qty}</span>
                                <span className='m-1'>{item.size}</span>
                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                    ₹{item.price}/-
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ))
) : (
    <p>No orders found.</p>
)}

                </div>
            </div>
            <Footer />
        </div>
    );
}

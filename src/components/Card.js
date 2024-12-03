import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        let food = null;

        // Check if the item is already in the cart
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;
                break;
            }
        }

        if (food) {
            if (food.size === size) {
                // If the size matches, update the quantity and price
                await dispatch({
                    type: "UPDATE",
                    id: props.foodItems._id,
                    price: finalPrice,
                    qty: qty,
                });
                return;
            } else {
                // If the size is different, add it as a new entry in the cart
                await dispatch({
                    type: "ADD_TO_CART",
                    id: props.foodItems._id,
                    name: props.foodItems.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.foodItems.img,
                });
                return;
            }
        }

        // If the item is not in the cart, add it
        await dispatch({
            type: "ADD_TO_CART",
            id: props.foodItems._id,
            name: props.foodItems.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.foodItems.img,
        });
    };

    const finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img
                        src={props.foodItems.img}
                        className="card-img-top"
                        alt={props.foodItems.name}
                        style={{ height: "120px", objectFit: "fill" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItems.name}</h5>
                        <div className="container w-100">
                            <select
                                className="m-2 h-100 bg-success rounded"
                                onChange={(e) => setQty(e.target.value)}
                            >
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="m-2 h-100 bg-success rounded"
                                ref={priceRef}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                        </div>
                        <hr />
                        <button
                            className="btn btn-success justify-center ms-2"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useContext, useReducer, createContext } from 'react';

// Create the contexts
const CreateStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;
    case "DROP":
      let empArray = []
      return empArray
    case "UPDATE":
      let arr = [...state]
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(food.qty, parseInt(action.qty), action.price + food.price)
          arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        }
        return arr
      })
      return arr
    default:
      console.log("Error in Reducer");
  }
};


// CartProvider component to wrap the app and provide state and dispatch
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Initialize state as empty array

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CreateStateContext.Provider value={state}>
        {children}
      </CreateStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use state and dispatch
export const useCart = () => useContext(CreateStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

import React, {createContext, useState} from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartContextProvider = props => {
    const [cart, setCart] = useState(null);
    const [cartChangedToggle, setCartChangedToggle] = useState(false);

    return(
        <ShoppingCartContext.Provider value={[cart, setCart, cartChangedToggle, setCartChangedToggle]}>
            {props.children}
        </ShoppingCartContext.Provider>
    );
}
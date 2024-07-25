import { createContext } from "react";

export const CartContext = createContext({
	// Add default values here to help with autocompletion
	items: [],
	addItemToCart: () => {},
	updateItemQuantity: () => {},
});

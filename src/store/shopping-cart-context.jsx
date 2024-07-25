import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
	// Add default values here to help with autocompletion
	items: [],
	addItemToCart: () => {},
	updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
	if (action.type === "ADD_ITEM") {
		const updatedItems = [...state.items];

		const existingCartItemIndex = updatedItems.findIndex(
			(cartItem) => cartItem.id === action.payload
		);
		const existingCartItem = updatedItems[existingCartItemIndex];

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity + 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			const product = DUMMY_PRODUCTS.find(
				(product) => product.id === action.payload
			);
			updatedItems.push({
				id: action.payload,
				name: product.title,
				price: product.price,
				quantity: 1,
			});
		}

		return {
			...state,
			items: updatedItems,
		};
	} else if (action.type === "UPDATE_QUANTITY") {
		const updatedItems = [...state.items];

		const existingCartItemIndex = updatedItems.findIndex(
			(item) => item.id === action.payload.productId
		);
		const existingItem = updatedItems[existingCartItemIndex];
		const updatedItem = {
			...existingItem,
			quantity: existingItem.quantity + action.payload.amount,
		};
		updatedItems[existingCartItemIndex] = updatedItem;

		return {
			...state,
			items: updatedItems,
		};
	}
}

export default function CartContextProvider({ children }) {
	const [shoppingCartState, dispatchShoppingCartAction] = useReducer(
		shoppingCartReducer,
		{
			items: [],
		}
	);

	function handleAddItemToCart(id) {
		dispatchShoppingCartAction({
			type: "ADD_ITEM",
			payload: id,
		});
	}

	function handleUpdateCartItemQuantity(productId, amount) {
		dispatchShoppingCartAction({
			type: "UPDATE_QUANTITY",
			payload: {
				productId,
				amount,
			},
		});
	}

	const ctxValue = {
		items: shoppingCartState.items,
		addItemToCart: handleAddItemToCart,
		updateItemQuantity: handleUpdateCartItemQuantity,
	};

	return (
		<CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
	);
}

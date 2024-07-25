import { DUMMY_PRODUCTS } from "../dummy-products.js";
import Product from "./Product.jsx";

export default function Shop({ onAddItemToCart, children }) {
	return (
		<section id="shop">
			<h2>Elegant Clothing For Everyone</h2>

			{children}
		</section>
	);
}
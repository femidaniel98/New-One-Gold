import ShoppingCart from "@/components/partials/cart/ShoppingCart";
import DefaultLayout from "@/layouts/DefaultLayout";

const Products = () => (
  <DefaultLayout title="My Cart">
    <ShoppingCart />
  </DefaultLayout>
);

export default Products;

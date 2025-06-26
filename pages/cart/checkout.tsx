import { RootState } from "@/store";
import Layout from "../../layouts/DefaultLayout";
import { useSelector } from "react-redux";
import CheckoutStatus from "@/components/elements/CheckoutStatus";
import DefaultLayout from "../../layouts/DefaultLayout";
import CheckoutItems from "@/components/elements/CheckoutItems";
import Link from "next/link";
import TextInput from "@/components/global/TextInput";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdAlternateEmail, MdLocationPin } from "react-icons/md";

const CheckoutPage = () => {
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });

  return (
    <DefaultLayout title="Checkout">
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Shipping and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="checkout__col-6 md:col-span-8">
              <div className="flex gap-5">
                <Link
                  href={"/login"}
                  className="bg-primary py-3 px-7 rounded-full text-center text-white hover:bg-green-700 transition-all duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className="border border-primary hover:border-green-700 transition-all duration-300 py-3 px-7 rounded-full text-center "
                >
                  Sign Up
                </Link>
              </div>

              <div className="block">
                <h3 className="text-xl font-bold my-8">Shipping information</h3>
                <form className="form space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <TextInput
                      labelText="First Name"
                      showLabel={true}
                      icon={<FaUser />}
                      placeholder="John"
                      inputType="text"
                      isLight
                      containerClasses="flex-1"
                    />
                    <TextInput
                      labelText="Last Name"
                      showLabel={true}
                      icon={<FaUser />}
                      placeholder=" Doe"
                      inputType="text"
                      isLight
                      containerClasses="flex-1"
                    />
                  </div>

                  <TextInput
                    labelText="Email Address"
                    showLabel={true}
                    icon={<MdAlternateEmail />}
                    placeholder="name@company.com"
                    inputType="email"
                    isLight
                  />
                  <TextInput
                    labelText="Phone Number"
                    showLabel={true}
                    icon={<FaPhone />}
                    placeholder=""
                    inputType="tel"
                    isLight
                  />
                  <TextInput
                    labelText="Home Address"
                    showLabel={true}
                    icon={<MdLocationPin />}
                    placeholder=""
                    inputType="text"
                    isLight
                  />

                  <div className="flex gap-6 ">
                    <div className="inline-block flex-1">
                      <label
                        htmlFor="mySelect"
                        className="inline-block text-gray-900 mb-2 text-sm font-medium"
                      >
                        Country
                      </label>
                      <div className="relative">
                        <select
                          id="mySelect"
                          className=" appearance-none  bg-white border border-gray-900 hover:border-gray-500 rounded leading-tight focus:outline-none focus:shadow-outline block w-full py-3 px-5  "
                        >
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -top-2">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12h5l-5 5-5-5h5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="inline-block flex-1">
                      <label
                        htmlFor="mySelect"
                        className="inline-block text-gray-900 mb-2 text-sm font-medium"
                      >
                        State
                      </label>
                      <div className="relative">
                        <select
                          id="mySelect"
                          className=" appearance-none  bg-white border border-gray-900 hover:border-gray-500 rounded leading-tight focus:outline-none focus:shadow-outline block w-full py-3 px-5  "
                        >
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 -top-2">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12h5l-5 5-5-5h5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-4 md:col-span-4">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="checkout-total">
                  <p>Total cost</p>
                  <h3>₦2,000,000</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <Link href="/cart" className="cart__btn-back">
              <i className="icon-left"></i> Back
            </Link>
            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border">
                Continue shopping
              </button>
              <button type="button" className="btn btn--rounded btn--primary">
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CheckoutPage;

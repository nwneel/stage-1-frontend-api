import "./ShippingAndReturns.css";
import StoreLogo from "../StoreLogo/StoreLogo";

function ShippingAndReturns() {
  return (
    <div className="shipping-and-returns__page">
      <main className="shipping-and-returns">
        <StoreLogo />
        <h1>Shipping and Returns</h1>
        <p>
          Orders are processed and shipped within 2-5 business days. Delivery
          times vary based on your location and selected shipping method.
        </p>
        <p>
          If you are not satisfied with your purchase, items may be returned
          within 30 days of delivery for a refund or exchange. Items must be
          unused and in their original packaging.
        </p>
      </main>
    </div>
  );
}

export default ShippingAndReturns;

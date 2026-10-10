import "./Checkout.css";
import { useState } from "react";
import { SALES_TAX_RATE } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import { getShippingRates } from "../../utils/ThirdPartyApi";

const usStates = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "United States Virgin Islands",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const canadianProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

const countries = [
  "Albania",
  "Andorra",
  "Argentina",
  "Aruba",
  "Australia",
  "Austria",
  "Bahamas",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Mexico",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "North Macedonia",
  "Norway",
  "Panama",
  "Paraguay",
  "Peru",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Romania",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "South Korea",
  "Spain",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Trinidad and Tobago",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Vatican City",
  "Venezuela",
];

const initialShippingInfo = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
};

function Checkout({
  cartItems = [],
  onBack,
  onSignInClick,
  isSignedIn = false,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [shippingInfo, setShippingInfo] = useState(initialShippingInfo);
  const [shippingRates, setShippingRates] = useState([]);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState("");
  const [selectedRateCode, setSelectedRateCode] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);
  const [selectionError, setSelectionError] = useState("");
  const containsSwordOrKatana = cartItems.some((item) =>
    /\b(?:swords?|katanas?)\b/i.test(
      `${item._id || ""} ${item.name || ""} ${item.category || ""}`,
    ),
  );
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const salesTax = totalCost * SALES_TAX_RATE;
  const selectedRate = shippingRates.find(
    (rate) => rate.rateId === selectedRateCode,
  );
  const shippingCost = selectedRate
    ? (selectedRate.shipmentCost || 0) + (selectedRate.otherCost || 0)
    : 0;
  const totalWithTax = totalCost + salesTax + shippingCost;
  const defaultValues = {
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  };

  const { values, setValues, handleChange } = useForm(defaultValues);
  const showStateField = ["United States", "Canada"].includes(values.country);
  const isCanadaSelected = values.country === "Canada";

  //useEffect(() => {
  //     setValues(defaultValues);
  //  }, [setValues]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "country" && !["United States", "Canada"].includes(value)
        ? { state: "" }
        : {}),
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      if (typeof onSignInClick === "function") {
        onSignInClick();
      }
      return;
    }

    setRatesLoading(true);
    setRatesError("");
    setShippingRates([]);
    setSelectedRateCode("");
    setSelectionError("");

    try {
      const rates = await getShippingRates({ ...values, cartItems });
      const availableRates = containsSwordOrKatana
        ? rates.filter(
            (rate) =>
              !/envelope/i.test(
                `${rate.serviceName || ""} ${rate.packageName || ""} ${rate.packageCode || ""}`,
              ),
          )
        : rates;
      setShippingRates(availableRates);
      if (availableRates.length === 0) {
        setRatesError("No shipping options were found for this address.");
      }
      /*// ⚠️ MUST BE "http://localhost:3001/api/send-merchant-email"
      const response = await fetch(
        "http://localhost:3001/api/send-merchant-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderItems: cartItems,
            shippingInfo: shippingInfo,
            selectedRate: selectedOption,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Order submitted and email sent to merchant!");
      } else {
        alert("Error: " + (result.error || result.message));
      }*/
    } catch (err) {
      console.error("Failed to get shipping rates:", err);
      setRatesError(err.message || "Could not retrieve shipping rates.");
    } finally {
      setRatesLoading(false);
    }
  };
  const handleCompleteOrder = () => {
    if (!isSignedIn) {
      if (typeof onSignInClick === "function") {
        onSignInClick();
      }
      return;
    }

    if (!selectedRate) {
      setSelectionError("Please select a shipping option");
      return;
    }
    setSelectionError("");
    const order = {
      orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
      placedAt: new Date().toISOString(),
      items: cartItems,
      subtotal: totalCost,
      salesTax,
      shippingCost,
      shippingService: selectedRate.serviceName,
      total: totalWithTax,
      customer: { ...shippingInfo },
      address: { ...values },
    };
    setCompletedOrder(order);
    if (typeof onOrderComplete === "function") {
      onOrderComplete(cartItems, order);
    }
  };

  if (completedOrder) {
    const { customer, address } = completedOrder;
    return (
      <main className="checkout-page">
        <div className="checkout-page__container">
          <h1 className="checkout-page__title">Order Confirmation</h1>
          <p>
            Thank you, {customer.fullName}! Your order{" "}
            <strong>{completedOrder.orderNumber}</strong> has been placed. A
            confirmation will be sent to {customer.email}.
          </p>

          <h2 className="checkout-page__shipping-title">Items</h2>
          <div className="checkout-page__items">
            {completedOrder.items.map((item) => (
              <div className="checkout-page__item" key={item._id}>
                <div className="checkout-page__details">
                  <h2 className="checkout-page__item-name">{item.name}</h2>
                  <p className="checkout-page__item-meta">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <span className="checkout-page__item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <h2 className="checkout-page__shipping-title">Shipping To</h2>
          <p>
            {customer.fullName}
            <br />
            {customer.address}
            <br />
            {address.city}
            {address.state ? `, ${address.state}` : ""} {address.zipCode}
            <br />
            {address.country}
          </p>

          <div className="checkout-page__summary">
            <span className="checkout-page__summary-label">Subtotal:</span>
            <span className="checkout-page__summary-value">
              ${completedOrder.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="checkout-page__summary">
            <span className="checkout-page__summary-label">Sales Tax:</span>
            <span className="checkout-page__summary-value">
              ${completedOrder.salesTax.toFixed(2)}
            </span>
          </div>
          <div className="checkout-page__summary">
            <span className="checkout-page__summary-label">
              Shipping ({completedOrder.shippingService}):
            </span>
            <span className="checkout-page__summary-value">
              ${completedOrder.shippingCost.toFixed(2)}
            </span>
          </div>
          <div className="checkout-page__summary">
            <span className="checkout-page__summary-label">Total:</span>
            <span className="checkout-page__summary-value">
              ${completedOrder.total.toFixed(2)}
            </span>
          </div>

          <div className="checkout-page__actions">
            <button
              type="button"
              className="checkout-page__back-btn"
              onClick={onBack}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-page__container">
        <h1 className="checkout-page__title">Checkout</h1>

        {cartItems.length > 0 ? (
          <>
            <div className="checkout-page__items">
              {cartItems.map((item) => (
                <div className="checkout-page__item" key={item._id}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="checkout-page__image"
                    />
                  )}
                  <div className="checkout-page__details">
                    <h2 className="checkout-page__item-name">{item.name}</h2>
                    <p className="checkout-page__item-meta">
                      ${item.price.toFixed(2)} each
                    </p>
                    {typeof onUpdateQuantity === "function" && (
                      <div className="checkout-page__quantity">
                        <button
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="checkout-page__quantity-btn"
                          onClick={() =>
                            onUpdateQuantity(item._id, item.quantity - 1)
                          }
                          type="button"
                        >
                          &minus;
                        </button>
                        <span className="checkout-page__quantity-value">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase quantity of ${item.name}`}
                          className="checkout-page__quantity-btn"
                          onClick={() =>
                            onUpdateQuantity(item._id, item.quantity + 1)
                          }
                          type="button"
                        >
                          &#43;
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="checkout-page__item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  {typeof onRemoveItem === "function" && (
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      className="checkout-page__remove-btn"
                      onClick={() => onRemoveItem(item._id)}
                      type="button"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="checkout-page__summary">
              <span className="checkout-page__summary-label">Subtotal:</span>
              <span className="checkout-page__summary-value">
                ${totalCost.toFixed(2)}
              </span>
            </div>
            <div className="checkout-page__summary">
              <span className="checkout-page__summary-label">
                Sales Tax (7.25%):
              </span>
              <span className="checkout-page__summary-value">
                ${salesTax.toFixed(2)}
              </span>
            </div>
            {selectedRate && (
              <div className="checkout-page__summary">
                <span className="checkout-page__summary-label">
                  Shipping ({selectedRate.serviceName}):
                </span>
                <span className="checkout-page__summary-value">
                  ${shippingCost.toFixed(2)}
                </span>
              </div>
            )}
            <div className="checkout-page__summary">
              <span className="checkout-page__summary-label">Total:</span>
              <span className="checkout-page__summary-value">
                ${totalWithTax.toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <p className="checkout-page__empty">Your cart is empty.</p>
        )}

        {!selectedOption || cartItems.length === 0 ? (
          <div className="checkout-page__actions">
            <button
              type="button"
              className="checkout-page__back-btn"
              onClick={onBack}
            >
              Continue Shopping
            </button>
            {cartItems.length > 0 && (
              <button
                type="button"
                className="checkout-page__submit-btn"
                onClick={() => {
                  if (isSignedIn) {
                    setSelectedOption("sign-in");
                  } else if (typeof onSignInClick === "function") {
                    onSignInClick();
                  }
                }}
              >
                {isSignedIn ? "Continue to Checkout" : "Sign In to Checkout"}
              </button>
            )}
          </div>
        ) : (
          <form
            className="checkout-page__shipping-form"
            onSubmit={handleSubmitOrder}
          >
            <h2 className="checkout-page__shipping-title">
              Shipping Information
            </h2>

            <div className="checkout-page__field-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                placeholder=""
                required
              />
            </div>

            <div className="checkout-page__field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                placeholder=""
                required
              />
            </div>

            <div className="checkout-page__field-group">
              <label htmlFor="address">Street Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={shippingInfo.address}
                onChange={handleInputChange}
                placeholder=""
                required
              />
            </div>

            <div className="checkout-page__row">
              <div className="checkout-page__field-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={values.city}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </div>

              {showStateField && (
                <div className="checkout-page__field-group">
                  <label htmlFor="state">
                    {isCanadaSelected ? "Province/Territory" : "State/Province"}
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      {isCanadaSelected
                        ? "Select a province or territory"
                        : "Select a state"}
                    </option>
                    {(isCanadaSelected ? canadianProvinces : usStates).map(
                      (regionName) => (
                        <option key={regionName} value={regionName}>
                          {regionName}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              )}
            </div>

            <div className="checkout-page__row">
              <div className="checkout-page__field-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={values.zipCode}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </div>

              <div className="checkout-page__field-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={(event) =>
                    setValues((previousValues) => ({
                      ...previousValues,
                      country: event.target.value,
                      state: "",
                    }))
                  }
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((countryName) => (
                    <option key={countryName} value={countryName}>
                      {countryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="checkout-page__form-actions">
              <button
                type="button"
                className="checkout-page__back-btn"
                onClick={() => setSelectedOption("")}
              >
                Back
              </button>
              <button type="submit" className="checkout-page__submit-btn">
                Continue to Shipping Options
              </button>
            </div>

            {ratesLoading && <p role="status">Loading shipping rates...</p>}
            {ratesError && <p role="alert">{ratesError}</p>}
            {shippingRates.length > 0 && (
              <div className="checkout-page__shipping-rates">
                <h2 className="checkout-page__shipping-title">
                  Shipping Options
                </h2>
                {shippingRates.map((rate) => {
                  const cost = (rate.shipmentCost || 0) + (rate.otherCost || 0);
                  return (
                    <label
                      className="checkout-page__summary"
                      key={rate.rateId}
                      htmlFor={`rate-${rate.rateId}`}
                    >
                      <span className="checkout-page__summary-label">
                        <input
                          id={`rate-${rate.rateId}`}
                          type="radio"
                          className="checkout-page__shipping-radio-btn"
                          name="shippingRate"
                          value={rate.rateId}
                          checked={selectedRateCode === rate.rateId}
                          onChange={() => {
                            setSelectedRateCode(rate.rateId);
                            setSelectionError("");
                          }}
                        />{" "}
                        {rate.serviceName}
                      </span>
                      <span className="checkout-page__summary-value">
                        ${cost.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
                {selectionError && (
                  <p className="checkout-page__error" role="alert">
                    {selectionError}
                  </p>
                )}
                <div className="checkout-page__form-actions">
                  <button
                    type="button"
                    className="checkout-page__submit-btn"
                    onClick={handleCompleteOrder}
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}

export default Checkout;

import "./Orders.css";

function formatDate(isoString) {
  const date = new Date(isoString);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

function Orders({ orders, onBack }) {
  return (
    <main className="orders">
      <div className="orders__container">
        <h1 className="orders__title">Order History</h1>

        {orders.length === 0 ? (
          <>
            <p className="orders__empty">
              You haven&apos;t placed any orders yet.
            </p>
            <button className="orders__button" onClick={onBack} type="button">
              Start Shopping
            </button>
          </>
        ) : (
          <ul className="orders__list">
            {orders.map((order) => (
              <li className="orders__order" key={order.orderNumber}>
                <div className="orders__header">
                  <div>
                    <h2 className="orders__number">{order.orderNumber}</h2>
                    <p className="orders__date">{formatDate(order.placedAt)}</p>
                  </div>
                </div>

                <ul className="orders__items">
                  {order.items.map((item) => (
                    <li className="orders__item" key={item._id}>
                      {item.image && (
                        <img
                          alt={item.name}
                          className="orders__item-image"
                          src={item.image}
                        />
                      )}
                      <span className="orders__item-name">{item.name}</span>
                      <span className="orders__item-meta">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </span>
                      <span className="orders__item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="orders__details">
                  Shipped via {order.shippingService} to{" "}
                  {order.customer.fullName}, {order.customer.address},{" "}
                  {order.address.city}
                  {order.address.state ? `, ${order.address.state}` : ""}{" "}
                  {order.address.zipCode}, {order.address.country}
                </p>
                <p className="orders__details">
                  Subtotal ${order.subtotal.toFixed(2)} · Tax $
                  {order.salesTax.toFixed(2)} · Shipping $
                  {order.shippingCost.toFixed(2)}
                </p>
                <p className="orders__details orders__details_total">
                  Order Total: ${order.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Orders;

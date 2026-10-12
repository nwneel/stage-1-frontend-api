import "./App.css";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/footer";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import EmptyCartModal from "../EmptyCartModal/EmptyCartModal";
import CartModal from "../CartModal/CartModal";
import ProductPage from "../ProductPage/ProductPage";
import ProductList from "../ProductList/ProductList";
import About from "../About/About";
import ShippingAndReturns from "../ShippingAndReturns/ShippingAndReturns";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  DEFAULT_PRODUCT_STOCK,
  defaultNewArrivals,
  allProducts,
  getProductsByCategory,
  getProductsByFranchise,
  reduceProductStock,
} from "../../utils/constants";

const productNewArrivalPage = defaultNewArrivals.find(
  (product) => product._id === "katana",
);
const productNewArrivalPagePath = "/products";
const ORDERS_STORAGE_KEY = "orders";
const PROFILE_STORAGE_KEY = "profile";
const CART_STORAGE_KEY = "cartItems";
const AUTH_STORAGE_KEY = "isSignedIn";

// Each `npm run dev` start begins signed out with an empty cart.
/* global __DEV_SERVER_ID__ */
if (import.meta.env.DEV) {
  try {
    if (localStorage.getItem("devServerId") !== __DEV_SERVER_ID__) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.setItem("devServerId", __DEV_SERVER_ID__);
    }
  } catch (error) {
    console.error("Failed to reset dev session.", error);
  }
}

function loadOrders() {
  try {
    const stored = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function loadProfile() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    return {
      username: typeof stored?.username === "string" ? stored.username : "",
      email: typeof stored?.email === "string" ? stored.email : "",
    };
  } catch (error) {
    console.error("Failed to load profile from local storage.", error);
    return { username: "", email: "" };
  }
}

function loadCartItems() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Failed to load cart items from local storage.", error);
    return [];
  }
}

function ProductRoute({ onAddToCart, onBack }) {
  const { productId } = useParams();
  const product = allProducts.find((item) => item._id === productId);
  if (!product) return <Navigate to="/" replace />;
  return (
    <ProductPage onAddToCart={onAddToCart} onBack={onBack} product={product} />
  );
}

function FranchiseRoute(props) {
  const { franchiseName } = useParams();
  return (
    <ProductList
      categoryName={franchiseName}
      products={getProductsByFranchise(franchiseName)}
      {...props}
    />
  );
}

function CategoryRoute(props) {
  const { categoryName } = useParams();
  return (
    <ProductList
      categoryName={categoryName}
      products={getProductsByCategory(categoryName)}
      {...props}
    />
  );
}

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState(loadOrders);
  const [profile, setProfile] = useState(loadProfile);
  const [cartItems, setCartItems] = useState(loadCartItems);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === "true",
  );
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [isEmptyCartOpen, setIsEmptyCartOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const submittedSearch =
    pathname === "/search" ? (searchParams.get("q") ?? "") : null;
  const isSearchSubmitted = submittedSearch !== null;
  const isCheckoutPage = pathname === "/checkout";
  const [shouldReturnToCheckout, setShouldReturnToCheckout] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to local storage.", error);
    }
  }, [cartItems]);

  useEffect(() => {
    if (pathname === "/checkout" && !isSignedIn) {
      setShouldReturnToCheckout(true);
      setIsSignInOpen(true);
    }
  }, [pathname, isSignedIn]);

  function goTo(path) {
    navigate(path);
    setSearchTerm("");
    window.scrollTo(0, 0);
  }

  function handleCategorySelect(categoryName) {
    goTo(`/category/${encodeURIComponent(categoryName)}`);
  }

  function handleFranchiseSelect(franchiseName) {
    goTo(`/franchise/${encodeURIComponent(franchiseName)}`);
  }

  function handleBackToHome() {
    goTo("/");
  }

  function handleAboutClick() {
    goTo("/about-us");
  }

  function handleShippingClick() {
    goTo("/shipping-and-returns");
  }

  function handleCheckoutBack() {
    handleBackToHome();
  }

  function handleOrdersClick() {
    goTo("/orders");
  }

  function handleProfileClick() {
    goTo("/profile");
  }

  function handleProfileSave(updatedProfile) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  }

  function handleOrderComplete(purchasedItems, order) {
    reduceProductStock(purchasedItems);
    setCartItems([]);
    if (order) {
      setOrders((previousOrders) => {
        const updatedOrders = [order, ...previousOrders];
        try {
          localStorage.setItem(
            ORDERS_STORAGE_KEY,
            JSON.stringify(updatedOrders),
          );
        } catch {
          // storage may be full or unavailable; orders stay in memory
        }
        return updatedOrders;
      });
    }
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
  }

  function handleSearchSubmit() {
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    window.scrollTo(0, 0);
  }

  function handleProductSelect(product) {
    const path =
      product._id === productNewArrivalPage._id
        ? productNewArrivalPagePath
        : `/products/${encodeURIComponent(product._id)}`;
    goTo(path);
  }

  function handleSearchSuggestionSelect(product) {
    handleProductSelect(product);
  }

  function handleProductBack() {
    handleBackToHome();
  }

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const normalizedSearchTerm = (submittedSearch ?? searchTerm)
    .trim()
    .toLowerCase();
  const searchResults = allProducts.filter((product) => {
    const productKeywords = [
      product.name,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return productKeywords.includes(normalizedSearchTerm);
  });

  function handleAddToCart(item, quantity = 1) {
    if (!item) return;
    const stock = Number.isInteger(item.stock)
      ? item.stock
      : DEFAULT_PRODUCT_STOCK;
    const cartItem = cartItems.find((existing) => existing._id === item._id);
    const currentQuantity = cartItem?.quantity ?? 0;
    const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1));
    const availableQuantity = Math.max(0, stock - currentQuantity);
    const quantityToAdd = Math.min(requestedQuantity, availableQuantity);

    if (quantityToAdd < requestedQuantity) {
      window.alert(
        availableQuantity > 0
          ? `Only ${availableQuantity} more ${item.name} available.`
          : `No more ${item.name} available.`,
      );
    }
    if (quantityToAdd === 0) return;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (existing) => existing._id === item._id,
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantityToAdd,
        };
        return updatedItems;
      }
      return [...prevItems, { ...item, quantity: quantityToAdd }];
    });
  }

  function handleRemoveCartItem(itemId, options = {}) {
    const { showEmptyCartModal = true } = options;
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== itemId);
      if (updatedItems.length === 0 && showEmptyCartModal) {
        setIsCartOpen(false);
        setIsEmptyCartOpen(true);
      }
      return updatedItems;
    });
  }

  function handleUpdateCartItemQuantity(itemId, quantity, options = {}) {
    const { showEmptyCartModal = true } = options;
    const requestedQuantity = Number(quantity);
    if (!Number.isFinite(requestedQuantity)) return;
    if (requestedQuantity < 1) {
      handleRemoveCartItem(itemId, { showEmptyCartModal });
      return;
    }
    const cartItem = cartItems.find((item) => item._id === itemId);
    if (!cartItem) return;
    const stock = Number.isInteger(cartItem.stock)
      ? cartItem.stock
      : DEFAULT_PRODUCT_STOCK;
    const wholeNumberQuantity = Math.floor(requestedQuantity);
    const cappedQuantity = Math.min(wholeNumberQuantity, stock);
    if (cappedQuantity < wholeNumberQuantity) {
      window.alert(`Only ${stock} ${cartItem.name} available in total.`);
    }
    if (cappedQuantity < 1) {
      handleRemoveCartItem(itemId, { showEmptyCartModal });
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: cappedQuantity } : item,
      ),
    );
  }

  function handleCartClick() {
    if (cartItems.length === 0) {
      setIsEmptyCartOpen(true);
    } else {
      setIsCartOpen(true);
    }
  }

  function handleSignInSubmit(credentials) {
    setIsSignInOpen(false);
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsSignedIn(true);
    const email = credentials.email.trim();
    const updatedProfile =
      profile.email.toLowerCase() === email.toLowerCase()
        ? { ...profile, email }
        : { username: email.split("@")[0], email };
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error("Failed to save sign-in details to local storage.", error);
    }
    setProfile(updatedProfile);
    returnToCheckoutIfNeeded();
  }

  function returnToCheckoutIfNeeded() {
    if (shouldReturnToCheckout) {
      setShouldReturnToCheckout(false);
      goTo("/checkout");
    }
  }

  function handleCheckoutSignInClick() {
    setShouldReturnToCheckout(true);
    setIsSignInOpen(true);
  }

  function handleLogOutClick() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    setOrders([]);
    setIsSignedIn(false);
    handleBackToHome();
  }

  function handleSignUpSubmit(values) {
    setIsSignUpOpen(false);
    const updatedProfile = {
      username: values.username.trim(),
      email: values.email.trim(),
    };
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch (error) {
      console.error("Failed to save sign-up details to local storage.", error);
    }
    setProfile(updatedProfile);
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsSignedIn(true);
    returnToCheckoutIfNeeded();
  }

  function handleForgetPasswordSubmit() {
    setIsForgetPasswordOpen(false);
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      setIsEmptyCartOpen(true);
      return;
    }

    if (!isSignedIn) {
      setIsCartOpen(false);
      handleCheckoutSignInClick();
      return;
    }

    setIsCartOpen(false);
    goTo("/checkout");
  }

  return (
    <div className="app">
      <div className="app__content">
        <Header
          cartQuantity={cartQuantity}
          onSignInClick={() => {
            setShouldReturnToCheckout(false);
            setIsSignInOpen(true);
          }}
          onSignUpClick={() => setIsSignUpOpen(true)}
          isSignedIn={isSignedIn}
          onCartClick={handleCartClick}
          onCategorySelect={handleCategorySelect}
          onLogoClick={handleBackToHome}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchSuggestionSelect={handleSearchSuggestionSelect}
          showSearchSuggestions={!isSearchSubmitted}
          showCartButton={!isCheckoutPage}
          searchSuggestions={searchResults.slice(0, 5)}
          searchTerm={searchTerm}
          onLogOutClick={handleLogOutClick}
          onOrdersClick={handleOrdersClick}
          onProfileClick={handleProfileClick}
          username={profile.username}
        />
        <Routes>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isLoggedIn={isSignedIn}>
                <Checkout
                  cartItems={cartItems}
                  onOrderComplete={handleOrderComplete}
                  onBack={handleCheckoutBack}
                  onSignInClick={handleCheckoutSignInClick}
                  isSignedIn={isSignedIn}
                  onUpdateQuantity={(itemId, quantity) =>
                    handleUpdateCartItemQuantity(itemId, quantity, {
                      showEmptyCartModal: false,
                    })
                  }
                  onRemoveItem={(itemId) =>
                    handleRemoveCartItem(itemId, { showEmptyCartModal: false })
                  }
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isSignedIn}>
                <Profile
                  profile={profile}
                  onBack={handleBackToHome}
                  onSave={handleProfileSave}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isLoggedIn={isSignedIn}>
                <Orders orders={orders} onBack={handleBackToHome} />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<About />} />
          <Route path="/shipping-and-returns" element={<ShippingAndReturns />} />
          <Route
            path={productNewArrivalPagePath}
            element={
              <ProductPage
                onAddToCart={handleAddToCart}
                onBack={handleProductBack}
                product={productNewArrivalPage}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProductRoute
                onAddToCart={handleAddToCart}
                onBack={handleProductBack}
              />
            }
          />
          <Route
            path="/search"
            element={
              <ProductList
                categoryName={`Search Results for "${(submittedSearch ?? "").trim()}"`}
                products={searchResults}
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onBack={handleBackToHome}
                onFranchiseSelect={handleFranchiseSelect}
              />
            }
          />
          <Route
            path="/franchise/:franchiseName"
            element={
              <FranchiseRoute
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onBack={handleBackToHome}
                onFranchiseSelect={handleFranchiseSelect}
              />
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <CategoryRoute
                onProductSelect={handleProductSelect}
                onAddToCart={handleAddToCart}
                onBack={handleBackToHome}
                onFranchiseSelect={handleFranchiseSelect}
              />
            }
          />
          <Route
            path="*"
            element={
              <Main
                onAddToCart={handleAddToCart}
                onProductSelect={handleProductSelect}
              />
            }
          />
        </Routes>
        <Footer
          onAboutClick={handleAboutClick}
          onShippingClick={handleShippingClick}
        />
      </div>
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => {
          setShouldReturnToCheckout(false);
          setIsSignInOpen(false);
        }}
        onSubmit={handleSignInSubmit}
        onSignUpClick={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
        onForgetPasswordClick={() => {
          setIsSignInOpen(false);
          setIsForgetPasswordOpen(true);
        }}
      />
      <SignUp
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSubmit={handleSignUpSubmit}
        onSignInClick={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <ForgetPassword
        isOpen={isForgetPasswordOpen}
        onClose={() => setIsForgetPasswordOpen(false)}
        onSubmit={handleForgetPasswordSubmit}
        onSignInClick={() => {
          setIsForgetPasswordOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <EmptyCartModal
        isOpen={isEmptyCartOpen}
        onClose={() => setIsEmptyCartOpen(false)}
        onSignInClick={() => {
          setIsEmptyCartOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartItemQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;

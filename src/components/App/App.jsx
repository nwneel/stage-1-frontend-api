import "./App.css";
import { useEffect, useState } from "react";
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

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [isEmptyCartOpen, setIsEmptyCartOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isShippingPage, setIsShippingPage] = useState(false);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  useEffect(() => {
    function handlePopState() {
      const pathname = window.location.pathname;
      if (pathname === "/about-us") {
        setIsAboutPage(true);
        setIsShippingPage(false);
        setIsCheckoutPage(false);
        setSelectedCategory(null);
        setSelectedProduct(null);
      } else if (pathname === "/shipping-and-returns") {
        setIsAboutPage(false);
        setIsShippingPage(true);
        setIsCheckoutPage(false);
        setSelectedCategory(null);
        setSelectedFranchise(null);
        setSelectedProduct(null);
      } else if (pathname.startsWith("/category/")) {
        setIsAboutPage(false);
        setIsShippingPage(false);
        setIsCheckoutPage(false);
        const categoryName = decodeURIComponent(
          pathname.replace("/category/", ""),
        );
        setSelectedCategory(categoryName);
        setSelectedFranchise(null);
        setSelectedProduct(null);
      } else if (pathname.startsWith("/franchise/")) {
        setIsAboutPage(false);
        setIsShippingPage(false);
        setIsCheckoutPage(false);
        const franchiseName = decodeURIComponent(
          pathname.replace("/franchise/", ""),
        );
        setSelectedFranchise(franchiseName);
        setSelectedCategory(null);
        setSelectedProduct(null);
      } else if (pathname === productNewArrivalPagePath) {
        setIsAboutPage(false);
        setIsShippingPage(false);
        setIsCheckoutPage(false);
        setSelectedProduct(productNewArrivalPage);
        setSelectedCategory(null);
      } else if (pathname.startsWith("/products/")) {
        setIsAboutPage(false);
        setIsShippingPage(false);
        setIsCheckoutPage(false);
        const productId = decodeURIComponent(
          pathname.replace("/products/", ""),
        );
        const foundProduct = allProducts.find(
          (product) => product._id === productId,
        );
        setSelectedProduct(foundProduct || null);
        setSelectedCategory(null);
        setSelectedFranchise(null);
      } else if (pathname === "/checkout") {
        setIsAboutPage(false);
        setIsShippingPage(false);
        setIsCheckoutPage(true);
        setSelectedCategory(null);
        setSelectedFranchise(null);
        setSelectedProduct(null);
      } else {
        setIsAboutPage(false);
        setIsShippingPage(false);
        setIsCheckoutPage(false);
        setSelectedProduct(null);
        setSelectedCategory(null);
        setSelectedFranchise(null);
      }
    }

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function handleCategorySelect(categoryName) {
    const path = `/category/${encodeURIComponent(categoryName)}`;
    window.history.pushState({}, "", path);
    setSelectedCategory(categoryName);
    setSelectedFranchise(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsSearchSubmitted(false);
    setIsAboutPage(false);
    setIsShippingPage(false);
    setIsCheckoutPage(false);
    window.scrollTo(0, 0);
  }

  function handleFranchiseSelect(franchiseName) {
    const path = `/franchise/${encodeURIComponent(franchiseName)}`;
    window.history.pushState({}, "", path);
    setSelectedFranchise(franchiseName);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsSearchSubmitted(false);
    setIsAboutPage(false);
    setIsCheckoutPage(false);
    window.scrollTo(0, 0);
  }

  function handleBackToHome() {
    window.history.pushState({}, "", "/");
    setSelectedCategory(null);
    setSelectedFranchise(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsSearchSubmitted(false);
    setIsAboutPage(false);
    setIsShippingPage(false);
    setIsCheckoutPage(false);
    window.scrollTo(0, 0);
  }

  function handleAboutClick() {
    window.history.pushState({}, "", "/about-us");
    setIsAboutPage(true);
    setIsShippingPage(false);
    setIsCheckoutPage(false);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsSearchSubmitted(false);
    window.scrollTo(0, 0);
  }

  function handleShippingClick() {
    window.history.pushState({}, "", "/shipping-and-returns");
    setIsShippingPage(true);
    setIsAboutPage(false);
    setIsCheckoutPage(false);
    setSelectedCategory(null);
    setSelectedFranchise(null);
    setSelectedProduct(null);
    setSearchTerm("");
    setIsSearchSubmitted(false);
    window.scrollTo(0, 0);
  }

  function handleCheckoutBack() {
    handleBackToHome();
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
    setIsSearchSubmitted(false);
  }

  function handleSearchSubmit() {
    if (!searchTerm.trim()) return;
    setSelectedCategory(null);
    setSelectedProduct(null);
    setIsSearchSubmitted(true);
    window.scrollTo(0, 0);
  }

  function handleProductSelect(product) {
    const path =
      product._id === productNewArrivalPage._id
        ? productNewArrivalPagePath
        : `/products/${encodeURIComponent(product._id)}`;
    window.history.pushState({}, "", path);
    setSelectedProduct(product);
    setSelectedCategory(null);
    setSelectedFranchise(null);
    window.scrollTo(0, 0);
  }

  function handleSearchSuggestionSelect(product) {
    setSearchTerm("");
    setIsSearchSubmitted(false);
    handleProductSelect(product);
  }

  function handleProductBack() {
    handleBackToHome();
  }

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
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

  function handleSignInSubmit() {
    setIsSignInOpen(false);
    setIsSignedIn(true);
  }

  function handleLogOutClick() {
    setIsSignedIn(false);
    handleBackToHome();
  }

  function handleSignUpSubmit() {
    setIsSignUpOpen(false);
  }

  function handleForgetPasswordSubmit() {
    setIsForgetPasswordOpen(false);
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      setIsEmptyCartOpen(true);
      return;
    }

    setIsCartOpen(false);
    window.history.pushState({}, "", "/checkout");
    setIsCheckoutPage(true);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setIsAboutPage(false);
    setIsShippingPage(false);
    setSearchTerm("");
    setIsSearchSubmitted(false);
    window.scrollTo(0, 0);
  }

  return (
    <div className="app">
      <div className="app__content">
        <Header
          cartQuantity={cartQuantity}
          onSignInClick={() => setIsSignInOpen(true)}
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
        />
        {isCheckoutPage ? (
          <Checkout
            cartItems={cartItems}
            onOrderComplete={(purchasedItems) => {
              reduceProductStock(purchasedItems);
              setCartItems([]);
            }}
            onBack={handleCheckoutBack}
            onSignInClick={() => setIsSignInOpen(true)}
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
        ) : isAboutPage ? (
          <About />
        ) : isShippingPage ? (
          <ShippingAndReturns />
        ) : selectedProduct ? (
          <ProductPage
            onAddToCart={handleAddToCart}
            onBack={handleProductBack}
            product={selectedProduct}
          />
        ) : isSearchSubmitted ? (
          <ProductList
            categoryName={`Search Results for "${searchTerm.trim()}"`}
            products={searchResults}
            onProductSelect={handleProductSelect}
            onAddToCart={handleAddToCart}
            onBack={handleBackToHome}
            onFranchiseSelect={handleFranchiseSelect}
          />
        ) : selectedFranchise ? (
          <ProductList
            categoryName={selectedFranchise}
            products={getProductsByFranchise(selectedFranchise)}
            onProductSelect={handleProductSelect}
            onAddToCart={handleAddToCart}
            onBack={handleBackToHome}
            onFranchiseSelect={handleFranchiseSelect}
          />
        ) : selectedCategory ? (
          <ProductList
            categoryName={selectedCategory}
            products={getProductsByCategory(selectedCategory)}
            onProductSelect={handleProductSelect}
            onAddToCart={handleAddToCart}
            onBack={handleBackToHome}
            onFranchiseSelect={handleFranchiseSelect}
          />
        ) : (
          <Main
            onAddToCart={handleAddToCart}
            onProductSelect={handleProductSelect}
          />
        )}
        <Footer
          onAboutClick={handleAboutClick}
          onShippingClick={handleShippingClick}
        />
      </div>
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
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

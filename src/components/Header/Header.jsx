import { useState } from "react";
import "./Header.css";
import searchButtonImage from "../../assets/Search-btn.png";
import logo from "../../assets/logo.png";
import shoppingCartButton from "../../assets/Shopping cart.png";
import userIcon from "../../assets/User-Icon.png";

function Header({
  cartQuantity,
  onSignInClick,
  onSignUpClick,
  onCartClick,
  onCategorySelect,
  isSignedIn,
  onLogoClick,
  onSearchChange,
  onSearchSubmit,
  onSearchSuggestionSelect,
  showSearchSuggestions,
  showCartButton,
  searchSuggestions,
  searchTerm,
  onAccountClick,
  onOrdersClick,
  onWishListClick,
  onLogOutClick,
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  function handleUserMenuToggle() {
    setIsUserMenuOpen((open) => !open);
  }

  function handleUserMenuSelect(handler) {
    setIsUserMenuOpen(false);
    if (handler) {
      handler();
    }
  }

  // closes the dropdown when focus moves outside the menu wrapper
  function handleUserMenuBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsUserMenuOpen(false);
    }
  }

  function handleSelectCategory(categoryName) {
    const dropdowns = document.querySelectorAll(
      ".header__category-dropdown[open]",
    );
    dropdowns.forEach((dropdown) => {
      dropdown.open = false;
    });
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
  }

  // handleCategoryToggle — attached to onClick on the <summary>
  // - event.currentTarget is the <summary>, not the <details>. That's why it uses .parentElement to get back to the actual <details> element.
  // - It then finds all open dropdowns and closes any that aren't the one just clicked.
  function handleCategoryToggle(event) {
    const selectedDropdown = event.currentTarget.parentElement;
    const dropdowns = document.querySelectorAll(
      ".header__category-dropdown[open]",
    );

    dropdowns.forEach((dropdown) => {
      if (dropdown !== selectedDropdown) {
        dropdown.open = false;
      }
    });
  }
  // handleCategoryMouseLeave — attached to onMouseLeave
  // - = when your mouse leaves a dropdown, event.currentTarget is that <details> element, and it sets open = false.
  function handleCategoryMouseLeave(event) {
    event.currentTarget.open = false;
  }
  // handleCategoryMouseEnter — attached to onMouseEnter of each <details>
  // - event.currentTarget is the <details> element itself (since that's what the listener is attached to
  // it grabs all dropdowns that currently have the open attribute using document.querySelectorAll(".header__category-dropdown[open]").
  // - It loops through them and closes (open = false) any dropdown that ISN'T the one you're currently hovering.
  // - Finally, it opens the one you're hovering over.
  function handleCategoryMouseEnter(event) {
    const selectedDropdown = event.currentTarget;
    const dropdowns = document.querySelectorAll(
      ".header__category-dropdown[open]",
    );

    dropdowns.forEach((dropdown) => {
      if (dropdown !== selectedDropdown) {
        dropdown.open = false;
      }
    });

    selectedDropdown.open = true;
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Store logo"
        onClick={onLogoClick}
        style={{ cursor: "pointer" }}
      />
      <form
        className="header__search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <label className="header__search-label" htmlFor="site-search">
          Search
        </label>
        <input
          className="header__search-input"
          id="site-search"
          name="search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products"
          type="search"
          value={searchTerm}
        />
        {showSearchSuggestions && searchTerm.trim().length > 1 && (
          <ul className="header__search-suggestions" role="listbox">
            {searchSuggestions.length > 0 ? (
              searchSuggestions.map((product) => (
                <li key={product._id}>
                  <button
                    type="button"
                    onClick={() => onSearchSuggestionSelect(product)}
                  >
                    <img
                      alt=""
                      className="header__search-suggestion-image"
                      src={product.image}
                    />
                    <span className="header__search-suggestion-details">
                      <span className="header__search-suggestion-name">
                        {product.name}
                      </span>
                      {product.category && (
                        <span className="header__search-suggestion-keywords">
                          {product.category}
                        </span>
                      )}
                    </span>
                    {product.price !== undefined && product.price !== null && (
                      <span className="header__search-suggestion-price">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </button>
                </li>
              ))
            ) : (
              <li className="header__search-empty">No products found</li>
            )}
          </ul>
        )}
        <button
          aria-label="Search"
          className="header__search-button"
          type="submit"
        >
          <img src={searchButtonImage} />
        </button>
      </form>
      <div className="header__products">
        <details
          className="header__category-dropdown"
          onMouseEnter={handleCategoryMouseEnter}
          onMouseLeave={handleCategoryMouseLeave}
        >
          {/* Helps create dropdown boxes */}
          <summary
            className="header__category-trigger header__sci-fi"
            onClick={(e) => {
              handleCategoryToggle(e);
            }}
          >
            Fantasy and Sci Fi
          </summary>
          <ul className="header__category-list">
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Anime & Game Collection")}
              >
                Anime & Game Collection
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Fantasy Armor")}
              >
                Fantasy Armor
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Fantasy Swords")}
              >
                Fantasy Swords
              </button>
            </li>
          </ul>
        </details>
        <details
          className="header__category-dropdown"
          onMouseEnter={handleCategoryMouseEnter}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <summary
            className="header__category-trigger header__helmet-armor"
            onClick={(e) => {
              handleCategoryToggle(e);
            }}
          >
            Helmet and Armor
          </summary>
          <ul className="header__category-list">
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Helmets")}
              >
                Helmets
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Body Armor")}
              >
                Body Armor
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Shields")}
              >
                Shields
              </button>
            </li>
          </ul>
        </details>
        <details
          className="header__category-dropdown"
          onMouseEnter={handleCategoryMouseEnter}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <summary
            className="header__category-trigger header__knives"
            onClick={(e) => {
              handleCategoryToggle(e);
            }}
          >
            Knives
          </summary>
          <ul className="header__category-list">
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Fantasy Knives")}
              >
                Fantasy Knives
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Combat Knives")}
              >
                Combat Knives
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Pocket Knives")}
              >
                Pocket Knives
              </button>
            </li>
          </ul>
        </details>
        <details
          className="header__category-dropdown"
          onMouseEnter={handleCategoryMouseEnter}
          onMouseLeave={handleCategoryMouseLeave}
        >
          <summary
            className="header__category-trigger header__swords"
            onClick={(e) => {
              handleCategoryToggle(e);
            }}
          >
            Swords
          </summary>
          <ul className="header__category-list">
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Katanas")}
              >
                Katanas
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSelectCategory("Medieval Swords")}
              >
                Medieval Swords
              </button>
            </li>
          </ul>
        </details>
      </div>
      {isSignedIn ? (
        <div className="header__signed-in">
          <div className="header__user-menu" onBlur={handleUserMenuBlur}>
            <button
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
              className="header__user-menu-trigger"
              onClick={handleUserMenuToggle}
              type="button"
            >
              <img
                alt="Account menu"
                className="header__user-icon"
                src={userIcon}
              />
            </button>
            {isUserMenuOpen && (
              <ul className="header__user-menu-list">
                <li>
                  <button
                    onClick={() => handleUserMenuSelect(onAccountClick)}
                    type="button"
                  >
                    Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleUserMenuSelect(onOrdersClick)}
                    type="button"
                  >
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleUserMenuSelect(onWishListClick)}
                    type="button"
                  >
                    Wish List
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleUserMenuSelect(onLogOutClick)}
                    type="button"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
          {showCartButton && (
            <>
              <img
                className="header__shopping-cart-signed-in"
                src={shoppingCartButton}
                // onClick={onCartClick} opens the form where you are take to the checkout popup form
                onClick={onCartClick}
              />
              {cartQuantity > 0 && (
                <span
                  aria-label={`${cartQuantity} items in cart`}
                  className="header__sign-in-cart-quantity"
                >
                  {cartQuantity}
                </span>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="header__sign-in-up">
          <button
            className="header__sign-in-btn"
            onClick={onSignInClick}
            type="button"
          >
            Sign In
          </button>
          <button
            className="header__sign-up-btn"
            onClick={onSignUpClick}
            type="button"
          >
            Sign Up
          </button>
          {showCartButton && (
            <button
              aria-label="Shopping cart"
              className="header__check-out-btn"
              onClick={onCartClick}
              type="button"
            >
              <img alt="" src={shoppingCartButton} />
              {cartQuantity > 0 && (
                <span
                  aria-label={`${cartQuantity} items in cart`}
                  className="header__cart-quantity"
                >
                  {cartQuantity}
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;

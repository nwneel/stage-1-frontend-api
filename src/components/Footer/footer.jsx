import "./footer.css";
import blackArrowRight from "../../assets/arrow-right.svg";

const Footer = ({ onAboutClick, onShippingClick }) => {
  return (
    <div>
      <footer className="footer">
        <div className="footer__information">
          <div className="footer__discount">
            <p className="footer__discount-title">Sign Up and get 5% off.</p>
            <form className="footer__discount-form">
              <input
                type="email"
                placeholder="Your email"
                className="footer__discount-email"
              />
              <button type="submit" className="footer__discount-submit-btn">
                <img alt="Submit" src={blackArrowRight} />
              </button>
            </form>
          </div>
          <div className="footer__contact-info">
            <section className="footer__contact-information">
              <h3>Contact Us</h3>
              <a className="footer__email" href="mailto:nwneel@gmail.com">
                nwneel@gmail.com
              </a>
              <a className="footer__phone-number" href="tel:208-446-4897">
                208-446-4897
              </a>
            </section>
            <section className="footer__further-information">
              <h3>Further Info</h3>
              <a
                className="footer__about-us"
                href="/about-us"
                onClick={(event) => {
                  event.preventDefault();
                  onAboutClick();
                }}
              >
                About Us
              </a>
              <a
                className="footer__shipping"
                href="/shipping-and-returns"
                onClick={(event) => {
                  event.preventDefault();
                  onShippingClick();
                }}
              >
                Shipping and Returns
              </a>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

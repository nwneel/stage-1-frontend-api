# Stage-1-Frontend-API

Project Description:

An ecommerce store where users can order a variety of items from my store. When the user enters the page, they can search for products using the search box which will take them to products that match the description of the items they are looking for and add items to the shopping cart as well as remove items from the shopping cart. The page also features a drop-down menu that shows you different categories of the products available. I created an API key through Shipstation which will generate shipping costs by carrier which is determined by the weight and dimensions of the product and where the order is going. The API interaction occurs after you enter in the shipping information which provides multiple shipping options from different carriers. .

Project Pitch video: https://drive.google.com/file/d/1mcCxw2_sF0CMBE9yC8TWMWcxm-721b5N/view?usp=sharing

## Technologies

- React.js for the user interface
- Vite for the development server and production build
- JavaScript and CSS
- API integrations includes ShipStation shipping rates

## Download and install

To run locally, install dependencies with `npm install`, then start the development server with `npm run dev`.

Requirements: Node.js and npm.

### Configure shipping rates locally

1. Copy `.env.example` to `.env.local`.
2. Set `SHIPSTATION_V2_API_KEY` in `.env.local` to your ShipStation **API v2** key.
3. Start (or restart) Vite with `npm run dev`. Environment changes require a restart.

The Vite development and preview proxies attach the `API-Key` header on the server when forwarding `/shipstation` requests to `https://api.shipstation.com`. Keep the key out of frontend source files and never commit `.env.local`. Do not prefix new secret variables with `VITE_`, which makes them available to browser code. The previous `VITE_SHIPSTATION_V2_API_KEY` variable is still accepted for compatibility; migrate it to `SHIPSTATION_V2_API_KEY`.

If no key is configured, shipping requests return a configuration error instead of sending an empty key to ShipStation. If ShipStation still returns **401**, verify that the key is active and was generated for API v2, not the v1 API key/secret pair. See [ShipStation authentication](https://docs.shipstation.com/authentication).

Vite starts the development server on port 3000 and opens the app in your browser. To create and inspect a local production build, run `npm run build`, then `npm run preview`.

## Deploy

The production build deploys the frontend only. Features that call an API (such as authentication, shipping rates, or email) also require their API service to be deployed and the frontend's API URLs configured for that service.

Deployment Link: https://nwneel.github.io/stage-1-frontend-api/;

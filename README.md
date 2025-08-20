✨ **Currency Converter API**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

🚀 A robust and efficient Currency Converter API built with Express.js, designed to provide real-time currency exchange rates and conversion capabilities. Seamlessly integrate currency features into your applications!

---

# Currency Converter API

## Overview

This Express.js API provides endpoints for retrieving the latest currency exchange rates and performing currency conversions, leveraging an external currency data provider.

## Features

- **Real-time Rates**: Fetches the most current exchange rates from a reliable external API.
- **Specific Rate Lookup**: Allows querying exchange rates between a specified base and target currency.
- **Currency Conversion**: Converts a given amount from a base currency to a target currency.
- **Input Validation**: Ensures robust data integrity using `express-validator` for all incoming requests.
- **Modular Design**: Organized routes and clear separation of concerns for maintainability.

## Technologies Used

| Technology          | Description                                                                                                                                          |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js             | JavaScript runtime environment                                                                                                                       |
| Express.js          | Fast, unopinionated, minimalist web framework                                                                                                        |
| `express-validator` | Middleware for request data validation                                                                                                               |
| `dotenv`            | Loads environment variables from a `.env` file                                                                                                       |
| `nodemon`           | Tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. |

## Getting Started

### Installation

To set up and run the project locally, follow these steps:

1.  👯 Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  📂 Navigate into the project directory:
    ```bash
    cd Currency\ Converter\ API
    ```
3.  📦 Install the necessary dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory of the project and populate it with the following required environment variables:

| Variable           | Example Value                    | Description                                               |
| :----------------- | :------------------------------- | :-------------------------------------------------------- |
| `CURRENCY_API_URL` | `https://api.currencyapi.com/v3` | Base URL for the external currency API.                   |
| `CURRENCY_API_KEY` | `YOUR_ACTUAL_API_KEY_HERE`       | Your API key for accessing the external currency service. |

## API Documentation

### Base URL

`http://localhost:3000`

### Endpoints

#### GET /api/currency/latest

Retrieves the latest currency exchange rates.

**Request**:
No request body required.

**Response**:

```json
{
  "success": true,
  "latestRate": {
    "meta": {
      "last_updated_at": "2024-07-30T23:59:59Z"
    },
    "data": {
      "EUR": {
        "code": "EUR",
        "value": 0.908075
      },
      "GBP": {
        "code": "GBP",
        "value": 0.76793
      },
      "USD": {
        "code": "USD",
        "value": 1
      }
      // ... more currencies
    }
  }
}
```

**Errors**:

- `500 Internal Server Error`: An unexpected error occurred on the server.

#### GET /api/currency/rate

Retrieves the exchange rate between a specified base and target currency. Note: This endpoint expects a JSON body for validation purposes, even though it's a GET request.

**Request**:

```json
{
  "target": "USD",
  "base": "EUR"
}
```

**Request fields**:

- `target` (string, required): The currency code to convert to (e.g., "USD").
- `base` (string, required): The currency code to convert from (e.g., "EUR").

**Response**:

```json
{
  "success": true,
  "data": {
    "base": 0.908075,
    "target": 1
  }
}
```

**Errors**:

- `400 Bad Request`:
  - `{ "errors": [ { "type": "field", "value": "", "msg": "Target Currency is required", "path": "target", "location": "body" } ] }`: If `target` currency is missing or invalid.
  - `{ "errors": [ { "type": "field", "value": "", "msg": "Base Currency is required", "path": "base", "location": "body" } ] }`: If `base` currency is missing or invalid.
- `500 Internal Server Error`: An unexpected error occurred on the server, often due to an invalid currency code not recognized by the external API.

#### POST /api/currency/convert

Converts a specified amount from a base currency to a target currency.

**Request**:

```json
{
  "base": "USD",
  "target": "EUR",
  "amount": 100
}
```

**Request fields**:

- `base` (string, required): The currency code of the amount being converted (e.g., "USD").
- `target` (string, required): The currency code to convert the amount to (e.g., "EUR").
- `amount` (number, required): The amount to convert.

**Response**:

```json
{
  "success": true,
  "data": {
    "convertedValue": 90.8075
  }
}
```

**Errors**:

- `500 Internal Server Error`: An unexpected error occurred on the server, typically if currency codes are invalid or the external API is unreachable.

## Usage

After setting up the project and starting the server, you can interact with the API using tools like cURL, Postman, or by integrating it into your applications.

1.  **Start the Server**:

    ```bash
    npm run dev
    # or
    npm start
    ```

    The server will be running on `http://localhost:3000`.

2.  **Example: Get Latest Currency Rates**

    ```bash
    curl http://localhost:3000/api/currency/latest
    ```

3.  **Example: Get Specific Exchange Rate**
    To get the rate of 1 EUR in USD:

    ```bash
    curl -X GET -H "Content-Type: application/json" -d '{"target": "USD", "base": "EUR"}' http://localhost:3000/api/currency/rate
    ```

4.  **Example: Convert an Amount**
    To convert 100 USD to EUR:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"base": "USD", "target": "EUR", "amount": 100}' http://localhost:3000/api/currency/convert
    ```

## Contributing

We welcome contributions to enhance this project! To contribute:

1.  🍴 Fork the repository.
2.  🌿 Create a new branch (`git checkout -b feature/your-feature-name`).
3.  ✨ Make your changes and commit them (`git commit -m 'feat: Add new feature'`).
4.  🚀 Push to the branch (`git push origin feature/your-feature-name`).
5.  📬 Open a Pull Request.

Please ensure your code adheres to the existing style and conventions.

## License

This project is licensed under the ISC License.

## Author Info

- **Godstime Pious**:[X (Twitter)](https://x.com/GodstimePius)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)

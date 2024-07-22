# Restaurant Input and Output System

## Introduction

This project aims to manage and display restaurant information effectively. It utilizes a YAML file to store restaurant data and converts README.md files into HTML for easy viewing. The system provides APIs to fetch restaurant details and convert menu descriptions into interactive formats.

## Getting Started

To set up and run this project locally, follow these steps:

1. Clone the repository using `git clone <repository_url>`.
2. Change into the project directory with `cd Restaurant-Input-and-Output`.
3. Install the necessary dependencies by running `npm install`.

## API Endpoints

### Fetch All Restaurants

- **Endpoint:** `/api`
- **Method:** `GET`
- **Description:** Retrieves a list of all restaurants defined in the `restaurants.yaml` file.

### Fetch Specific Restaurant Details

- **Endpoint:** `/api/menu?restaurant={restaurant_name}`
- **Method:** `GET`
- **Parameters:** Replace `{restaurant_name}` with the actual name of the restaurant.
- **Description:** Returns detailed information about a specific restaurant, including its menu.

### Convert README Files to HTML

- **Endpoint:** `/menu?restaurant={restaurant_file_name}`
- **Method:** `GET`
- **Parameters:** Replace `{restaurant_file_name}` with the name of the README file without the extension.
- **Description:** Converts the contents of a README.md file located in the `menu` directory into HTML format.

## Contributing

Contributions to improve the functionality and usability of this project are welcome. Please feel free to submit pull requests or report issues.

## License

This project is licensed under the MIT License. For more information, see the `LICENSE` file included in this repository.
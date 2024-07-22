document.addEventListener("DOMContentLoaded", async () => {
    // Function to create restaurants HTML
    function createRestaurantsHTML(restaurants) {
        return restaurants.map(restaurant => `
            <div class="card-restaurants">
                <div class="content">
                    <h3><span class="title">${restaurant.name}</span></h3>
                    <a href="${restaurant.website_address}">
                        <img src="${restaurant.images}" alt="${restaurant.name}" width="70%" height="50%">
                    </a>
                    <p class="email details">${restaurant.email_address}</p>
                    <p class="phone-number details">${restaurant.phone}</p>
                    <p class="web details">${restaurant.address}</p>
                    <p class="web details">${restaurant.website_address}</p>
                    <a class="action" href="#restaurant=${restaurant.name}">
                        Restaurant Menu <span aria-hidden="true"> → </span>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Function to load and display restaurants
    async function findRestaurants() {
        const restaurantsReference = document.querySelector(".restaurants");

        if (!restaurantsReference) {
            console.error("Restaurants container not found.");
            return;
        }

        try {
            const results = await axios.get("/api/restaurants");
            const data = results.data;

            if (data && Array.isArray(data)) {
                restaurantsReference.innerHTML = createRestaurantsHTML(data);
            } else {
                console.error("Invalid data format received.");
                restaurantsReference.innerHTML = "No restaurants data available.";
            }
        } catch (error) {
            console.error("Error fetching restaurants data:", error);
            restaurantsReference.innerHTML = "An error occurred while fetching restaurants.";
        }
    }

    // Function to create restaurant menu HTML
    function createRestaurantMenuHTML(menu) {
        return menu.categories.map(category => `
            <h3 class="title">${category.name}</h3>
            <div class="category-items">
                ${category.items.map(item => `
                    <div class="card-menu">
                        <div class="content">
                            <div class="details">
                                <p><strong>${item.name}</strong></p>
                                <p><strong>R</strong> ${item.price}.00</p>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // Function to load and display the restaurant menu
    async function findRestaurantMenu(restaurant) {
        const menuReference = document.querySelector(".restaurant-menu");

        if (!menuReference) {
            console.error("Restaurant menu container not found.");
            return;
        }

        try {
            const results = await axios.get(`/api/menu?restaurant=${restaurant}`);
            const data = results.data;

            if (data) {
                menuReference.innerHTML = createRestaurantMenuHTML(data);
                menuReference.style.display = 'block';
            } else {
                console.error("Invalid menu data received.");
                menuReference.innerHTML = `No menu data available for ${restaurant}.`;
            }
        } catch (error) {
            console.error(`Error fetching menu data for ${restaurant}:`, error);
            menuReference.innerHTML = `An error occurred while fetching menu data for ${restaurant}.`;
        }
    }

    // Function to load the restaurant menu based on the current hash
    function loadRestaurantMenu() {
        const hash = window.location.hash.substring(1);
        const urlParams = new URLSearchParams(hash);
        const restaurantName = urlParams.get("restaurant");

        if (restaurantName) {
            findRestaurantMenu(restaurantName);
        }
    }

    // Event listener for hash changes
    window.addEventListener('hashchange', loadRestaurantMenu);

    // Load the initial data
    await findRestaurants();
    loadRestaurantMenu();
});



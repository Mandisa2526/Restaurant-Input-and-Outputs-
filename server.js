import express  from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml'; // Make sure you're using js-yaml
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import { engine } from 'express-handlebars';


const app = express();
const port = process.env.PORT || 4500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views'));

// Parse YAML file containing restaurant data
const restaurantsFilePath = join(__dirname ,'menu' ,'restaurants.yaml',);
let restaurantsData;

try {
    const fileContents = readFileSync(restaurantsFilePath, 'utf8');
    restaurantsData = load(fileContents); // Ensure using yaml.load
} catch (e) {
    console.log(e);
}

// Endpoint to get the list of restaurants
app.get('/api/restaurants', (req, res) => {
    if (restaurantsData && restaurantsData.restaurants) {
        res.json(restaurantsData.restaurants);
    } else {
        res.status(500).send('Error loading restaurants data');
    }
});

// Endpoint to get the menu for a specific restaurant
app.get('/api/menu', (req, res) => {
    const restaurantName = req.query.restaurant;
    if (restaurantName && restaurantsData && restaurantsData.restaurants) {
        const restaurant = restaurantsData.restaurants.find(r => r.name === restaurantName);
        if (restaurant) {
            res.json({ categories: restaurant.categories });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } else {
        res.status(400).send('Invalid restaurant name');
    }
});


//Root route to display the menu
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

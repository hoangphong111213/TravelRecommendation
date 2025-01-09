// Function to fetch data from the JSON
function fetchData() {
    fetch('travel_recommendation_api.json')  // URL to your JSON file
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            console.log(data);  // Log the data to check if it's being fetched correctly
        })
        .catch(error => {
            console.error('Error fetching data:', error);  // Handle any errors
        });
}

// Function to display recommendations based on category
function displayRecommendations(data, category) {
    // Check if the category exists in the data object
    if (!data[category]) {
        console.log(`No recommendations found for category: ${category}`);
        return;
    }

    const recommendations = data[category];

    // Retrieve the container for the results
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Loop through the recommendations and display them
    recommendations.forEach(item => {
        if (item.cities) {
            // Handle nested structure for countries with cities
            const citiesHtml = item.cities.map(city => `
                <div class="card">
                    <img src="${city.imageUrl}" alt="${city.name}" class="card-image" />
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                </div>
            `).join('');

            resultsContainer.innerHTML += `
                <div class="category">
                    <h2>${item.name}</h2>
                    <div class="card-container">${citiesHtml}</div>
                </div>
            `;
        } else {
            // Handle single-level structure (e.g., temples or beaches)
            resultsContainer.innerHTML += `
                <div class="card">
                    <img src="${item.imageUrl}" alt="${item.name}" class="card-image" />
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
        }
    });
}

// Function to handle search and display recommendations
function handleSearch() {
    const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase().trim();
    
    fetch('travel_recommendation_api.json')  // Fetch the data
        .then(response => response.json())
        .then(data => {
            // Match search term with corresponding category
            switch (searchTerm) {
                case 'beach':
                case 'beaches':
                    displayRecommendations(data, 'beaches');
                    break;
                case 'temple':
                case 'temples':
                    displayRecommendations(data, 'temples');
                    break;
                case 'country':
                case 'countries':
                    displayRecommendations(data, 'countries');
                    break;
                default:
                    console.log('No match found for the search term.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Add event listener to the search button
document.querySelector('#search').addEventListener('click', handleSearch);

function handleClear() {
    document.getElementById('results').innerHTML = ''
    document.querySelector('input[type="text"]').value=''
}
document.querySelector('#clear').addEventListener('click', handleClear);
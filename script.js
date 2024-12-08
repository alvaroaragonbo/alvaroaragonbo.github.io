// script.js

document.getElementById('searchButton').addEventListener('click', function() {
    var query = document.getElementById('searchBar').value;
    if(query) {
        searchGame(query);
    } else {
        alert('Please enter a game title.');
    }
});

function searchGame(query) {
    let userInput = query("Enter your username with tag (e.g., Username#Tag):"); // Split the input into username and tag
    let [username, tag] = userInput.split("#"); // Construct the URL with the provided API key 
    let apiKey = "a"; 
    let apiUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}?api_key=${apiKey}`;
    // Placeholder API URL - replace this with your actual API endpoint;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.results && data.results.length > 0) {
                displayResult(data.results[0]); // Display the first result
            } else {
                document.getElementById('result').innerHTML = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = 'An error occurred while fetching data.';
        });
}

function displayResult(game) {
    // Display game information
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>${game.title}</h2>
        <p>Release Date: ${game.release_date}</p>
        <p>${game.description}</p>
        <img src="${game.image_url}" alt="${game.title}" width="200">
    `;
}

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
    // Placeholder API URL - replace this with your actual API endpoint
    var apiUrl = 'https://api.example.com/games?search=' + encodeURIComponent(query);

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

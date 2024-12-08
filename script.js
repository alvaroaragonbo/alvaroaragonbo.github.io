// script.js

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchBar').value.trim();

    if (query) {
        searchAccount(query);
    } else {
        alert('Please enter a Username#Tag.');
    }
});

function searchAccount(query) {
    const parts = query.split('#');
    if (parts.length !== 2) {
        alert('Please enter the Username and Tag in the format Username#Tag.');
        return;
    }

    const username = parts[0];
    const tag = parts[1];

    // Construct the API Gateway URL
    const apiUrl = 'https://vboese1bxe.execute-api.us-east-1.amazonaws.com/prod/getaccount?username=${encodeURIComponent(username)}&tag=${encodeURIComponent(tag)}';

    // Clear previous result and display loading message
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error ${response.status}: ${response.statusText}');
            }
            return response.json();
        })
        .then(data => {
            if (data.status && data.status.status_code !== 200) {
                resultDiv.innerHTML = 'Error: ${data.status.message}';
            } else {
                displayResult(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred: ${error.message}';
        });
}

function displayResult(account) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>${account.gameName}#${account.tagLine}</h2>
        <p><strong>PUUID:</strong> ${account.puuid}</p>
        <p><strong>Game Name:</strong> ${account.gameName}</p>
        <p><strong>Tag Line:</strong> ${account.tagLine}</p>
    `;
}
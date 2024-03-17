// Define API key
const API_KEY = "--your-api-key";

// Get DOM elements
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');

// Function to handle fetching response from API
async function getMessage() {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputElement.value }],
            max_tokens: 100
        })
    });

    const data = await response.json();

    // Display output and update history
    if (data.choices[0].message.content) {
        outPutElement.textContent = data.choices[0].message.content;
        historyElement.innerHTML += `<p>${inputElement.value}</p>`;
    }
}

// Event listener for submit button click
submitButton.addEventListener('click', getMessage);

// Event listener for Enter key press in input
inputElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getMessage();
    }
});

// Event listener for clearing input
document.querySelector('button').addEventListener('click', function() {
    inputElement.value = "";
});

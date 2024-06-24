document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('correctButton').addEventListener('click', function () {
        var textInput = document.getElementById('textInput').value;
        correctGrammar(textInput);
    });
});
function correctGrammar(text) {
    const apiKey = 'API_KEY_HERE';
    const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    const tooltip = document.getElementById('grammarTooltip');

    // Make API request to correct grammar
    fetch(openaiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: text,
            temperature: 0,
            max_tokens: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ['\n']
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response.json();
    })
    .then(data => {
        const correctedText = data.choices[0].text.trim();
        tooltip.textContent = 'Corrected Text: ' + correctedText;
    })
    .catch(error => {
        console.error('Error:', error);
        tooltip.textContent = 'Error: Failed to correct grammar';
    });
}

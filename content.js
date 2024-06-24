document.addEventListener('input', function(event) {
    var textInput = event.target.value;
    correctGrammar(textInput);
  });
  
  function correctGrammar(text) {
    const apiKey = 'API_KEY__HERE';
    const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const tooltipId = 'grammarTooltip';
  
    // Remove existing tooltip if it exists
    const existingTooltip = document.getElementById(tooltipId);
    if (existingTooltip) {
      existingTooltip.remove();
    }
  
    // Create a new tooltip element
    const tooltip = document.createElement('div');
    tooltip.id = tooltipId;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#ffffff';
    tooltip.style.border = '1px solid #cccccc';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    tooltip.style.zIndex = '9999'; // Ensure tooltip is on top of other elements
    tooltip.textContent = 'Loading...';
    
    // Append tooltip to the document body
    document.body.appendChild(tooltip);
  
    // Position the tooltip relative to the text input field
    const inputField = document.activeElement;
    const inputRect = inputField.getBoundingClientRect();
    tooltip.style.top = inputRect.bottom + 'px';
    tooltip.style.left = inputRect.left + 'px';
  
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
    .then(response => response.json())
    .then(data => {
      const correctedText = data.choices[0].text.trim();
      tooltip.textContent = 'Corrected Text: ' + correctedText;
    })
    .catch(error => {
      console.error('Error:', error);
      tooltip.textContent = 'Error: Failed to correct grammar';
    });
  }
  

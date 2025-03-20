const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyBtn = document.getElementById("copy-btn");
const shareTwitterBtn = document.getElementById("share-twitter-btn");
const exportBtn = document.getElementById("export-btn");

// Fetch a random quote from the API
async function fetchRandomQuote() {
    try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        const data = await response.json();

        const quote = data.data.content; // Get quote content
        const author = data.data.author; // Get author

        quoteText.textContent = `"${quote}"`; // Display quote
        quoteAuthor.textContent = `- ${author}`; // Display author
    } catch (error) {
        quoteText.textContent = "Sorry, something went wrong."; // Error message
        console.error(error);
    }
}

// Change quote on "New Quote" button click
newQuoteBtn.addEventListener("click", fetchRandomQuote);

// Copy the quote to the clipboard
copyBtn.addEventListener("click", () => {
    const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(quote).then(() => {
        alert("Quote copied to clipboard!"); // Success message
    });
});

// Share the quote on Twitter
shareTwitterBtn.addEventListener("click", () => {
    const quote = encodeURIComponent(quoteText.textContent);
    const author = encodeURIComponent(quoteAuthor.textContent);
    const url = `https://twitter.com/intent/tweet?text=${quote}%20${author}`;
    window.open(url, "_blank"); // Open Twitter with prefilled quote
});

// Fetch a random quote when the page loads
fetchRandomQuote();

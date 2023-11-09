let quotes;
let authors;

$(document).ready(function () {
    $.ajax({
        url: "./quotes.json",
        dataType: "json",
        success: function (data) {
            quotes = data.quotes.map((quoteData) => quoteData.quote);
            authors = data.quotes.map((quoteData) => quoteData.author);
            generateNewQuote();
        },
        error: function (error) {
            console.log("Error fetching quotes.json:", error);
        }
    });
});

function generateNewQuote() {
    if (!quotes || !authors) {
        console.error("Quotes data not loaded yet.");
        return;
    }

    const randomNumber = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomNumber];
    const author = authors[randomNumber];

    $("#text").html(`<i class="fa-solid fa-quote-left"></i> ${quote} <i class="fa-solid fa-quote-right"></i>`);
    $("#author").text(`~ ${author}`);
    $("#tweet-quote").attr("href", `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`);

    const mainColor = getRandomColor();
    const secondaryColor = getDarkerColor(mainColor);

    $("body").css("--main-color", mainColor);
    $("body").css("--secondary-color", secondaryColor);
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgb(${r},${g},${b})`;
}

function getDarkerColor(color) {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    const darkerR = Math.max(0, r - 60);
    const darkerG = Math.max(0, g - 60);
    const darkerB = Math.max(0, b - 60);
    return `rgb(${darkerR},${darkerG},${darkerB})`;
}

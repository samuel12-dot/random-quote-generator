// ===================== QUOTES ARRAY =====================
const quotes = [
  { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { content: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { content: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
  { content: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { content: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },
  { content: "Dream bigger. Do bigger.", author: "Unknown" },
  { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "Great things never come from comfort zones.", author: "Unknown" },
  { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { content: "Failure is not the opposite of success; it’s part of success.", author: "Arianna Huffington" },
  { content: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { content: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
  { content: "Act as if what you do makes a difference. It does.", author: "William James" },
  { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" }
];

// ===================== FAVORITES =====================
let favorites = [];

// Check if a quote exists in favorites
const checkExistence = (content, authorName) => {
  return favorites.some(q => q.content === content && q.author === authorName);
};

// Update displayed quote and author
const updateQuote = (content, authorName) => {
  quote.innerText = content;
  author.innerText = authorName;

  let heartIcon = favorite.querySelector("i");
  const existsInFavorites = checkExistence(content, authorName);

  if (existsInFavorites) {
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid');
  } else {
    heartIcon.classList.remove('fa-solid');
    heartIcon.classList.add('fa-regular');
  }
};

// ===================== RANDOM QUOTE =====================
function getQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  updateQuote(random.content, random.author || "Unknown");
}

// ===================== FAVORITES HANDLING =====================
const displayFavorites = () => {
  list.innerHTML = '';
  if (favorites.length === 0) {
    const msg = document.createElement('p');
    msg.textContent = "You have not added any quote yet";
    list.appendChild(msg);
    return;
  }

  favorites.forEach((q, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${q.content} - ${q.author}`;
    list.appendChild(listItem);
  });
};

const saveFavoritesToLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const toggleFavorite = () => {
  const content = quote.innerText;
  const authorName = author.innerText;
  let existsInFavorites = checkExistence(content, authorName);

  if (existsInFavorites) {
    favorites = favorites.filter(q => !(q.content === content && q.author === authorName));
  } else {
    favorites.push({ content, author: authorName });
  }

  saveFavoritesToLocalStorage();
  displayFavorites();
  updateQuote(content, authorName);
};

const clearFavorites = () => {
  localStorage.removeItem('favorites');
  favorites = [];
  displayFavorites();

  favoriteContainer.style.display = 'none';
  list.style.display = 'none';

  let heartIcon = favorite.querySelector("i");
  heartIcon.classList.remove('fa-solid');
  heartIcon.classList.add('fa-regular');
};

// ===================== UTILITIES =====================
const copyToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

// ===================== DOM + EVENTS =====================
window.onload = () => {
  // DOM Elements
  quote = document.getElementById('quote');
  author = document.getElementById('author');
  button = document.getElementById('button');
  favorite = document.getElementById('favorite');
  list = document.getElementById('list-of-favorite-quotes');
  copyButton = document.getElementById('copy');
  showAllListOfFavorites = document.getElementById('show-list');
  clearButton = document.getElementById('clear-button');
  closeButton = document.getElementById('close-button');
  favoriteContainer = document.querySelector('.favorite-container');

  // Hide initially
  list.style.display = 'none';
  favoriteContainer.style.display = 'none';

  // Event Listeners
  favorite.addEventListener('click', toggleFavorite);
  quote.addEventListener('click', () => copyToClipboard(quote.innerText));
  copyButton.addEventListener('click', () => copyToClipboard(`${quote.innerText} - ${author.innerText}`));
  showAllListOfFavorites.addEventListener('click', () => {
    displayFavorites();
    list.style.display = 'block';
    favoriteContainer.style.display = 'block';
  });
  closeButton.addEventListener('click', () => {
    list.style.display = 'none';
    favoriteContainer.style.display = 'none';
  });
  clearButton.addEventListener('click', clearFavorites);
  button.addEventListener('click', getQuote);

  // Load stored favorites
  let storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    displayFavorites();
  }

  // Fetch first random quote
  getQuote();
};

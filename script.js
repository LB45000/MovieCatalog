// Add a listener for the "DOMContentLoaded" event to ensure that the script runs only after the DOM has fully loaded.
document.addEventListener("DOMContentLoaded", function() {
    // Call the showCards function to display movie cards on the page immediately after the DOM has loaded.
    showCards();

    // Add an input event listener to the search input element. This will trigger the handleSearch function whenever the user types or modifies the input, allowing for dynamic search functionality.
    document.getElementById("searchInput").addEventListener("input", handleSearch);

    // Add a change event listener to the genre select element. This will trigger the handleFilter function whenever the user selects a different genre, allowing for filtering movies by genre.
    document.getElementById("genreSelect").addEventListener("change", handleFilter);

    // Add a change event listener to the sort select element. This triggers the handleSort function whenever the user selects a different sort option, enabling sorting of movie listings.
    document.getElementById("sortSelect").addEventListener("change", handleSort);
});

// Define a movies object containing arrays of movie objects for different genres. Each movie object includes the movie's title, a summary of its plot, and a URL to its poster image. This data structure allows for easy addition or removal of movies and genres.
let movies = {
    comedy: [
        {title: "Monty Python and the Holy Grail (1975)", summary: "King Arthur and his Knights of the Round Table embark on a surreal, low-budget search for the Holy Grail, encountering many, very silly obstacles.", poster: "https://th.bing.com/th/id/OIP.9ONMbTVCXPNte-7oC26myAHaKq?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"},
        {title: "Dumb and Dumber (1994)", summary: "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQNlRSYzHc24txQsVYY0XlCYJrm-WuhK95Q&s"},
        {title: "Airplane! (1980)", summary: "After the crew becomes sick with food poisoning, a neurotic ex-fighter pilot must safely land a commercial airplane full of passengers.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQATZBWTDxzZFzlTOwYrjZs5xxWE9Gr2ICiWQ&s"},
        {title: "The Big Lebowski (1998)", summary: "Jeff The Dude Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqXoc_bEtuOi9vyLQGVxP86LvOhB0bkGRsYw&s"},
        {title: "Planes, Trains & Automobiles (1987)", summary: "A Chicago advertising man must struggle to travel home from New York for Thanksgiving, with a lovable oaf of a shower-curtain-ring salesman as his only companion.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIx9ptJ1ZBOSNkJvK84-aR-WK11QdJvN4EzQ&s"},
    ],
    horror: [
        {title: "The Exorcist (1973)", summary: "When a young girl is possessed by a mysterious entity, her mother seeks the help of two Catholic priests to save her life.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu256-EtOCqnKghe2a9DQu-iYDZou7tzKM1w&s"},
        {title: "Halloween (1978)", summary: "Fifteen years after murdering his sister on Halloween night 1963, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield, Illinois to kill again.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToawW63bZFr-FkC7mFPbbSeTX9w6MxFq_u4w&s"},
        {title: "Evil Dead (1981)", summary: "Five friends travel to a cabin in the woods, where they unknowingly release flesh-possessing demons.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasDMS6OpyVzXWhHRJljjYqgOdF-kztQGUGA&s"},
        {title: "A Nightmare on Elm Street (1984)", summary: "Teenager Nancy Thompson must uncover the dark truth concealed by her parents after she and her friends become targets of the spirit of a serial killer with a bladed glove in their dreams, in which if they die, it kills them in real life.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxUfer4E213oRRo3mDXdZ49AXYtwzySF_zw&s"},
        {title: "The Omen (1976)", summary: "Mysterious deaths surround an American ambassador. Could the child that he is raising actually be the Antichrist?", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv60POEy96stg86IpiGxM9mlVWvIuhSkiXCw&s"},
    ],
    action: [
        {title: "Dune (1984)", summary: "A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis to free their desert world from the emperor's rule.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYQJvgLKefb8sQ71MoYuFYyY3c0-8Xai7-w&s"},
        {title: "Gladiator (2000)", summary: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrCvElZx8V3plLMSy0qjrnmUPaLVzuCowrsA&s"},
        {title: "Total Recall (1990)", summary: "When a man goes for virtual vacation memories of the planet Mars, an unexpected series of events forces him to go to the planet for real.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkj-S7F-rLMQ8PSS61xZJLT9Gj-0FSxhJJDQ&s"},
        {title: "GoldenEye (1995)", summary: "Years after a friend and fellow 00 agent is killed on a joint mission, a secret space based weapons program known as GoldenEye is stolen. James Bond is assigned to stop a Russian crime syndicate from using the weapon.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5s76tzmFnSdz2yNHbsFwTaWp1qwB_YzCJ1Q&s"},
        {title: "Die Hard (1988)", summary: "A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gdLsjvqXoaGtXQHZo_MFCwbO9WPUHWB_eA&s"},
    ]
};

// Defines the main function for displaying movie cards with optional filtering, searching, and sorting.
function showCards(filterGenre = "", searchTerm = "", sortKey = "") {
    // Selects the container element where movie cards will be displayed.
    const cardContainer = document.getElementById("card-container");
    // Clears the container of any previous movie cards to prepare for a new set of cards.
    cardContainer.innerHTML = "";

    // Creates a deep copy of the movies object to prevent mutating the original dataset during operations.
    let filteredMovies = JSON.parse(JSON.stringify(movies));

    // Applies genre filtering if a specific genre is provided and exists within the movies dataset.
    if (filterGenre && movies[filterGenre]) {
        filteredMovies = { [filterGenre]: movies[filterGenre] };
    }

    // Applies text search filtering by movie titles if a search term is provided.
    if (searchTerm) {
        Object.keys(filteredMovies).forEach(genre => {
            filteredMovies[genre] = filteredMovies[genre].filter(movie => 
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
    }

    // Applies sorting to each genre based on the provided sort key (assumes sorting by title if sortKey is provided).
    if (sortKey) {
        Object.keys(filteredMovies).forEach(genre => {
            filteredMovies[genre].sort((a, b) => a.title.localeCompare(b.title));
        });
    }

    // Iterates through the filtered and sorted movies to create and display cards for each.
    Object.keys(filteredMovies).forEach(genre => {
        filteredMovies[genre].forEach(movie => {
            // Clones a template card, makes it visible, and populates it with movie details.
            const card = document.querySelector(".card").cloneNode(true);
            card.style.display = "block";
            card.querySelector("h2").textContent = movie.title;
            card.querySelector(".movie-summary").textContent = movie.summary;

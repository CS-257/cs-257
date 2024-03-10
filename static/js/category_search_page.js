//VARIABLES CREATED
//var category


// Wait until DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    buildCategoryElementList(category,'search-list') // Generates list of category elements
    
    // Add the 'click' event listener to handle any 'click' action from user
    charactersList.addEventListener('click', function(event) {

        // Check if the clicked element is a list type
        if (event.target.tagName === 'LI') {

            var charactersName = event.target.dataset.characters;
	        // Call function that displays character information on click
            toggleCharactersInformation(charactersName, event.target);

        }

    });
    

    /*
    // Get the search input item from the HTML doc 
    var searchInput = document.getElementById('search');

    // Add event listener for the search action 
    searchInput.addEventListener('input', function() {
        var searchValue = searchInput.value.toLowerCase();
        // Get all items that are of type list from the page
        var charactersItems = charactersList.querySelectorAll('li');

        charactersItems.forEach(function(item) {
            var charactersName = item.dataset.characters.toLowerCase();
            // Check if the character name includes the search value
            if (charactersName.includes(searchValue)) {
                // If the character name matches the search value, show the list item
                item.style.display = 'block';
            } else {
                // If the character name does not match the search value, hide the list item
                item.style.display = 'none';
                // Check if there is an info box associated with the list item
                var infoBox = item.nextElementSibling;
                if (infoBox && infoBox.classList.contains('info-box')) {
                    // If an info box exists, remove it
                    infoBox.remove();
                }
            }
        });
    });*/
});



//fetches names of all elements in a category (e.g. all species, all characters, etc.)
//then adds these names to the display as list elements
function buildCategoryElementList(fetchingFromCategory,htmlListID) {

    fetch('/characters-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fetch_from_category : fetchingFromCategory
        })
    })
    .then(response => response.json())
    .then(data => {
        // Call function to display information
        buildCategoryElementListHTML(data,htmlListID)
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

//adds list elements to the page based on what's returned by the sql query
function buildCategoryElementListHTML(elements,htmlListID){
    var elementsList = document.getElementById('search-list'); // Gets list element

    for(let i = 0; i < elements.length; i++){
        let element = elements[i];

        let entry = document.createElement('li');
        entry.value = element;
        entry.appendChild(document.createTextNode(element));
        
        elementsList.appendChild(entry);
    }
}

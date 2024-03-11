//VARIABLES CREATED
//var category


// Wait until DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    var elementsList = document.getElementById('search-list'); // Gets list element

    buildCategoryElementList(category, elementsList); // Generates list of category elements

    addEventListenersToElementList(category, elementsList); // adds event listeners for clicking on elements
    
    
    

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
function buildCategoryElementList(fetchingFromCategory,elementsList) {

    fetch('/fetch-category-element-names', {
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
        buildCategoryElementListHTML(data,elementsList);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

//adds list elements to the page based on what's returned by the sql query
function buildCategoryElementListHTML(elements,elementsList){
    

    for(let i = 0; i < elements.length; i++){
        let element = elements[i];

        let entry = document.createElement('li');
        entry.dataset.elementName = element;
        entry.appendChild(document.createTextNode(element));
        
        elementsList.appendChild(entry);
    }
}








//adds click event listeners to element list
function addEventListenersToElementList(category, elementsList){

    elementsList.addEventListener('click', function(event) {

        // Check if the clicked element is a list type
        if (event.target.tagName === 'LI') {

            let elementName = event.target.dataset.elementName;
            console.log(elementName)
            toggleElementInformation(category, elementName, event.target);

        }

    });

}

// check if info box exists for characters upon click, 
//delete if so, build one if not
function toggleElementInformation(fromCategory, elementName, targetElement) {

    // Grab the next item of the element that has been clicked
    var existingInfoBox = targetElement.nextElementSibling;

    // Check if that item already displays its info box
    if (existingInfoBox && existingInfoBox.classList.contains('info-box')) {
        
        existingInfoBox.remove(); // If an info box exists, remove it

    } else {
 
        buildElementInfoBox(fromCategory, elementName, targetElement);

    }
}

// builds info box
function buildElementInfoBox(fromCategory, elementName, targetListElement) {
    fetch('/element-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fetch_from_category: fromCategory,
            fetch_element: elementName
        })
    })
    .then(response => response.json())
    .then(data => {

        displayElementInformation(fromCategory, data, targetListElement);

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to display character information upon toggle
function displayElementInformation(fromCategory, elementInfo, targetListElement) {

    // Create a div element for the info box
    var infoBox = document.createElement('div');
    infoBox.classList.add('info-box');
    
    infoBox.innerHTML = formatElementInformationForDisplay(fromCategory, elementInfo); // Set the HTML content of the info box to the formatted character information

    //Insert the info box after the target element
    targetListElement.insertAdjacentElement('afterend', infoBox);
}

function formatElementInformationForDisplay(fromCategory, info){
     let formattedInfo = "ERR: !!NO FORMAT FOUND!!"

    switch(fromCategory) {
      case "starships":
        formattedInfo = `
            <p><strong>Model:</strong> ${info[1]}</p>
            <p><strong>Manufacturer:</strong> ${info[2]}</p>
            <p><strong>Cost:</strong> ${info[3]}</p>
            <p><strong>Length:</strong> ${info[4]}</p>
            <p><strong>Maximum Atmosphering Speed:</strong> ${info[5]}</p>
            <p><strong>Crew:</strong> ${info[6]}</p>
            <p><strong>Passengers:</strong> ${info[7]}</p>
            <p><strong>Cargo Capacity:</strong> ${info[8]}</p>
            <p><strong>Consumables:</strong> ${info[9]}</p>
            <p><strong>Hyperdriving Rating:</strong> ${info[10]}</p>
            <p><strong>mglt:</strong> ${info[11]}</p>
            <p><strong>Starship Class:</strong> ${info[12]}</p>
        `;
        break;

      case "species":
        formattedInfo = `
            <p><strong>Classification:</strong> ${info[1]}</p>
            <p><strong>Designation:</strong> ${info[2]}</p>
            <p><strong>Average Height:</strong> ${info[3]}</p>
            <p><strong>Skin Color:</strong> ${info[4]}</p>
            <p><strong>Hair Color:</strong> ${info[5]}</p>
            <p><strong>Eye Color:</strong> ${info[6]}</p>
            <p><strong>Lifespan:</strong> ${info[7]}</p>
            <p><strong>Language:</strong> ${info[8]}</p>
            <p><strong>Home World:</strong> ${info[9]}</p>
        `;
        break;

      case "planets":
        formattedInfo = "FORMAT MISSING FOR PLANETS!! REPLACE IN CATEGORY_SEARCH_PAGE.JS"
        break;

      case "vehicles":
        formattedInfo = `
            <p><strong>Name:</strong> ${info[0]}</p>
            <p><strong>Model:</strong> ${info[1]}</p>
            <p><strong>Manufacturer:</strong> ${info[2]}</p>
            <p><strong>Cost (credits):</strong> ${info[3]}</p>
            <p><strong>Length (meters):</strong> ${info[4]}</p>
            <p><strong>Max Atmosphering Speed (km/h):</strong> ${info[5]}</p>
            <p><strong>Crew:</strong> ${info[6]}</p>
            <p><strong>Passengers:</strong> ${info[7]}</p>
            <p><strong>Cargo Capacity (kg):</strong> ${info[8]}</p>
            <p><strong>Consumables:</strong> ${info[9]}</p>
            <p><strong>Class:</strong> ${info[10]}</p>
        `;
        break;

      case "characters":
        formattedInfo = `
            <p><strong>Name:</strong> ${info[0]}</p>
            <p><strong>Height:</strong> ${info[1]}</p>
            <p><strong>Mass:</strong> ${info[2]}</p>
            <p><strong>Skin Color:</strong> ${info[3]}</p>
            <p><strong>Hair Color:</strong> ${info[4]}</p>
            <p><strong>Eye Color:</strong> ${info[5]}</p>
            <p><strong>Birth Year:</strong> ${info[6]}</p>
            <p><strong>Gender:</strong> ${info[7]}</p>
            <p><strong>Home World:</strong> ${info[8]}</p>
            <p><strong>Species:</strong> ${info[9]}</p>
        `;
        break;

      default:
        console.log("ERROR: NO ELEMENT FORMAT FOUND FOR THIS CATEGORY!")
    }

    return formattedInfo;
}
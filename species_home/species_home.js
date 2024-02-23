document.addEventListener("DOMContentLoaded", function() {
    fetch("/get_species_data")
        .then(response => response.json())
        .then(data => {
            const speciesList = document.getElementById("species-list");
            data.forEach(species => {
                const li = document.createElement("li");
                li.textContent = species.name;
                li.addEventListener("click", function() {
                    fetchSpeciesInfo(species.name);
                });
                speciesList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching species data:", error);
        });
});

function fetchSpeciesInfo(speciesName) {
    fetch(`/get_species_info?name=${encodeURIComponent(speciesName)}`)
        .then(response => response.json())
        .then(speciesInfo => {
            displaySpeciesInfo(speciesInfo);
        })
        .catch(error => {
            console.error(`Error fetching info for ${speciesName}:`, error);
        });
}

function displaySpeciesInfo(speciesInfo) {
    const speciesInfoDiv = document.getElementById("species-info");
    speciesInfoDiv.innerHTML = `
        <h2>${speciesInfo.name}</h2>
        <table>
            <tr><td>Classification:</td><td>${speciesInfo.classification}</td></tr>
            <tr><td>Designation:</td><td>${speciesInfo.designation}</td></tr>
            <tr><td>Average Height:</td><td>${speciesInfo.average_height}</td></tr>
            <tr><td>Skin Color:</td><td>${speciesInfo.skin_color}</td></tr>
            <tr><td>Hair Color:</td><td>${speciesInfo.hair_color}</td></tr>
            <tr><td>Eye Color:</td><td>${speciesInfo.eye_color}</td></tr>
            <tr><td>Lifespan:</td><td>${speciesInfo.lifespan}</td></tr>
            <tr><td>Language:</td><td>${speciesInfo.language}</td></tr>
            <tr><td>Homeworld:</td><td>${speciesInfo.homeworld}</td></tr>
        </table>
    `;
}


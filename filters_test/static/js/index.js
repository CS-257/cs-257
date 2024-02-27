window.onload = function setup(){
    setSelectedCategory();
    loadCriteria();
}

function setSelectedCategory(){
    const categorySelectOption = document.getElementById("filter_category_selector_"+category);
    if(categorySelectOption != null){
        categorySelectOption.selected = true;
    }
}

function loadCriteria(){
	var select = document.getElementById('criteria_filter_selector');
    let criteria = stringToList(criteriaOptions);

    for (let i = 0; i < criteria.length; i++) {
        addToSelector(criteria[i],select)
    }
}

function stringToList(str){
    return str.slice(1,-1).replaceAll(" ","").replaceAll("&#39;","").split(",");
}

function addToSelector(add,selector){
     var opt = document.createElement('option');
     opt.value = add;
     opt.innerHTML = cleanTextForDisplay(add);
     selector.appendChild(opt);
}

function cleanTextForDisplay(w){
    let words = w.replaceAll("_", " ").split(" ");

    let cleanedText = "";

    for(let i = 0; i < words.length; i++){

        let word = words[i].replaceAll(" ","");
        let capitalized =
            word.charAt(0).toUpperCase()
            + word.slice(1);

        cleanedText += capitalized + " ";
    }

    return cleanedText;
}

var filterCriteriaTypeCurrent = "none";

function filterCriteriaSelected(){
    let selectedCriteria = document.getElementById("criteria_filter_selector").value;
    let selectedCriteria_type = stringToList(criteriaOptions_dataTypes)[
        stringToList(criteriaOptions).indexOf(selectedCriteria)
    ];

    document.getElementById("criteria_filter_options_text").style.display = "none";
    document.getElementById("criteria_filter_options_real").style.display = "none";


    if        (selectedCriteria_type == "text" || selectedCriteria_type == "charactervarying"){

        document.getElementById("criteria_filter_options_text").style.display = "block";
        filterCriteriaTypeCurrent = "text";

    } else if (selectedCriteria_type == "real" || selectedCriteria_type == "integer"){
        
        document.getElementById("criteria_filter_options_real").style.display = "block";
        filterCriteriaTypeCurrent = "real";
    
    }
    
}

var filterCriteria = [];
const criteriaTypesToDisplay = {
    "filter_real_is": "is",
    "filter_real_closeTo": "close to",
    "filter_real_greaterThan": "greater than",
    "filter_real_lessThan": "less than",
    "filter_text_is": "is",
    "filter_text_contains": "contains",
    "filter_text_startsWith": "starts with",
    "filter_text_endsWith": "ends with",
}

function filterCriteriaAdded(){
    let newFilter = {
        "type": filterCriteriaTypeCurrent,
        "criteria": document.getElementById("criteria_filter_selector").value,
        "criteria_filter": "dummy value",
        "value": "dummy value"
    }

    switch(filterCriteriaTypeCurrent){
        case "none":
            return;

        case "text":
            newFilter["criteria_filter"] = document.getElementById("criteria_filter_options_dropdown_text").value;
            newFilter["value"] = document.getElementById("criteria_filter_options_entry_text").value;

            break;

        case "real":
            newFilter["criteria_filter"] = document.getElementById("criteria_filter_options_dropdown_real").value;
            newFilter["value"] = document.getElementById("criteria_filter_options_entry_real").value.toString();

            break;

    }

    filterCriteria.push(newFilter);
    console.log(filterCriteria);

    const filtersListDisplay = document.getElementById("criteria_filters");
    
    filtersListDisplay.appendChild(document.createTextNode(  
        cleanTextForDisplay(newFilter["criteria"]) + " " 
        + criteriaTypesToDisplay[newFilter["criteria_filter"]] + " " 
        + newFilter["value"] 
    ));
    filtersListDisplay.appendChild(document.createElement("br"));
}
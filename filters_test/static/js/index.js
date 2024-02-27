window.onload = function setup(){
    loadCriteria();
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

function filterCriteriaSelected(){
    let selectedCriteria = document.getElementById("criteria_filter_selector").value;
    let selectedCriteria_type = stringToList(criteriaOptions_dataTypes)[
        stringToList(criteriaOptions).indexOf(selectedCriteria)
    ];

    //document.getElementsByClassName("criteria_filter_options").style.display = "none";

    console.log(stringToList(criteriaOptions));
    console.log(stringToList(criteriaOptions_dataTypes));
    console.log(stringToList(criteriaOptions).indexOf(selectedCriteria));
    console.log(selectedCriteria);
    console.log(selectedCriteria_type);
    document.getElementById("criteria_filter_options_text").style.display = "block";
    switch(selectedCriteria_type){
        case "text":
            document.getElementById("criteria_filter_options_text").style.display = "block";
            break;
        case "real":
            document.getElementById("criteria_filter_options_real").style.display = "block";
            break;
    }
    
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
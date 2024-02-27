window.onload = function setup(){
    loadCriteria();
}

function loadCriteria(){
	var select = document.getElementById('filter_criteria_selector');
    let criteria = criteriaOptions.slice(1,-1).replaceAll("&#39;","").split(",");

    for (let i = 0; i < criteria.length; i++) {
        addToSelector(criteria[i],select)
    }
}

function addToSelector(add,selector){
     var opt = document.createElement('option');
     opt.value = add;
     opt.innerHTML = cleanTextForDisplay(add);
     selector.appendChild(opt);
}

function cleanTextForDisplay(w){
    let words = w.replaceAll(" ","").replaceAll("_", " ").split(" ");

    let cleanedText = "";
    for(let i = 0; i < words.length; i++){
        let word = words[i];
        let capitalized =
            word.charAt(0).toUpperCase()
            + word.slice(1);

        cleanedText += word;
    }

    return cleanedText;
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
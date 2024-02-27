function setup(){
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
    let word = w.replaceAll(" ","").replaceAll("_", " ");
    const capitalized =
        word.charAt(0).toUpperCase()
        + word.slice(1);

    return capitalized;
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
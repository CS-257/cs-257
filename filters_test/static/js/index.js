function setup(){
    loadCriteria();
}

function loadCriteria(){
	var select = document.getElementById('filter_criteria_selector');
    let criteria = criteriaOptions.split(",")

    for (let i = 0; i < criteria.length; i++) {
        addThisToSelector(criteria[i],select)
    }
}

function addToSelector(add,selector){
     var opt = document.createElement('option');
     opt.value = add;
     opt.innerHTML = add;
     selector.appendChild(opt);
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
function setup(){
    loadCriteria();
}

function loadCriteria(){
	var select = document.getElementById('filter_criteria_selector');
    let criteria = criteriaOptions.split(",")

    criteria.forEach(addThisToSelector(select));
    addThisToSelector(select);
}

function addThisToSelector(selector){
     var opt = document.createElement('option');
     opt.value = this;
     opt.innerHTML = this;
     selector.appendChild(opt);
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
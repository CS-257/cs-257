function setup(){
    loadCriteria();
}

function loadCriteria(){
	var select = document.getElementById('filter_criteria_selector');

    criteriaOptions.forEach(addThisToSelector(select))
}

function addThisToSelector(selector){
     var opt = document.createElement('option');
     opt.value = this[0];
     opt.innerHTML = this[0];
     selector.appendChild(opt);
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
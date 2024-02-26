function setup(){
    testAddToSelector();
}

function loadCriteria(){
	var select = document.getElementById('filter_criteria_selector');
    //let criteria = criteriaOptions.split(",")
    let criteria = ["test1","test2","test3"];

    criteria.forEach(addThisToSelector(select));
    addThisToSelector(select);
}

function addThisToSelector(selector){
     var opt = document.createElement('option');
     opt.value = "AAAA";
     opt.innerHTML = "AAAA";
     selector.appendChild(opt);
}

function testAddToSelector(){
	var selector = document.getElementById('filter_criteria_selector');
     var opt = document.createElement('option');
     opt.value = "AAAA";
     opt.innerHTML = "AAAA";
     selector.appendChild(opt);
}

//JAVASCRIPT THEN-CHAINING -- FUNCTIONS DONT GET TIME COORDINATED
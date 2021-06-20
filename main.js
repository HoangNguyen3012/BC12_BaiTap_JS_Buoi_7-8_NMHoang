// Default functions
// Get element from html
function getEle(id) {
    return document.querySelector(id);
}
// Check if positive of a value
function checkPositive(number){
    return number > 0;
    // return (number > 0 ? number : '');
}
//console.log(checkPositive(-60))

// Check if a number is prime
function isPrime(number){
    if(number < 2){
        return false;
    }
    switch(Math.abs(number)) {
        case 2:
            return true;
        default:
            for(var i = 2; i <= Math.abs(number) - 1; i++){
                if(Math.abs(number) % i === 0){
                    return false;
                };
            };
        return true;
    };  
};
//console.log(isPrime(31));

/** Hide displays
 * Hide every Operation Display
 * Used at the start of an Operation button
*/
function hideDP() {
    // Hide the property display section
    getEle('#dpProperties').style.display = 'none';

    // Hide the sort ascending display section
    getEle('#dpAsc').style.display = 'none';

    // Hide the sort descending display section
    getEle('#dpDesc').style.display = 'none';

}

/** Remove properties function
 * Used at the start of an Operation button
*/
function resetProperties() {
    // Reset all output values
    getEle('#sumPositive').innerHTML = '';
    getEle('#countPositive').innerHTML = '';
    getEle('#minNumb').innerHTML = '';
    getEle('#minPositive').innerHTML = '';
    getEle('#lastEven').innerHTML = '';
    getEle('#firstPrime').innerHTML = '';
    getEle('#compareSign').innerHTML = '';

    // Hide the property display section
    getEle('#dpProperties').style.display = 'none';

};

/** Revert operation function
 * Return variables before operations (except input variables)
 * Used at the end of an Operation button
*/
function revertOperations() {
    arrPositive = [];
    sumPositive = 0;
    lastEven = -1;
};

/** Display current Array of integers
 * With the added number
*/
function dpArrayInput() {
    getEle('#dpArrayInt').innerHTML = arrayInput.join(',');
};


// BaiTap JS Buoi 7 & 8

/** Create empty array for input */
var arrayInput = [];

// Button add integer to new Array
var addInteger = function(){
    // Input number
    var num = parseFloat(getEle('#addInt').value);

    if(isNaN(num)){    // check empty input
        return;
    }else if(!Number.isInteger(num)){    // check integer input
        alert('Điền số nguyên');
        return;
    }
    arrayInput.push(num);// Add number to array
    // console.log(arrayInput);
    
    dpArrayInput(); // Display current input array


    // Reset the input tag in html
    getEle('#addInt').value = '';

    
};


// Button to do tasks
var arrayProperties = function() {
    // console.log(arrayInput);
    resetProperties(); // Remove properties 
    hideDP(); // Hide all open operation display

    /** Operation find sum of positive numbers in array
     * First check positive
     * Return an array of positive numbers
     * Sum the created array
     */
    var arrPositive = arrayInput.filter(checkPositive);
    //console.log(arrPositive);
    var sumPositive = 0;
    for(var i = 0; i <= arrPositive.length-1; i++){
        //console.log(sumInt);
        sumPositive += arrPositive[i]*1;
    };
    getEle('#sumPositive').innerHTML = sumPositive;

    /** Operation count all positive numbers
     * Count all items in positive array
    */
    getEle('#countPositive').innerHTML = arrPositive.length;

    // Operation find min value in array
    getEle('#minNumb').innerHTML = Math.min.apply(null, arrayInput);

    // Operation find min positive value in array
    getEle('#minPositive').innerHTML = Math.min.apply(null,arrPositive);

    // Operation find the last even number in array
    var lastEven = -1;
    for(var i = 0 ; i <= arrayInput.length - 1; i++){
        arrayInput[i] % 2 === 0 ? lastEven = arrayInput[i] : true;
    };
    getEle('#lastEven').innerHTML = lastEven;

    // Operation check prime number in array
    switch (arrayInput.find(isPrime)) {
        case undefined:
            getEle('#firstPrime').innerHTML = -1;
            break;
        default:
            getEle('#firstPrime').innerHTML = arrayInput.find(isPrime);
    }
    

    // Display all properties on click
    getEle('#dpProperties').style.display = 'block';

    // Revert Variables back to starting values
    revertOperations();
    

};

// Button to erase current input array
var arrayDestroy = function() {
    resetProperties(); // Remove properties

    // Reset the array display
    getEle('#dpArrayNumber').innerHTML = '';

    // Revert Variables back to starting values
    revertOperations();

    // Remove the array input
    arrayInput = [];

    hideDP(); // Hide all open operation display
    
};

// Button to toggle display switch section
var dpSwitch = function() {
    hideDP();
    switch (getEle('#dpSwitch').style.display){
        case 'none':
            getEle('#dpSwitch').style.display = 'block';
            break;
        default:
            getEle('#dpSwitch').style.display = 'none';
            
    };

};

// Button to switch values
var switchValues = function () {
    hideDP(); // Hide all open operation display

    // Validate non negative input
    var switch1 = getEle('#switch1').value;
    var switch2 = getEle('#switch2').value;
    if (!(switch1 >= 0 && switch2 >= 0)) {
        alert('Điền vị trí là số không âm');
        return;
    }else if(!(switch1 < arrayInput.length || switch2 < arrayInput.length)){
        alert('Mảng không có dài đến vậy');
        return;
    }

    /** Operation switch values 
     * Create an old variable to store old value
     * old = array[switch1]
     * array[switch1] = array[switch2]
     * array[switch2] = old
    */
    var oldValue = arrayInput[switch1];
    arrayInput[switch1] = arrayInput[switch2];
    arrayInput[switch2] = oldValue;

    dpArrayInput(); // Display current input array
    getEle('#switch1').value = '';
    getEle('#switch2').value = '';
}

// Button to sort array values in ascending order
var sortAsc = function() {
    resetProperties(); // Remove properties
    hideDP(); // Hide all open operation display

    getEle('#sortAsc').innerHTML = ''; // Set output to ''
    /** Operation sort array in ascending order
     * First create a sort array, set it to original input array
     * Use sort(function) to sort array
     * Output sort array
     * Empty sort array
     */
    var arrAsc = arrayInput.slice();
    arrAsc.sort(function(a,b){return (a - b)});


    arrAsc.forEach(function(item, index) {
        getEle('#sortAsc').innerHTML += item + '<br>';
    });

    // Display result
    getEle('#dpAsc').style.display = 'block';
    arrAsc = []; //Empty sort array
};

// Button to sort array values in descending order
var sortDesc = function() {
    resetProperties(); // Remove properties
    hideDP(); // Hide all open operation display

    getEle('#sortDesc').innerHTML = ''; // Set output to ''
    /** Operation sort array in descending order
     * First create a sort array, set it to original input array
     * Use sort(function) to sort array
     * Output sort array
     * Empty sort array
     */
    var arrADesc = arrayInput.slice();
    arrADesc.sort(function(a,b){return (b - a)});


    arrADesc.forEach(function(item, index) {
        getEle('#sortDesc').innerHTML += item + '<br>';
    });

    // Display result
    getEle('#dpDesc').style.display = 'block';

};
//////// END OF INTEGER ARRAY ////////




// Function
/** Display current Array of integers
 * With the added number
*/
function dpArrayReal() {
    getEle('#dpArrayNum').innerHTML = arrayReal.join(',');
};

// Check integer
function checkInt(number){
    return Number.isInteger(number);
}

// Check if negative of a value
function checkNegative(number){
    return number < 0;
}


/** Create empty array for input */
var arrayReal = [];

// Button add numbers to new Array
var addNumb = function(){
    // Input number
    var num = parseFloat(getEle('#addNum').value);

    if(isNaN(num)){    // check empty input
        return;
    };
    arrayReal.push(num);// Add number to array
    // console.log(arrayInput);
    
    dpArrayReal(); // Display current input array


    // Reset the input tag in html
    getEle('#addNum').value = '';

    
};

// Button display properties
var arrayProperties1 = function () {
    /** Count the integers
     * Set up filter array for integers
     * Count = integer array length
     */
    //console.log(arrayReal.filter(checkInt));
    getEle('#countInt').innerHTML = arrayReal.filter(checkInt).length;

    /** Count the Positives
    * Set up filter array for Positives
    * Count = Positive array length
    */
    var countPositive = arrayReal.filter(checkPositive).length;
    var countNegative = arrayReal.filter(checkNegative).length;
    // console.log(countPositive);

    // Operation compare countPositive and countNegative
    if(countPositive > countNegative){
        getEle('#compareSign').innerHTML = 'Số số dương nhiều hơn số số âm';
    }else if(countPositive < countNegative){
        getEle('#compareSign').innerHTML = 'Số số dương ít hơn số số âm';
    }else{
        getEle('#compareSign').innerHTML = 'Số số dương bằng số số âm';
    }


    // Display result
    switch (getEle('#dpProperties1').style.display) {
        case 'none':
            getEle('#dpProperties1').style.display = 'block';
            break;
        default:
            getEle('#dpProperties1').style.display = 'none';

    };

}

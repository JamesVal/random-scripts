function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        if (!isNaN(array[i].length)) shuffleArray(array[i]);
        if (!isNaN(array[j].length)) shuffleArray(array[j]);
    }
}

var grp1 = [3,12,13];
var grp2 = [4,7,10];

var rows = [grp1, grp2, 1,2,5,6,8,9,11,14];

shuffleArray(rows);



console.log(rows);

function shuffleArray2(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var grp1 = [3,12,13];
var grp2 = [4,7,10];

shuffleArray2(grp1);
shuffleArray2(grp2);

var rows = [grp1, grp2, 1,2,5,6,8,9,11,14];

shuffleArray(rows);

console.log(rows);

/*
var arr1 = [12,32];
var arr2 = [6,5,33];
var arr3 = [2,17,20,27];
var arr4 = [1,28,25];
var arr5 = [9,10,11];

shuffleArray(arr1);
shuffleArray(arr2);
shuffleArray(arr3);
shuffleArray(arr4);
shuffleArray(arr5);

var allItems = [arr1,arr2,arr3,arr4,arr5,3,4,7,8,13,14,15,16,18,19,21,22,23,24,26,29,30,31];

shuffleArray(allItems);

respondent.data("XS5_ORDER", allItems.join(","));

done();
*/

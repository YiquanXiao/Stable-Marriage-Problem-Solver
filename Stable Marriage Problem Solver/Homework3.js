//swap(arr: number[], i: number, j: number): number[]
//swap 2 elements in arr
function swap(arr, i, j){
  let temp = arr[i]; 
  arr[i] = arr[j];
  arr[j] = temp;
}

// Returns a random int i where min <= i < max
function randomInt(min, max) {
 return Math.floor(Math.random() * (max - min +1)) + min;
}

//shuffle(arr: number[]): number[]
//shuffle arr 
function shuffle(arr){
  for(let i = 0; i < arr.length-1; ++i){
    swap(arr, i, randomInt(i, arr.length - 1));
  }
  return arr;
}

//generateInput(n: number): number[][]
function generateInput(n){
  let pre = [];
  for(let i = 0; i < n; ++i){
    pre.push(i); 
  }
  let result = []; 
  for(let i = 0; i < n; ++i){
    let preCopy = [... pre];
    preCopy = shuffle(preCopy); 
    result.push(preCopy);
  }
  return result;
}

//indexOf(arr: number[], elem: number): number
//find the index of elem in arr
function indexOf(arr, elem){
  for(let i = 0; i < arr.length; ++i){
    if(arr[i] === elem){
      return i;
    }
  }
  return -1; 
}

//remove(arr: number[], target: number): number[]
//remove the element at target index
function remove(arr, target){
  let index = indexOf(arr, target);
  if(index > -1){
    arr.splice(index, 1);
  }
  return arr;
}

/*oracle(f: (candidates: number[][], 
companies: number[][]) => Hire[]): void */
//oracle test marriage stable problem
function oracle(f) {
 let numTests = 50;  // Change this to some reasonably large value
 for (let i = 0; i < numTests; ++i) {
   let n = 10;  // Change this to some reasonable size
   let companies = generateInput(n);
   let candidates = generateInput(n);
   let hires = f(companies, candidates);
   test('Hires length is correct', function() {
     assert(companies.length === hires.length);
});
   // Write your tests here
   test('Hire is stable', function(){
     let stable = true; 
    for(let i = 0; i < hires.length; ++i){
      let com = hires[i].company;
      let can = hires[i].candidate; 
      //index of can in com's preference list
      let canIncom = companies[com].indexOf(can);
      for(let j = 0; j < canIncom; ++j){
        let preferCan = companies[com][j];
        let matchCom = 0; 
        //find the corresponding company of perferCan
        for(let k = 0; k < hires.length; ++k){
          if(hires[k].candidate === preferCan){
            matchCom = hires[k].company;
            break;
          }
        }
        let comRank = candidates[preferCan].indexOf(com);
        let matchComRank = candidates[preferCan].indexOf(matchCom);
        /*if preferCan like com more than matchCom
        then the match is not stable*/
        if(comRank < matchComRank){
          stable = false; 
          break;
        }
      }
      if(stable === false){break;}
     }
     assert(stable);
   })
 } 
}

//oracle(wheat1);
//oracle(chaff1);

//arrayEquals(arr1: number[], arr2: number): boolean
//to check whether 2 arrays are equal
function arrayEquals(arr1, arr2){
  if(arr1.length !== arr2.length){
    return false;
  }
  for(let i = 0; i < arr1.length; ++i){
    if(arr1[i] !== arr2[i]){
      return false;
    }
  }
  return true;
}

//function to see whether the shuffle is random
function oracleRam(f){
  let seen = [];
  let inputArray = [1, 2, 3];
  for(let i = 0; i< 1000; ++i){
    let result = f([1, 2, 3]);
    let record = seen.find(function(record){
      return arrayEquals(record.array, result); 
    });
    if (record === undefined){
      seen.push({array: result, count: 1});
    }
    else{
      record.count = record.count + 1; 
    }
  }
  return seen;
}
/*
let test1 = wheat1([[1, 2, 0], [1, 0, 2], [1, 0, 2]], 
              [[0, 2, 1], [1, 2, 0], [0, 1, 2]]);
console.log(test1);

let test2 = chaff1([[1, 2, 0], [1, 0, 2], [1, 0, 2]], 
              [[0, 2, 1], [1, 2, 0], [0, 1, 2]]);
console.log(test2);
*/

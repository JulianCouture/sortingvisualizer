const n=20;
const array=[];
swaps = [];

let audioCtx=null;

init();

function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}

function play1(){
    quickSort([...array],0,array.length-1);
    console.log(swaps)
    animate(swaps);
}

function play2(){
    const swaps = bubbleSort([...array]);
    animate(swaps);
}


function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift(0);
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    setTimeout(function(){
        animate(swaps);
    },300);
}

function bubbleSort(array){
    const swaps=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            if(array[i-1]>array[i]){
                swaps.push([i-1,i]);
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return swaps;
}

// function quickSort(arr, start, end, swaps){
//     if (start >= end) {
//           return;
//     }
      
//     let index = partition(arr, start, end);
  
//     quickSort(arr, start, index - 1);
//     quickSort(arr, index + 1, end);
//   }
  
//   function partition(arr, start, end){
//     const pivotValue = arr[end];
//     let pivotIndex = start;
  
//     for (let i = start; i < end; i++) {
//       if (arr[i] < pivotValue) {
//         [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
//         pivotIndex++;
//       }
//     }
     
//     [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
//     return pivotIndex;
//   }

function partition(items, left, right) {
    let pivotIndex = right-1;
    var pivot = items[pivotIndex]; //middle element
  
    // for (let i = 0; i < bars.length; i++) {
    //   if (i != pivotIndex) {
    //     bars[i].style.backgroundColor = "aqua";
    //   }
    // }
  
    (i = left), //left pointer
      (j = right); //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        if(i < j)swaps.push([i, j]); //swapping two elements
        [items[i],items[j]] = [items[j],items[i]]
        i++;
        j--;
      }
    }
    return i;
  }
  
   function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index =  partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
         quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
         quickSort(items, index, right);
      }
    }
  
    return items;
  }


function showBars(indices){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red";
        }
        container.appendChild(bar);
    }   
}

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}
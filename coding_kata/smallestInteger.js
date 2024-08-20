function smallestMissingInteger(A) {
    const positiveArray = A.filter(x => x > 0);
    
    let i = 1;
    while (positiveArray.includes(i)) {
        i++;
    }
    
    return i;
}

const arr = [1, 4, 6, 3, 2]
console.log(smallestMissingInteger(arr)); 
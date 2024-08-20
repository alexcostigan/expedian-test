function mostCommonConsecutiveRepeated(A) {
    if (A.length === 0) return 0;

    let currentCount = 1;
    let maxCount = 1;

    for (let i = 1; i < A.length; i++) {
        if (A[i] === A[i - 1]) {
            currentCount++;
        } else {
            if (currentCount > maxCount) {
                maxCount = currentCount;
            }
            currentCount = 1;
        }
    }
    return Math.max(maxCount, currentCount);
}

const arr = ['a', 'jq', 'bpa', 'bpa', 'q'];
console.log(mostCommonConsecutiveRepeated(arr));
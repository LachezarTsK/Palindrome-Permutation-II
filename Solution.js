
/**
 * @param {string} input
 * @return {string[]}
 */
var generatePalindromes = function (input) {
    this.ALPHABET_SIZE = 26;
    this.frequency = new Array(ALPHABET_SIZE).fill(0);
    this.allPalindromicPermutations = [];
    this.middleLetter = "";
    this.ascii_small_case_a = 97;

    for (let i = 0; i < input.length; ++i) {
        ++this.frequency[input.codePointAt(i) - this.ascii_small_case_a];
    }
    if (!canBeArrangedAsPalindrome()) {
        return [];
    }
    decreaseFrequencyByHalf_and_findMiddleLetter();
    findAllPalindromicPermutations([], input.length);
    return allPalindromicPermutations;
};

/**
 * @param {string[]} current
 * @@param {number} permutationSize 
 * @return {void}
 */
function findAllPalindromicPermutations(current, permutationSize) {
    if (current.length === Math.floor(permutationSize / 2)) {
        this.allPalindromicPermutations.push(current.join('') + this.middleLetter + Array.from(current).reverse().join(''));
        return;
    }
    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        if (this.frequency[i] > 0) {
            current.push(String.fromCodePoint(this.ascii_small_case_a + i));
            --this.frequency[i];
            findAllPalindromicPermutations(current, permutationSize);
            current.pop();
            ++this.frequency[i];
        }
    }
}

/**
 * @return {void}
 */
function decreaseFrequencyByHalf_and_findMiddleLetter() {
    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        if (this.frequency[i] % 2 === 1) {
            this.middleLetter = String.fromCodePoint(this.ascii_small_case_a + i);
        }
        this.frequency[i] = Math.floor(this.frequency[i] / 2);
    }
}

/**
 * @return {boolean}
 */
function canBeArrangedAsPalindrome() {
    let countOddFrequencies = 0;
    for (let n of this.frequency) {
        if (n % 2 !== 0) {
            ++countOddFrequencies;
        }
    }
    return countOddFrequencies < 2;
}

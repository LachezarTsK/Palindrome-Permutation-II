
#include <array>
#include <string>
#include <vector>
#include <cstdint>
using namespace std;

class Solution {
    
    inline static const int8_t ALPHABET_SIZE = 26;
    array<int8_t, ALPHABET_SIZE> frequency{};
    vector<string> allPalindromicPermutations;
    string middleLetter;

public:
    vector<string> generatePalindromes(string input) {
        for (int i = 0; i < input.length(); ++i) {
            ++frequency[input[i] - 'a'];
        }
        if (!canBeArrangedAsPalindrome()) {
            return vector<string>();
        }
        decreaseFrequencyByHalf_and_findMiddleLetter();
        string current;
        findAllPalindromicPermutations(current, input.length());
        return allPalindromicPermutations;
    }

private:
    void findAllPalindromicPermutations(string& current, int permutationSize) {
        if (current.length() == permutationSize / 2) {
            string reversed(current.length(), ' ');
            reverse_copy(current.begin(), current.end(), reversed.begin());
            allPalindromicPermutations.push_back(current + middleLetter + reversed);
            return;
        }
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (frequency[i] > 0) {
                current.push_back(static_cast<char> ('a' + i));
                --frequency[i];
                findAllPalindromicPermutations(current, permutationSize);
                current.pop_back();
                ++frequency[i];
            }
        }
    }

    void decreaseFrequencyByHalf_and_findMiddleLetter() {
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (frequency[i] % 2 == 1) {
                middleLetter = static_cast<char> ('a' + i);
            }
            frequency[i] /= 2;
        }
    }

    bool canBeArrangedAsPalindrome() {
        int countOddFrequencies = 0;
        for (const auto& n : frequency) {
            if (n % 2 != 0) {
                ++countOddFrequencies;
            }
        }
        return countOddFrequencies < 2;
    }
};

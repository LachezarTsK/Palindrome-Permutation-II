
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private final int[] frequency = new int[ALPHABET_SIZE];
    private final List<String> allPalindromicPermutations = new ArrayList<>();
    private String middleLetter = "";

    public List<String> generatePalindromes(String input) {
        for (int i = 0; i < input.length(); ++i) {
            ++frequency[input.charAt(i) - 'a'];
        }
        if (!canBeArrangedAsPalindrome()) {
            return new ArrayList<>();
        }
        decreaseFrequencyByHalf_and_findMiddleLetter();
        findAllPalindromicPermutations(new StringBuilder(), input.length());
        return allPalindromicPermutations;
    }

    private void findAllPalindromicPermutations(StringBuilder current, int permutationSize) {
        if (current.length() == permutationSize / 2) {
            allPalindromicPermutations.add(current + middleLetter + new StringBuilder(current).reverse());
            return;
        }
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (frequency[i] > 0) {
                current.append((char) ('a' + i));
                --frequency[i];
                findAllPalindromicPermutations(current, permutationSize);
                current.deleteCharAt(current.length() - 1);
                ++frequency[i];
            }
        }
    }

    private void decreaseFrequencyByHalf_and_findMiddleLetter() {
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (frequency[i] % 2 == 1) {
                middleLetter = Character.toString((char) ('a' + i));
            }
            frequency[i] /= 2;
        }
    }

    private boolean canBeArrangedAsPalindrome() {
        int countOddFrequencies = 0;
        for (int n : frequency) {
            if (n % 2 != 0) {
                ++countOddFrequencies;
            }
        }
        return countOddFrequencies < 2;
    }
}

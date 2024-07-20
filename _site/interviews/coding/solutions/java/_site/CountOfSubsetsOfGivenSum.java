import java.util.Arrays;

class CountOfSubsetsOfGivenSum {

    static int countSubsets(int[] a, int k) {
        int[][] dp = new int[a.length + 1][k + 1];
        int res = 0;
        for (int i = 0; i < dp.length; i++) {
            dp[i][0] = 1;
        }
        for (int i = 1; i <= a.length; i++) {
            for (int j = 1; j <= k; j++) {
                if (a[i - 1] <= j) {
                    dp[i][j] = dp[i - 1][j - a[i - 1]] + dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        for (int i = 0; i < dp.length; i++) {
            System.out.println(Arrays.toString(dp[i]));
        }
        return dp[a.length][k];
    }

    public static void main(String[] args) {
//        int[] a = {1, 2, 3, 3};
//        int k = 6;
//        int[] a = {2,3,5,6,8,10};
//        int k = 10;
        int[] a = {1, 1, 1, 1};
        int k = 1;
        System.out.println(countSubsets(a, k));
    }

}
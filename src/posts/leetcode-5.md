---
title: Leetcode Daily Question 5
date: '2025-07-02'
author: Nick Belvin
excerpt: Longest Palindromic Substring
image: /images/post-previews/leet-code-logo.png
---

## Background

Have you ever seen the word TacoCat and realized its the same thing spelled backwards! Well if you haven't todays the day! Leetcode Daily question 5 takes this idea up a notch and asks us to find the longest Palindrome substring.

-----

## Question Overview

This task is to implement a function ```longestPalindrome``` that takes in a string ```s``` and returns the longest palindromic substring.

-----

### Understanding the Problem

1. **What is a palindrome**: A palindrome is any string that when reversed is the same string.
2. **Substring problems**: Finding all substrings almost always involved some sort of iteration
3. **Base Case**: All strings length 1 are already palindromes

-----

### Initial Thoughts & Approach

When going about this problem from past experiences with palindromes for a single string a sliding window approach was the obvious answer, but in this case we can't immediately do that as we must test all substrings. So thinking inversely to a sliding window what if we expanded out from each character.

1.  **Starting at each character**: Incrementally we can start at each character and work our way out on both sides checking if its still a palindrom

2.  **Tracking State**: To ensure validity, we need to keep track of:
    * The current max length palindrome
    * The current character we are starting at

3.  **Base Case:** If a given string is less than or equal to 1 we should just return it.

4.  **Efficiency**: While this expanding out approach explores all possible options individually making it a ```O(n^2)``` time complexity

-----

## Step-by-Step Solution Breakdown

Let's break down the provided Go solution using expand outward approach

1. **Expand From Center**
   Firstly we will build a helper function whos job it is to take the original array and a left and right pointer and continously expand out until the substring between ```left``` and ```right``` is no longer a palindrome

   ```go
    func expandFromCenter(arr string, left, right int) string {
        for left >= 0 && right < len(arr) && arr[left] == arr[right] {
            left--
            right++
        }

        return arr[left + 1:right]
    }
   ```

2. **Define Base Case**
   Now in our main function we need to define the base case if length of string is less than or equal to one then the best solution is s itself

   ```go 
    func longestPalindrome(s string) string {
        if len(s) <= 1 {
            return s
        }

        //...
    }
   ```

3. **Iterate all Solutions**
   Finally in our main function we iterate through each character in the string and test if its a palindrome, with one small addition, that we must also cover odd number palindromes by starting the right pointer + 1 this covers cases like ```bb``` or ```aa```

   ```go
    func longestPalindrome(s string) string {
        //...

        var maxStr string
        for i := range(s) {
            evenCenter := expandFromCenter(s, i, i)
            oddCenter := expandFromCenter(s, i, i + 1)

            if len(evenCenter) > len(maxStr) {
                maxStr = evenCenter
            }

            if len(oddCenter) > len(maxStr) {
                maxStr = oddCenter
            }
        }

        return maxStr
    }
   ```

## Code Solution

```go
func expandFromCenter(arr string, left, right int) string {
    for left >= 0 && right < len(arr) && arr[left] == arr[right] {
        left--
        right++
    }

    return arr[left + 1:right]
}


func longestPalindrome(s string) string {
    if len(s) <= 1 {
        return s
    }

    var maxStr string
    for i := range(s) {
        evenCenter := expandFromCenter(s, i, i)
        oddCenter := expandFromCenter(s, i, i + 1)

        if len(evenCenter) > len(maxStr) {
            maxStr = evenCenter
        }

        if len(oddCenter) > len(maxStr) {
            maxStr = oddCenter
        }
    }

    return maxStr
}
```
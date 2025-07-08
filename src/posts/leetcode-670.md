---
title: Leetcode Daily Question 670
date: '2025-07-07'
author: Nick Belvin
excerpt: Maximum Swap
image: /images/post-previews/leet-code-logo.png
---

## Background

Have you ever looked at a number and thought, "How can I make this number as big as possible by just swapping two of its digits?" Today's Leetcode challenge, "Maximum Swap," delves into this very idea\! We're tasked with finding the largest possible number you can create by performing at most one swap of two digits within a given non-negative integer.

-----

## Question Overview

This task is to implement a function `maximumSwap` that takes in a non-negative integer `num` and returns the largest possible number that can be obtained by swapping at most two of its digits.

-----

### Understanding the Problem

1.  **At Most One Swap**: This is crucial. We can swap two digits, or we can choose not to swap any if no swap improves the number.
2.  **Largest Possible Number**: To make a number largest, we generally want larger digits in more significant positions (further to the left).
3.  **Digit Manipulation**: The input is an integer, but to swap digits, it's often easier to convert it to a string or an array of characters.

-----

### Initial Thoughts & Approach

To obtain the largest possible number, we should aim to place the largest possible digit in the leftmost position where it isn't already. If we find a digit to the right that is larger than the current digit at a position `i`, we should consider swapping them. However, we want the *largest* such digit from the *rightmost* position possible to ensure the smallest possible disruption to the digits already in their 'correct' places.

This suggests a greedy approach:

1.  **Convert to Array**: Convert the number to a character array of its digits for easy manipulation.
2.  **Iterate from Right to Left**: To find the ideal digit to swap, it's beneficial to iterate from the right. This allows us to keep track of the maximum digit encountered so far and its index.
3.  **Identify Swap Candidates**:
      * Maintain `maxValue` and `maxIndex` as we iterate from right to left.
      * If `currValue` (digit at current index `i`) is greater than `maxValue`, update `maxValue` and `maxIndex`. This new `currValue` is the new largest digit found so far to the right.
      * If `currValue` is *less* than `maxValue`, then we've found a potential `leftIndex` (the current `i`) that can be swapped with a larger digit (`maxValue`) at `rightIndex` (`maxIndex`). We keep updating these `leftIndex` and `rightIndex` candidates because we want the leftmost `leftIndex` and the rightmost `rightIndex` that still provides the maximum value.
4.  **Perform Swap**: If a `leftIndex` was found (meaning a swap is beneficial), perform the swap.
5.  **Convert Back**: Join the array and convert back to an integer.

-----

## Step-by-Step Solution Breakdown

Let's break down the provided Javascript solution for `maximumSwap`.

1.  **Convert to String Array**:
    The first step is to convert the input `num` into a string, and then split it into an array of individual character digits. This makes it mutable.

    ```typescript
    let numStrArr = num.toString().split('');
    ```

2.  **Initialize Swap Pointers and Max Trackers**:
    We need variables to keep track of:

      * `maxIndex`: The index of the largest digit found so far when iterating from right to left.
      * `maxValue`: The value of the largest digit found so far.
      * `leftIndex`: The index of the digit that will be swapped (the 'smaller' digit on the left).
      * `rightIndex`: The index of the digit it will be swapped with (the 'larger' digit on the right).
        These are initialized to `-1` or `0` as sentinels. `maxValue` is `0` because digits are non-negative.

    <!-- end list -->

    ```typescript
    let maxIndex = -1;
    let maxValue = -1; // Changed to -1 to correctly handle single digit 0-9
    let leftIndex = -1;
    let rightIndex = -1;
    ```

3.  **Iterate from Right to Left**:
    The core logic involves iterating from the *rightmost* digit (index `numStrArr.length - 1`) down to the leftmost digit (index `0`).

    ```typescript
    for (let i = numStrArr.length - 1; i >= 0; i--) { // Corrected loop to go from length - 1 down to 0
        const currValue = parseInt(numStrArr[i]);
        // ... logic inside loop ...
    }
    ```

    *Correction*: The provided loop `for (let i = numStrArr.length; i >= 0; i--)` is incorrect as it starts one past the last index and also includes `i=numStrArr.length` which would be out of bounds. It should be `for (let i = numStrArr.length - 1; i >= 0; i--)`.

4.  **Update Max Value and Potential Swap Indices**:
    Inside the loop:

      * If `currValue` is greater than `maxValue`, it means we've found a new largest digit to the right. We update `maxValue` and its `maxIndex`.
      * If `currValue` is *less* than `maxValue`, this `currValue` at index `i` is a candidate for `leftIndex`. It can be swapped with the `maxValue` found so far, which is located at `maxIndex`. We set `leftIndex = i` and `rightIndex = maxIndex`. This ensures that `leftIndex` points to the leftmost digit that can be swapped to improve the number, and `rightIndex` points to the rightmost largest digit that `leftIndex` can swap with.

    <!-- end list -->

    ```typescript
    if (currValue > maxValue) {
        maxValue = currValue;
        maxIndex = i;
    } else if (currValue < maxValue) {
        // If current digit is smaller than the largest digit found to its right,
        // this is a potential swap. We want the leftmost 'leftIndex' and
        // the rightmost 'rightIndex' that makes it largest.
        leftIndex = i;
        rightIndex = maxIndex;
    }
    ```

5.  **Perform Swap (If Necessary)**:
    After the loop completes, if `leftIndex` is still `-1`, it means no beneficial swap was found (the number is already in its largest possible configuration, e.g., `987` or `111`). In this case, we return the original number. Otherwise, we perform the swap using destructuring assignment.

    ```typescript
    if (leftIndex === -1) {
        return num;
    }

    [numStrArr[leftIndex], numStrArr[rightIndex]] = [numStrArr[rightIndex], numStrArr[leftIndex]];
    ```

6.  **Convert Back to Integer**:
    Finally, join the character array back into a string and parse it as an integer to return the result.

    ```typescript
    return parseInt(numStrArr.join(''));
    ```

## Code Solution

```typescript
function maximumSwap(num: number): number {
    let numStrArr = num.toString().split('');

    let maxIndex = -1;
    let maxValue = -1; // Initialize to -1 to correctly find max for single digit numbers
    let leftIndex = -1;
    let rightIndex = -1;

    // Iterate from right to left
    // We start from length - 1, down to 0, inclusive.
    for (let i = numStrArr.length - 1; i >= 0; i--) {
        const currValue = parseInt(numStrArr[i]);

        if (currValue > maxValue) {
            // Found a new maximum digit to the right.
            // Update maxValue and its index.
            maxValue = currValue;
            maxIndex = i;
        } else if (currValue < maxValue) {
            // If the current digit is smaller than the largest digit found so far to its right,
            // this 'currValue' at index 'i' is a candidate for the 'leftIndex' of our swap.
            // The 'maxValue' (at 'maxIndex') is the candidate for 'rightIndex'.
            // We update leftIndex and rightIndex every time we find a potential swap.
            // This ensures that leftIndex will be the leftmost digit that can be swapped
            // to make the number larger, and rightIndex will be the rightmost
            // largest digit available for that swap.
            leftIndex = i;
            rightIndex = maxIndex;
        }
    }

    // If leftIndex is still -1, it means no swap was needed or beneficial
    // (e.g., the number is already sorted in descending order like 987, or all digits are same like 111).
    if (leftIndex === -1) {
        return num;
    }

    // Perform the swap between the identified leftIndex and rightIndex
    [numStrArr[leftIndex], numStrArr[rightIndex]] = [numStrArr[rightIndex], numStrArr[leftIndex]];

    // Join the array back into a string and convert to an integer
    return parseInt(numStrArr.join(''));
};
```
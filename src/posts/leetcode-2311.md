---
title: Leetcode Daily Question 2311
date: '2025-06-30'
author: Nick Belvin
excerpt: Longest Binary Subsequence less than or equal to K
image: /images/post-previews/leet-code-logo.png
---


## Background
In todays series of me trying to do more leet code I did question 2311 ranked as a ```medium```

---

## Question Overview
*** You are given a binary string s and a positive integer k. ***

*** Return the length of the longest subsequence of s that makes up a binary number less than or equal to k. ***

---

### Understanding the Problem
***What is a subsequence?***

Covered in my last daily question, a subsequence is any sequence derived from the original array by deleting none of many of the existing values while retaining order.

***Key constraints & Goal***

The key issue here is that we need the ***longest*** subsequence that is less than ```k``` thus we must optimize for that.

----

### Initial Thoughts & Approach
* ***Greedy Approach:*** Starting from the right iterate over the array adding all ```0's``` as they don't add to the value, and adding ```1's``` only if the current sum isn't greater than ```k```
* ***The max bit challenge*** we start from the right as our solution cannot be bigger than the max bit size of ```k``` as the binary number will always be bigger than k after that. To calculate this we can convert decimal to binary length with this calculation ```floor(log2(k)) + 1```

----
## Step-by-Step Solution Breakdown

Let's break down the provided TypeScript solution:

1.  **Declare our values**
    ```typescript
    let sum = 0, len = 0;
    const maxBits = Math.floor(Math.log2(k)) + 1;
    ```
    ```sum``` is used to track the current value of our subsequence.
    ```len``` is used to track the current length of the subsequence which is what the output of the function will be.
    ```maxBits``` is the length of the binary equivilent of ```k``` example: ```k = 4``` ```maxBits = 3``` such that 4 in binary is ```100```
2.  **Loop through sequence right to left**
   ```typescript
    for (let i = s.length - 1; i >= 0; i--) {
        const bit = s[i];
        // ...
    }
   ```
   We loop through the subsequence from right to left, representing the smallest possible binary value of the subsequence being the furthest right value.


3.  **When bit === '0'**
    ```typescript
        const bit = s[i];
        if (bit === '1') {
            // ...
        } else {
            len++;
        }
    ```
    When a bit in the array is 0 we always increment len as the sum is unchanged.


4.  **When bit === '1'**
    ```typescript
    const bit = s[i];
    if (bit === '1') {
        const base = (s.length - (i + 1));
        if (base < maxBits && sum + (1 << base) <= k) {
            sum += 1 << base;
            len++;
        }
    } else {
        // ...
    }
    ```
    This is the crucial step, when ```bit``` is ```1``` we must check if adding it makes ```sum``` bigger than ```k``` or if the length of the subsequence is bigger than the ```maxBits```, if both of these conditions pass we increment sum by doing a bit shift on it and then increment len.

## Code Solution

```typescript
function longestSubsequence(s: string, k: number): number {
    let sum = 0, len = 0;
    const maxBits = Math.floor(Math.log2(k)) + 1;

    for (let i = s.length - 1; i >= 0; i--) {
        const bit = s[i];
        if (bit === '1') {
            const base = (s.length - (i + 1));
            if (base < maxBits && sum + (1 << base) <= k) {
                sum += 1 << base;
                len++;
            }
        } else {
            len++;
        }
    }

    return len;
};
```
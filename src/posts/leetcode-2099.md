---
title: Leetcode Daily Question 2099
date: '2025-06-28'
author: Nick Belvin
excerpt: Find Subsequence of Length K with the Largest Sum
image: /images/post-previews/leet-code-logo.png
---


## Background
In an attempt to force myself to do more leet code I thought I would start posting my daily questions and solutions to my blog.
Below is todays question, ranked Easy.

---

## Question Overview
***You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.***

***Return any such subsequence as an integer array of length k.***

---

### Understanding the Problem
***What is a subsequence?***

A subsequence by definition is a sequence that can be derived from another sequence through modification of that sequence in some way.

***Key constraints & Goal***

The key issue here is we need ***exactly*** ```k``` elements and that the sum should be maximized to the largest possible. We should also note that the outputs order does matter and we should maintain original index order.

----

### Initial Thoughts & Approach
* ***Brute Force:*** Not ideal for this scenario as generating all possible subsequences of length ```k``` would be ```O(n^2)```
* ***Greedy Approach:*** Always pick the largest numbers available 
* ***The "index" Challenge:*** Simply picking the largest numbers won't work as the original relative order must be kept

----
## Step-by-Step Solution Breakdown

Let's break down the provided TypeScript solution:

1.  **Pairing Value with Index:**
    ```typescript
    .map((val, index) => ({val, index}))
    ```
    This first step transforms the `nums` array into an array of objects, where each object contains the `val` (the number itself) and its `index` (its original position in the `nums` array). We do this because we need to preserve the original order for the final output, even though we'll sort based on value first.

2.  **Sorting by Value (Descending):**
    ```typescript
    .sort((a, b) => b.val - a.val)
    ```
    Here, we sort the array of objects created in the previous step. The sorting is based on the `val` property in descending order, meaning the largest numbers will come first. This ensures that when we slice the array, we pick the numbers that contribute most to the sum.

3.  **Selecting the Top K:**
    ```typescript
    .slice(0, k)
    ```
    After sorting by value, we simply take the first `k` elements. These `k` elements are the largest `k` numbers from the original `nums` array, along with their original indices.

4.  **Restoring Original Order:**
    ```typescript
    .sort((a, b) => a.index - b.index)
    ```
    This is a crucial step. The `slice` operation gave us the `k` largest numbers, but they are currently sorted by their value. To satisfy the problem's requirement of maintaining original relative order, we sort this sub-array of `k` objects based on their `index` property in ascending order.

5.  **Extracting Values:**
    ```typescript
    .map((num) => num.val);
    ```
    Finally, we map the array of objects back to an array of numbers, extracting just the `val` property. This gives us the subsequence of length `k` with the largest sum, in its original relative order.

## Code Solution

```typescript
function maxSubsequence(nums: number[], k: number): number[] {
    return nums.map((val, index) => ({val, index}))
                         .sort((a, b) => b.val - a.val)
                         .slice(0, k)
                         .sort((a, b) => a.index - b.index)
                         .map((num) => num.val);
};
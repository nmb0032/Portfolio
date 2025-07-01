---
title: Leetcode Daily Question 3330
date: '2025-07-01'
author: Nick Belvin
excerpt: Find the Original Typed String 1
image: /images/post-previews/leet-code-logo.png
---


## Background
You know those moments when you're typing furiously, and suddenly, a key gets stuck for just a split second too long? That's the scenario behind LeetCode's Daily Question 3330, "Find the Original Typed String I." It's a neat little string problem that challenges you to figure out how many different "original" strings Alice might have been trying to type, given that she might have made this "key stuck too long" mistake at most once. It's less about complex algorithms and more about clever observation of string patterns.

---

## Question Overview
The task is to implement a function, let's call it possibleStringCount(word string), which takes the word that Alice ended up typing on her screen. Your goal is to return the total number of distinct strings she could have originally intended to type. The crucial hint is that she only made the "key pressed too long" mistake at most once.

---

### Understanding the Problem
Imagine Alice wants to type "apple" but she accidentally presses 'p' for too long, getting "appple". Or maybe she wanted "cool" but got "coool". This problem asks us to reverse-engineer those possibilities.

Here's the breakdown:

*   **The Mistake**: Alice might have pressed a key for too long, causing a character to be typed multiple times. This specific mistake happens at most once. This means either she made no mistake at all, or she made exactly one mistake.

*   **What's an "Original String"?**: An original string is one that could have produced the word we see, by deleting exactly one character from a consecutive group of duplicates if a mistake occurred. If no mistake occurred, the word itself is an original string.

*   **The Count**: We need to count all possible distinct original strings.

----

### Initial Thoughts & Approach
When faced with this problem, the approach feels pretty intuitive once you get how the "at most once" mistake interacts with consecutive characters.

1. **Start with the Obvious**: The simplest case is that Alice typed the string perfectly, meaning the word itself is one possible original string. So, we'll start our count at 1.

2. **Scan for Trouble Spots**: Now, we need to find where Alice might have made her "key held too long" mistake. This only happens if a character is immediately followed by an identical one. So, we'll walk through the string, character by character.

3. **Count the "Mistake Opportunities"**: Every time we see word[i] being the same as word[i+1], that's a potential spot where Alice held a key too long. Each such instance gives us one additional distinct "original string" possibility (where that specific duplicate was removed).

4. **No Complex Tracking Needed**: Because the mistake can happen "at most once", we don't need to worry about multiple simultaneous errors or complex combinations. We just add 1 to our total count for each occurrence of adjacent identical characters.

5. **Efficiency**: A single pass through the string is all it takes! This keeps our solution super fast, running in O(N) time, where N is the length of the input string. It also uses minimal extra memory (O(1) space).

----
## Step-by-Step Solution Breakdown

Let's break down the provided TypeScript solution:

1. **Handle edge case**
    ```go
    func possibleStringCount(word string) int {
        if len(word) == 0 { return 0 }
        //...
    }
    ```
    If word is empty or nil there is 0 combinations of the word so we return 0.
2. **Initialize a word count**
   ```go
    func possibleStringCount(word string) int {
        //...
        count := 1
        //...
    }
   ```
    Count keeps track of how many words we have, if their is any length to the original word at minimum we must have 1.
3. **Loop word comparing current value with next value**
    ```go
    func possibleStringCount(word string) int {
        //...
        for i := 0; i < len(word) - 1; i++ {
            if word[i] == word[i + 1] {
                count++
            }
        }
        return count;
    }
    ```
    We go from left to right on the array, if the proceeding character = the current character we increment our word count as it could be removed to make a different word.

## Code Solution

```go
func possibleStringCount(word string) int {
    if len(word) == 0 { return 0 }
    count := 1
    for i := 0; i < len(word) - 1; i++ {
        if word[i] == word[i + 1] {
            count++
        }
    }
    return count;
}
```
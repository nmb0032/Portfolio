---
title: Leetcode Daily Question 22
date: '2025-07-02'
author: Nick Belvin
excerpt: Generate Parentheses 
image: /images/post-previews/leet-code-logo.png
---

## Background

Have you ever tried to write a mathematical expression or code, and found yourself staring at a sequence of parentheses, trying to figure out if you've got them balanced correctly? That's the core idea behind LeetCode Problem 22, "Generate Parentheses." It's a classic problem that delves into the world of string manipulation and combinatorics, challenging you to produce all possible combinations of well-formed parentheses given a specific number of pairs. It's less about finding a single answer and more about systematically exploring all valid arrangements.

-----

## Question Overview

The task is to implement a function, `generateParenthesis(n int)`, which takes an integer `n`. Your goal is to return a list of all distinct and **well-formed** parentheses combinations that can be formed using `n` pairs of parentheses.

-----

### Understanding the Problem

Imagine `n` as the number of `(` characters and `n` as the number of `)` characters you have to use. A "well-formed" parenthesis string means:

  * **Balanced:** Every opening parenthesis `(` must have a corresponding closing parenthesis `)`.
  * **Correct Order:** A closing parenthesis `)` cannot appear before its corresponding opening parenthesis `(`.
  * **Total Count:** The final string must contain exactly `n` opening and `n` closing parentheses.

For example, if `n = 3`, some valid outputs would be "((()))", "(()())", "(())()", "()(())", "()()()".

Here's the breakdown:

  * **The Constraint**: We have `n` open parentheses and `n` close parentheses.
  * **The Goal**: Produce *all* unique strings that are valid according to the rules above.
  * **The Challenge**: How do we systematically build these strings while ensuring validity at each step?

-----

### Initial Thoughts & Approach

When tackling this problem, the idea of building the string piece by piece and making choices at each step naturally leads to a **backtracking** approach. This recursive strategy allows us to explore all possible paths, pruning those that become invalid early.

1.  **Building Incrementally**: We can think about building a parenthesis string character by character. At any point, we have two choices: add an `(` or add a `)`.

2.  **Tracking State**: To ensure validity, we need to keep track of two things:

      * `openCount`: How many `(` we've used so far.
      * `closeCount`: How many `)` we've used so far.

3.  **Backtracking Rules (Pruning Invalid Paths)**: This is where the magic happens.

      * **Rule 1 (Adding '('):** We can always add an `(` as long as `openCount < n`. If we add it, we increment `openCount` and recursively call our function.
      * **Rule 2 (Adding ')'):** We can only add a `)` if `closeCount < openCount`. This is crucial\! It ensures we never close a parenthesis before there's an open one to match, maintaining the "correct order" rule. If we add it, we increment `closeCount` and recursively call our function.

4.  **Base Case (When to Stop):** Our recursion stops and we've found a valid combination when `openCount == n` AND `closeCount == n`. At this point, the `current` string is a valid well-formed parenthesis combination, and we add it to our `result` list.

5.  **Efficiency**: Backtracking explores a decision tree. The number of valid combinations grows quite rapidly (it's related to Catalan numbers), but this approach systematically finds all of them without generating invalid ones unnecessarily, making it efficient for the given constraints.

-----

## Step-by-Step Solution Breakdown

Let's break down the provided Go solution using the backtracking strategy:

1.  **Initialize Result Slice:**

    ```go
    func generateParenthesis(n int) []string {
        result := make([]string, 0, n)
        // ...
    }
    ```

    We start by creating an empty string slice `result`. The `0, n` is a subtle optimization; `0` is the initial length, and `n` is a heuristic for initial capacity (though the actual number of combinations grows faster than `n`).

2.  **Declare the Backtracking Function:**

    ```go
    func generateParenthesis(n int) []string {
        // ...
        var backtrack func(current string, opencount, closecount int)
        // ...
    }
    ```

    This line is key for recursive nested functions in Go. We *declare* the `backtrack` variable with its function signature first (`func(current string, opencount, closecount int)`). This makes the `backtrack` identifier available for recursive calls *within* its own definition, solving the "chicken-and-egg" problem for recursive anonymous functions.

3.  **Define the Backtracking Logic:**

    ```go
    // ...
    backtrack = func(current string, opencount, closecount int) {
        // Base Case
        if opencount == n && closecount == n {
            result = append(result, current)
            return
        }

        // Rule 1: Add '('
        if opencount < n {
            backtrack(current + "(", opencount + 1, closecount)
        }

        // Rule 2: Add ')'
        if closecount < opencount { // Crucial condition: cannot close if no open is available
            backtrack(current + ")", opencount, closecount + 1)
        }
    }
    // ...
    ```

      * **Base Case:** If we've used all `n` open and all `n` close parentheses, we've successfully formed a well-formed string. We `append` this `current` string to our `result` slice and `return` to backtrack.
      * **Add Open Parenthesis:** We check if we still have open parentheses available (`opencount < n`). If so, we make a recursive call, adding `(` to `current`, incrementing `opencount`.
      * **Add Close Parenthesis:** We check if we can add a closing parenthesis. The condition `closeCount < opencount` is vital: it prevents us from adding a `)` if there isn't a preceding `(` that it can match. If allowed, we make a recursive call, adding `)` to `current`, and incrementing `closecount`.

4.  **Initiate Backtracking:**

    ```go
    // ...
    backtrack("", 0, 0) // Start the recursion with an empty string and zero counts
    // ...
    ```

    We kick off the entire process by calling `backtrack` with an empty string (`""`), `0` open parentheses used, and `0` close parentheses used.

5.  **Return Result:**

    ```go
    // ...
    return result
    ```

    Finally, after all recursive calls have completed and all valid combinations have been found, the function returns the `result` slice containing all well-formed parenthesis strings.

## Code Solution

```go
func generateParenthesis(n int) []string {
    result := make([]string, 0, n)

    var backtrack func(current string, opencount, closecount int) // Declare the variable

    backtrack = func(current string, opencount, closecount int) { // Assign the function literal
        // Base case: If we've used all N open and N close parentheses
        if opencount == n && closecount == n {
            result = append(result, current) // Add the valid combination
            return
        }

        // Option 1: Add an opening parenthesis '('
        // We can always add an open parenthesis as long as we haven't used all N yet
        if opencount < n {
            backtrack(current + "(", opencount + 1, closecount)
        }

        // Option 2: Add a closing parenthesis ')'
        // We can only add a closing parenthesis if we have more open parentheses than closed ones
        // This ensures the well-formed property (no ')' without a preceding '(')
        if closecount < opencount {
            backtrack(current + ")", opencount, closecount + 1)
        }
    }

    // Start the backtracking process with an empty string and zero counts
    backtrack("", 0, 0)

    return result
}
```
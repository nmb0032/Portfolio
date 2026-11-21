---
title: Learning Rust Through LeetCode - ATOI
date: '2026-11-21'
author: Nick Belvin
excerpt: Starting my Rust journey with String to Integer (atoi) and the trick of clamping before overflow
image: /images/post-previews/leet-code-logo.png
---

## Background

I've started learning Rust, and my go-to way of picking up a new language is solving LeetCode problems in it. First up is problem 8, **String to Integer (atoi)**. It looks simple, but it's a great tour of Rust strings, `match`, integer types, and what happens at the edges of `i32`.

-----

## Question Overview

Implement `my_atoi(s)` which converts a string to a 32-bit signed integer:

1. Skip leading whitespace.
2. Read an optional `+` or `-` sign.
3. Read digits until the first non-digit.
4. If the value is outside the `i32` range, **clamp** it to `i32::MIN` or `i32::MAX`.

-----

## Approach

Rust strings are UTF-8, so you can't index them like `s[i]`. The easiest fix is to collect the characters into a `Vec<char>` and walk it with an index:

```rust
let mut i = 0;
let s_chars: Vec<char> = s.chars().collect();
for c in s_chars.iter() {
    if !c.is_whitespace() {
        break;
    }
    i += 1;
}
```

The sign is a nice use of `match`, which forces you to handle every case (the `_ => {}` arm covers "no sign"):

```rust
let mut sign = 1;
if i < s_chars.len() {
    match s_chars[i] {
        '+' => i += 1,
        '-' => {
            sign = -1;
            i += 1;
        }
        _ => {}
    }
}
```

-----

## The Interesting Part: Clamping Before Overflow

The naive loop is `result = result * 10 + digit`. The problem: with an `i32`, that multiplication can overflow *before* you get a chance to check it. In a debug build Rust panics on overflow, and in release it silently wraps, so neither is what we want.

The fix is to check **before** doing the math. Rearranging `result * 10 + digit > limit` gives `result > (limit - digit) / 10`, which never overflows. I also widened to `i64` so the limits are easy to express:

```rust
let limit = if sign == 1 {
    i32::MAX as i64
} else {
    -(i32::MIN as i64)
};
let mut result: i64 = 0;
while i < s_chars.len() && s_chars[i].is_ascii_digit() {
    let digit = (s_chars[i] as u8 - b'0') as i64;

    if result > (limit - digit) / 10 {
        return if sign == 1 { i32::MAX } else { i32::MIN };
    }

    result = result * 10 + digit;
    i += 1;
}
```

A few things I liked here:

* **The limit depends on the sign.** The negative range is one larger (`-2147483648` vs `2147483647`), so using `-(i32::MIN as i64)` as the limit for negatives handles that asymmetry naturally. Negating `i32::MIN` directly would overflow, which is why the cast to `i64` comes first.
* **Early return.** As soon as the next digit would push us past the limit, we return the clamped value, so we never hold an out-of-range number.
* **Explicit casts.** Rust won't implicitly convert between integer types. It's annoying at first, but it makes every widening and narrowing visible.

-----

## Testing

Rust makes unit tests easy: put a `#[cfg(test)]` module in the same file and run `cargo test`. I covered the basics plus both overflow directions:

```rust
#[test]
fn test_my_atoi_overflow_negative() {
    assert_eq!(Solution::my_atoi("-91283472332".to_string()), i32::MIN);
}

#[test]
fn test_my_atoi_overflow_positive() {
    assert_eq!(Solution::my_atoi("91283472332".to_string()), i32::MAX);
}
```

-----

## Takeaways

* Rust's strictness about integer types and overflow pushes you to think about edge cases up front.
* Checking *before* an operation that could overflow is a pattern worth remembering. Rust also offers `checked_mul`, `checked_add`, and `saturating_*` methods, which I want to try next.
* Built-in testing lowers the friction of verifying edge cases.

More Rust problems to come!

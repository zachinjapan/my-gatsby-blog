---
title: An Introduction to Recursion
date: "2022-01-01"
description: "Learn the basics about recursion"
tags: ["programming concepts", "javascript"]
---

On my journey to becoming a web developer in Japan, I have found two concepts difficult to understand. The first, is [higher order functions](https://dev.to/zachinjapan/higher-order-functions-4h7e). The second is recursion.

## What is recursion?

<br>

<img width="100%" style="width:100%" src="https://media.giphy.com/media/xThuWu82QD3pj4wvEQ/giphy.gif"/>

> Recursion (adjective: recursive) occurs when a thing is defined in terms of itself or of its type... a function being defined is applied within its own definition. While this apparently defines an infinite number of instances (function values), it is often done in such a way that no infinite loop or infinite chain of references can occur. - Wikipedia

## Now, in layman's terms

<br>

> Recursion is when the function uses itself in a loop until some test, defined within itself, is met. - Zach Stone

## Let's look at an example.

<br>

Define a function that takes an input number. The program console logs the number and every subsequent number reducing by one each time. It does this until it reaches 0. When the function reaches 0, it should console log "I'm finished."

## without recursion (iteratively)

<br>

```
const countDown = (num) => {
  for (let x = num; x >= 0; x--) {
    if (x === 0) {
      console.log("I'm finished");
    } else {
      console.log(x);
    }
  }
};

countDown(20); // 20 , 19, 18, 17, 16, 15 ,14 ,13 ,12 ,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, "I'm finished"

```

## with recursion (recursively)

<br>

The key is thinking about the **base case**. That's the test to see if we can end the loop.

The base case in this situation is

`if (x === 0)`

So we need to rewrite the function.

```

const countDown = (num) => {
  if (num === 0) {
    console.log("I'm finished");
  } else {
    console.log(num);
    return countDown(num - 1);
  }
};

countDown(20); // 20 , 19, 18, 17, 16, 15 ,14 ,13 ,12 ,11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, "I'm finished"




```

## We did it!!!!

<br>

<img width="100%" style="width:100%" src="https://media.giphy.com/media/3oz8xynJ88hmIdCCOI/giphy.gif">

The function calls itself over and over, reducing by 1 each time. Finally, when the base case is met, it console logs "I'm finished" and ends.

## Here are some resources to learn more

- [Recursion in 100 Seconds <3](https://www.youtube.com/watch?v=rf60MejMz3E)
- [A great intro to recursion by Colte Steele](https://www.youtube.com/watch?v=lMBVwYrmFZQ)
- [Codewars playlist of recursion problems](https://www.codewars.com/collections/recursion-1)
- [freeCodeCamp article](https://www.freecodecamp.org/news/understanding-recursion-in-programming/)
- [freeCodeCamp YouTube vid](https://www.youtube.com/watch?v=IJDJ0kBx2LM)

Did you enjoy this article? Or did I get something wrong?

Feel free to contact me using my [website](https://zstone.dev)

Have a fantastic day!

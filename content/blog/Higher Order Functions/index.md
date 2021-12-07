---
title: Higher Order Functions
date: "2021-12-07"
description: "Learn the basics about higher order functions and what they are used for"
---

## I was recently confused by this simple question.

```js
/*
Declare a function 'add'.

'add' takes one number input: 'x'.

'add' returns a function that takes one number input 'y'.

This returned function returns the sum of 'x' and 'y' when run.
*/
```

<div style="width:100%;height:0;padding-bottom:105%;position:relative;"><iframe src="https://giphy.com/embed/ji6zzUZwNIuLS" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/no-ji6zzUZwNIuLS">via GIPHY</a></p>

### Did you try to solve it? Here is one possible answer;

```js
function add(x) {
  return function innerFunction(y) {
    return x + y
  }
}

//example

const addTwo = add(2) //stores the inner function with x inherited
const sum = addTwo(3) // inputs y as 3
//sum = 5
```

## That my friend is a higher order function

[Elqouent Javascript Chapter 5](https://eloquentjavascript.net/05_higher_order.html "EJS")

    Functions that operate on other functions,
    either by taking them as arguments or
    by returning them, are called higher-order functions.

The example above is an example of returning a function and having returned funccion inherit the outer scope function's variable

Here is an example of using a function as an input

```js
const add = (num1, num2) => {
  return num1 + num2
}

const multiply = (num, multiplier) => {
  return num * multiplier
}

// example

console.log(multiply(add(3, 7), 10)) // 100
```

Hope that helps!

You might have noticed that there are a few Array Methods that take functions as inputs.... well....
that's
cause they are higher order functions!

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/51UpqfGlFF0hjHzecq" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/latelateshow-shocked-wake-up-james-corden-51UpqfGlFF0hjHzecq">via GIPHY</a></p>

### My favortite array method

##### Array.prototype.map()

[MDN article on .map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map "MDN")

```js
const array1 = [1, 4, 9, 16]

// pass a function to map
const map1 = array1.map(x => x * 2)

console.log(map1)
// expected output: Array [2, 8, 18, 32]
```

Cool right?

# Here are some free resources

> 1. [Elqouent Javascript Chapter 5](https://eloquentjavascript.net/05_higher_order.html "EJS")
> 2. [Code Wars Higher Order Function Questions](https://www.codewars.com/collections/higher-order-functions "code wars")
> 3. [FreeCodeCamp Article](https://www.freecodecamp.org/news/a-quick-intro-to-higher-order-functions-in-javascript-1a014f89c6b/ "freeCodeCamp")
> 4. [Great youtube vid](https://www.youtube.com/watch?v=BMUiFMZr7vk "youtube")

Did you enjoy this article? Or did I get something wrong?

Feel free to contact me using my [website](https://zstone.dev "zach's website");

Have a fantastic day!
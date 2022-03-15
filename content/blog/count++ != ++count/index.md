---
title: count++ != ++count
date: "2022-02-05"
description: "Learn about the ++ and -- operators"
tags: ["programming concepts", "javascript"]
---

<img src ="https://media.giphy.com/media/3o6nV5TdYIA48G7VYI/giphy.gif" width="100%" style="width:100%" />

## What is the result of this code?

```
let count = 0;
console.log(count++)
```

....it's...

```

0


```

<img src = "https://media.giphy.com/media/3o72F8t9TDi2xVnxOE/giphy.gif" width="100%" style="width:100%" />

## Let's learn about post-increment and pre-increment

> The pre-increment and pre-decrement operators increment (or decrement) their operand by 1, and the value of the expression is the resulting incremented (or decremented) value.
> The post-increment and post-decrement operators increase (or decrease) the value of their operand by 1, but the value of the expression is the operand's value before the increment (or decrement) operation. - Wikipedia

Let's look at what's going on "under the hood".

Here is a representation using a JavaScript class object.

postAdd = {count++}
preAdd = {++count}

```
class Counter {
  constructor (){
    this.count = 0
  }
  postAdd(){
    let oldCount = this.count;
    this.count+=1;
    return oldCount
  }
  preAdd(){
    this.count += 1;
    return this.count
  }
}

let count = new Counter();

console.log(count.postAdd()) // 0

console.log(count.preAdd()) // 2 (the first console.log still increments!!!)

```

## In my own words

> {variable}++ can be used when you don't reference the increased variable in that function call, and ++{variable} is valid when you need to reference the incremented variable immediately. -Zach Stone

Technically, pre increment is also faster since it is not creating a new variable each time.

## How do you decide whether to use pre or post-increment?

Feel free to contact me using my [website](https://zstone.dev).

Have a fantastic day!

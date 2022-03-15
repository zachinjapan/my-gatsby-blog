---
title: this.concept = important
date: "2022-01-18"
description: "Learn the basics about 'this'"
tags: ["programming concepts", "javascript"]
---

## What is 'this'?

<img src = "https://media.giphy.com/media/26FLgGTPUDH6UGAbm/giphy.gif" width="100%" style="width:100%">

> A property of an execution context (global, function, or eval) that, in non–strict mode, is always a reference to an object and in strict mode can be any value. (MDN)

## Let's look at some analogies

jacket.this = you

jacket button.this = jacket

the plastic part of the button.this = jacket button

Make sense?

## What is 'this' in your browser? Let's see!

> console.log(this)
> [Log] Window {listeners: Object, initPagination: function, timeAgo: function, sendFetch: function, setCurrentUserToNavBar: function, …}....

It's the window!

## How do we use 'this'?

There are many uses for 'this.' I also am aware that there are specific considerations when using 'this' in functions depending on whether they are arrow functions or "use strict" is on.

Let's talk about the most common use case I am aware of.

## 'this' in Classes

A JavaScript class is an object factory. The constructor is the part that makes the object.

Let's make two person objects using the Person class and assign them a name using 'this.'

```
class Person {
 constructor(name) {
 this.name = name;
 }

 sayHi() {
 return (`Hi, I'm ${this.name}`);
 }
}

const Person1 = new Person ("Bob");
const Person2 = new Person ("Jill");

console.log(Person1.name);
// Bob
console.log(Person2.name);
// Jill
console.log(Person1.sayHi());
// Hi, I'm Bob
console.log(Person2.sayHi());
// Hi, I'm Jill
```

<img src = "https://media.giphy.com/media/Rl9Yqavfj2Ula/giphy.gif" width="100%" style="width:100%" />

I hope that helped you understand what 'this' is.

My favorite use of 'this' is in linked lists... but that is a topic for a different blog post!

Here are some resources to learn more about 'this.'

- [JavaScript this Keyword](https://www.youtube.com/watch?v=gvicrj31JOM)
- [What is THIS in JavaScript? in 100 seconds](https://www.youtube.com/watch?v=YOlr79NaAtQ)

Did you enjoy this article? Or did I get something wrong?

Feel free to contact me using [my website](https://zstone.dev).

Have a fantastic day!

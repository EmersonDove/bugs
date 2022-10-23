---
title: callback to member function from a static context
position: 1
category: C++
---

Generally this shouldn't be done, refactor your code to not have to do this, but this does work as a patch solution for existing software.

## Solution

Imagine you have a class

```c++
#include <iostream>

class Tracker {
public:
  void should_be_called_on_callback(int input) {
    std::cout << "called" << std::endl;
  }
}
```

You might think to assign the callback in this way:

```c++
Tracker* t;

// Compiler will say: Reference to non-static member must be called
CallbackType OtherClass::userCallback = t->should_be_called_on_callback; // this won't work
```

The solution is to add a second wrapper function:

```c++
Tracker* t;

// Match the function signature of the member class
void intermediate_callback(int input) {
  t->should_be_called_on_callback(input);
}

// Assign to the intermediate instead of directly to the class
CallbackType OtherClass::userCallback = intermediate_callback;
```


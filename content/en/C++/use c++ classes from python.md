---
title: use c++ classes from python ctypes
position: 1
category: C++
---

This is mostly based on [this awesome stack overflow post](https://stackoverflow.com/a/7061012/8087739). I think a lot of tutorials are overcomplicated when it comes to this topic, so I'm creating this to provide some clarity to myself and potentially others. The goal here is **to only use builtins for both languages.**

One thing to remember is that there is no binary interface for C++ in the same way there is for C, so one of the easy solutions to this is to create a C API above your C++ code.



Here is a basic C API running inside of C++ named `extern.cpp`:

```c++[extern.cpp]
#include <new>

class MyClass {
 public:
  MyClass() {
  }

  int Test() {
    return 42;
  }
};

extern "C" {
  void * CreateInstanceOfClass(void) {
    return new (std::nothrow) MyClass;
  }

  void DeleteInstanceOfClass (void *ptr) {
    delete ptr;
  }

  int CallMemberTest(void *ptr) {

    // Note: A downside here is the lack of type safety.
    // You could always internally(in the C++ library) save a reference to all
    // pointers created of type MyClass and verify it is an element in that
    //structure.
    //
    // We should avoid throwing exceptions.
    try
    {
      MyClass * ref = reinterpret_cast<MyClass *>(ptr);
      return ref->Test();
    }
    catch(...)
    {
      return -1; //assuming -1 is an error condition.
    }
  }
};

```

And a quick `CMakeLists.txt` to compile this into a shared object (`.so`) file:

```cmake[CMakeLists.txt]
cmake_minimum_required(VERSION 3.17)
project(cAPI)

set(CMAKE_CXX_STANDARD 14)

add_library(
        cAPI
        SHARED
        extern.cpp
)

set_target_properties(cAPI PROPERTIES LINKER_LANGUAGE CXX)
```

Build this using `cmake` and then `make` or just look for a build icon in your IDE. Find the build output of that it should look something like `libcAPI.so`

Now using this in python is very easy:

```python
import ctypes

if __name__ == "__main__":
    # Load the library as a cdll
    libc = ctypes.cdll.LoadLibrary('/path/to/your/libcAPI.so')
    
    # This will create an instance of your class and return the address to it
    class_instance = libc.CreateInstanceOfClass()

    # This will send the reference to the C API where it will be casted. This will then call
    #  the Test() function which will return 42.
    # -->> Should print 42
    print(libc.CallMemberTest(class_instance))

```

There are infinite solutions for calling C++ from python, this is just one that requires no external dependencies.
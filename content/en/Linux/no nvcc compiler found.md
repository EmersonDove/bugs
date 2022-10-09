---
title: no nvcc compiler found
position: 1
category: Linux

---

## Platform (`uname -a`)

Jetson Nano

Linux robot-desktop 4.9.253-tegra #1 SMP PREEMPT Wed Apr 20 14:25:12 PDT 2022 aarch64 aarch64 aarch64 GNU/Linux

## Error

```
CMake Error at cmake/pcl_find_cuda.cmake:13 (enable_language):
  No CMAKE_CUDA_COMPILER could be found.

  Tell CMake where to find the compiler by setting either the environment
  variable "CUDACXX" or the CMake cache entry CMAKE_CUDA_COMPILER to the full
  path to the compiler, or to the compiler name if it is in the PATH.
Call Stack (most recent call first):
  CMakeLists.txt:383 (include)
```

## Solution

Set the `CUDACXX` variable. In this case I'm using `10.2`:

`export CUDACXX=/usr/local/cuda-10.2/bin/nvcc`

Make sure to change the `cuda-10.2` to what matches your version. I have a `cuda-10` folder as well as a `cuda` folder but just used `cuda-10.2`.
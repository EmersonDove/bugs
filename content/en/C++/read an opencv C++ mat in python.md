---
title: read an openv C++ Mat or numpy array in Python
position: 1
category: C++
---

```python[python script.py]
# First you need some structure to reference the image details
# The meat of this is a pointer to an array of bytes which is the image
class __ImageChar(ctypes.Structure):
    _fields_ = [
        ('height', ctypes.c_int),
        ('width', ctypes.c_int),
        ('type', ctypes.c_int),
        ('data', ctypes.POINTER(ctypes.c_ubyte))
    ]


# Load your library
_LIB = ctypes.cdll.LoadLibrary("Path to lib")


# Now define that your C interface function returns an ImageChar struct
_LIB.SingleFrame_GetRGB.argtypes = []
_LIB.SingleFrame_GetRGB.restype = __ImageChar


def get_image() -> np.ndarray:
		global _LIB
    cv_struct_instance = _LIB.SingleFrame_GetRGB()

		# The most interesting part of this is the .string_at function which should read
		#  the width*height*3. The 3 is because of RGB channels (8 bit color)
    data = ctypes.string_at(cv_struct_instance.data, (cv_struct_instance.height * cv_struct_instance.width * 3))
    nparr = np.frombuffer(data, dtype=np.ubyte)
    nparr = np.reshape(nparr, (cv_struct_instance.height, cv_struct_instance.width, 3))

		# Switch the colors from OpenCV BGR to RGB if needed. This could go into Pillow
    # nparr = nparr[:, :, ::-1]

		# Sometimes the images that come out are a little funky just use Pillow to visualize if thats the case
    return nparr
```

And in C++:

```c++
# Use a C interface for python ctypes
extern "C" {
  struct OpenCVImageRGB {
    int height;
    int width;
    int type; // this is the openCV type like CV_8UC3
    unsigned char *data;
  };
  
  // This is your image of any cv::Mat type just make sure it gets into the function scope
  //  below
  cv::Mat frame_;
  
  OpenCVImageRGB SingleFrame_GetRGB() {
    auto im = new OpenCVImageRGB();
    im->height = frame_.rows;
    im->width = frame_.cols;
    im->type = frame_.type();
    
    # This is the meat of the image
    im->data = frame_.data;

    return *im;
  }
}
```


---
title: Qiskit mixed debugging
categories:
- Quantum Computing
tags:
- Quantum Computing
- Qiskit
---

[Qiskit](https://github.com/Qiskit/qiskit) is an open-source SDK for working with quantum computers at the level of extended quantum circuits, operators, and primitives. Qiskit's API is provided as a python library but it has many components that are implemented natively in [Rust](https://github.com/rust-lang/rust) to optimize CPU workloads.

As developers, we would like to debug the code starting from the API level and sometimes all the way through the native libraries. Although desirable, debugging managed and native environments together can be somewhat tricky.

Here we will do just that, using [vscode](https://code.visualstudio.com/). It is assumed that you have Qiskit locally and know how to run it locally. We will need the following vscode extensions:
- [Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy) to debug the python code
- [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) to debug the native code

As a simple use case, let's create a small python example that invokes a native function. Create a file at `

Vscode launch configurations are found in `.vscode/launch.json` under the `configurations` field in `examples/python/debug.py` with the contents:
```python
from qiskit._accelerate.circuit import CircuitData

circuit_data = CircuitData()
circuit_data.clear()
```

Notice how `CircuitData` is being imported from the `_accelerate` native module. The `clear` method is defined in `crates/accelerate/circuit/src/circuit_data.rs` file and it's signature is:
```rust
pub fn clear(&mut self)
```

Let's add two breakpoints, one at the start of the python file and the other at the first body line of the native clear method.

## Debugging

To configure launch options in vscode we need to edit the file `.vscode/launch.json`. Specifically, we will edit the configuration attribute. A launch file with no configurations should look similar to this:

```json
{
    "version": "0.2.0",
    "configurations": [],
}
```

Now we need to configure the debugger configuration. In reality, we need to active debuggers - Python debugger and a native debugger.

**Python script debug**

First, lets define a python debugger and make sure we can debug the python file we have created. In the configuration attribute, add a new object as follows:

```json
{
    "name": "Debug python file",
    "type": "debugpy",
    "request": "launch",
    "program": "${workspaceFolder}/examples/python/debug.py",
}
```

We should now have a "Debug python file" launch option under the "Run and Debug" tab. Make sure that when you click on the play button the breakpoint we have defined in `debug.py` is catched.

**Native debug**

To debug the native code we need to understand this - To use the native code, (the executable) python dynamically links against the shared object. The shared object output is a `.so` file produced by building the Rust code. If you havn't done so, build it now, in debug mode:

```
RUST_DEBUG=1 python setup.py build_rust --inplace
```

In my enviornment, the output is at `qiskit/_accelerate.cpython-312-darwin.so`. In your environment it is probably located in the same place with another/same name.

To debug the native code, we actually need to debug (the executable) python ifself because it is the process who runs the native code. To do so, add the following configuration to the `launch.json` file:

```json
{
    "name": "LLDB Attach",
    "type": "lldb",
    "request": "attach",
    "program": "${workspaceFolder}/qiskit/_accelerate.cpython-312-darwin.so",
    "pid": "${command:pickProcess}",
    "stopOnEntry": false,
}
```

> Remember to change the .so file path as needed!

There should now be another launch option called "LLDB Attach". When paused on the python script, python is running. When launching the new launch option, it will open an input box to insert the pid of the executable. In the text box, enter "python" to filter the relevant processes and select the relevant process (usually it will be the top filtered process since it ran the latest).

Now our native debugger is attached to python and we are ready to debug the native code. If you set a breakpoint in the native code at the `clear` method as described earlier, you can resume debugging and it should land in the native code!
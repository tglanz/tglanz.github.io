---
title: Python Common
---

### Lists

Common operations

```python
# Hetrogeneous
items = [5, 5, 'x'] 

# Append an element to the end of the list
items.append(8)

# Pop the element at the end of the list
items.pop()

# Pop the element at the "index" of the list
items.pop(index)

# Insert an element before a specific index
items.insert(1, 4)

# Removes first occurence of the given value
# Raises ValueError if the value is not present
items.remove(5)

# Copy the list
items.copy()

# Count the number of occurrences of the given value
items.count(5)

# Append all elements of another list
items.extend([ 2, 4, 4 ])

# Reverse the list in place
items.reverse()

# Sort the list in place
items.sort()

# Sort also gets a "key" function and a "reverse" boolean
```

Slices

```
items = ["a", "b", "c", "d", "e"]

# Slice items from "start" inclusive to "stop" exclusive with increments of "step"
items[start:stop:step]

# By default, "start" is 0 and "stop" is "len(items)" and "step" is 1
items[:stop] == items[0:stop]
items[start:] == items[start:len(items)
items[:] == items[0:len(items)]
```

### Dictionaries

```
items = { "a": 1, 3: "x" }

# Get the dict_keys
items.keys()

# dict_keys has a nice function "isdisjoint"
items.keys().isdisjoint([5]) == True

# Get the dict_values
items.values()

# Get the dict_items
items.items()

# IMPORTANT: "dict_keys", "dict_values" and "dict_items" are views of the "mapping" dictionaries.
# They will be up to date with any modifications of the dictionary.

# Get the value of "key", return "default" if it doesn't exist.
items.get(key, default)

# By default, "default" is None
items.get(key)

# Copy the dictionary shallowly
items.copy()

# Pop the value of "key".
# Raises a KeyError if it doesn't exit
items.pop(key)

# Pops that last inserted item.
# What is the usecase for this?
items.popitem()

# Set the "key" value only if it doesn't exist.
# Leaving it unmodified it if does exist.
items.setdefault(key, value)

# Add the "other" dictionary items to the dictionary.
# Existing keys will have the values overwritten.
items.update({ "x": 4, 2: "q" })


```

**TODO**

- heapq
- collections.Counter
- collections.deque
- iterables
- functools

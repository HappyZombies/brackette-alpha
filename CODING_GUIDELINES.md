# Coding Guidelines

- Spaces, no tabs.
- End of line should should be Unix style (`\n`).
- Opening brackets goes in the same line as the last statement

```
    if (condition) {
        stuff;
    }
```

- A space between keywords and parenthesis for: `if`, `else`, `while`, `switch`, `catch`, `function`
- Function calls have no space before the parentheses
- No spaces are left inside the parentheses
- A space after each comma, but without space before
- All binary operators must have one space before and one after
- There should not be more than one contiguous blank line
- There should be no empty comments
- You should not use block comments `/ * ... * /`, only line `// ...`, use `/* ... */` for documenation only
- Changes in functionality must be accompanied by their respective new / modified tests
- Exceptions must be used to report erroneous states. The use of functions that return true / false is allowed when they are expected values

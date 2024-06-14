# OTP Input Handler

The `OTP` class is designed to handle One-Time Password (OTP) input fields, ensuring they accept only digits, managing cursor movements, and handling paste events.

![OTP Input Demo](./otp-demo.gif)

## Features

- Validates input to ensure only digits are entered.
- Allows pasting a complete OTP into the input fields.
- Automatically moves the cursor to the next input field when a digit is entered.
- Moves focus to the previous input field when backspace is pressed.

## Usage
Include the `OTP` class in your project by adding it to your JavaScript file. Ensure you have input elements with a specific class name in your HTML.

### HTML

Add the following input fields to your HTML:

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Input Example</title>
</head>
<body>
    <input type="text" class="otp-input" maxlength="1" />
    <input type="text" class="otp-input" maxlength="1" />
    <input type="text" class="otp-input" maxlength="1" />
    <input type="text" class="otp-input" maxlength="1" />
    <input type="text" class="otp-input" maxlength="1" />
    <input type="text" class="otp-input" maxlength="1" />

    <!-- Make sure you are using type of module to leverage imports and exports -->
    <script src="script.js" type="module"></script>
</body>
</html>
```

### Javascript

In script.js file, import "OTP" from OTP.js and create a new OTP instance passing the classname of OTP input fields

```javascript
import OTP from './OTP.js'

new OTP('otp-input')
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

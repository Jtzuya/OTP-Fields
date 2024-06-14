/**
 * OTP class to handle OTP input fields.
 * This class attaches event handlers to input fields with a specified class name
 * and manages input validation, cursor movement, and paste operations.
 */

class OTP {
  /**
   * Creates an instance of OTP.
   * @param {string} elements - The class name of the target input elements.
  */
  constructor(elements) {
    this.otp          = '';
    this.elements     = document.getElementsByClassName(elements);

    if (this.elements.length === 0) {
      console.log(`element target with classname of ${elements} can\'t be found`);
      return;
    }

    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener('input', (e) => this.inputHandler({ idx: i, e }));
      this.elements[i].addEventListener('keyup', (e) => this.keyupHandler({ idx: i, e }));
      this.elements[i].addEventListener('paste', (e) => this.pasteHandler({ idx: i, e }));
    }
  }

  // ==================== Event Handlers Starts Here ==================== 
  /**
   * Handles input events for OTP input fields.
   * Prevents default action, validates input to allow only digits,
   * and ensures only one digit is entered at a time.
   *
   * @param {Object} props - An object containing parameters.
   * @param {number} props.idx - The index of the OTP input field.
   * @param {Event} props.e - The input event object.
   */
  inputHandler(props) {
    const { idx, e } = props;
    e.preventDefault();

    let currentInputVal = e.target.value, previousInputVal = '', inputValToDisplay = currentInputVal;

    if (currentInputVal.length > 1) {
      inputValToDisplay  = currentInputVal.split('')[currentInputVal.length - 1]; // desired value to display
      previousInputVal   = currentInputVal.split('')[currentInputVal.length - 2];
    }

    // If current value contains non-digit, clear the input
    if (/^\d+$/.test(inputValToDisplay) === false && previousInputVal.length === 0) return e.target.value = ''

    // If previous value is a digit, move focus to the next input field
    if (/^\d+$/.test(previousInputVal) === true) return this.focusNext(idx, previousInputVal)

    // If value to display is a digit, set it and move focus to the next input field
    if (/^\d+$/.test(inputValToDisplay) === true) return this.focusNext(idx, inputValToDisplay)
  }

  /**
   * Handles the paste event for an input field.
   * Extracts the pasted content and validates it.
   *
   * @param {Object} props - An object containing parameters.
   * @param {number} props.idx - The index of the OTP input field.
   * @param {ClipboardEvent} props.e - The clipboard event triggered on paste.
   */
  pasteHandler(props) {
    const { e } = props;
    e.preventDefault();

    this.otp = e.clipboardData.getData('text');
    if (this.otp.length !== 6) return; // exit immediately if the pasted content is not 6 characters
    if (/^\d+$/.test(this.otp) === false) return; // exit immediately if clipboard text contains any letters or special chars

    for (let i = 0; i < this.otp.length; i++) this.elements[i].value = this.otp[i];
  }

  /**
   * Handles the keyup event for an input field in an OTP form.
   * Moves focus to the previous input field on backspace.
   *
   * @param {Object} props - An object containing parameters.
   * @param {number} props.idx - The index of the input field.
   * @param {KeyboardEvent} props.e - The keyboard event object.
   */
  keyupHandler(props) {
    const { idx, e } = props;
    e.preventDefault();

    if (e.code.toLowerCase() !== 'backspace') return; // check first if we are pressing the backspace
    
    /*
      if backspace is pressed, we when check if the idx is at 0, 
      means the first element an we don't want to run because 
      if idx = 0 then we subract 1, it will give negative and returns error.

      If we also join the two conditions above 
      if (e.code.toLowerCase() !== 'backspace' && idx === 0) return
      it will introduce a bug
    */
    if (idx === 0) return

    this.elements[idx - 1].selectionStart = 1;
    this.elements[idx - 1].focus();
  }

  // ==================== Utility functions/methods Starts Here ====================
  /**
   * Moves focus to the next input field and sets the previous input value.
   * 
   * @param {number} idx - The index of the current input field.
   * @param {string} val - The value to set in the current input field.
   */
  focusNext(idx, val) {
    this.elements[idx].value = val;

    if (idx + 2 > this.elements.length) return

    this.elements[idx + 1].focus();
    this.elements[idx + 1].selectionStart = this.elements[idx + 1].value !== '' ? 1 : 0;
  }
}

export default OTP
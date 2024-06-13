/**
 * OTP class to handle OTP input fields.
 * This class attaches event handlers to input fields with a specified class name
 * and manages input validation, cursor movement, and paste operations.
 */
class OTP {
    static otp = '';
  
    /**
     * Creates an instance of OTP.
     * @param {string} classname - The class name of the target input elements.
     */
    constructor(classname) {
      this.digitEl = document.getElementsByClassName(classname);
  
      if (this.digitEl.length === 0) {
        console.log('target can\'t be found');
        return;
      }
  
      for (let i = 0; i < this.digitEl.length; i++) {
        let input = this.digitEl[i];
  
        input.addEventListener('input', (e) => this.inputHandler({ idx: i, e }));
        input.addEventListener('keyup', (e) => this.keyupHandler({ idx: i, e }));
        input.addEventListener('paste', (e) => this.pasteHandler({ idx: i, e }));
      }
    }
  
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
  
      let currentValue = e.target.value;
      let previousValue = '';
      let valueToDisplay = currentValue;
  
      if (currentValue.length > 1) {
        valueToDisplay = currentValue.split('')[currentValue.length - 1]; // desired value to display
        previousValue = currentValue.split('')[currentValue.length - 2];
      }
  
      // If current value contains non-digit, clear the input
      if (/^\d+$/.test(valueToDisplay) === false && previousValue.length === 0) e.target.value = '';
  
      // If previous value is a digit, move focus to the next input field
      if (/^\d+$/.test(previousValue) === true) {
        e.target.value = previousValue;
        if (idx + 1 < this.digitEl.length) {
          this.digitEl[idx + 1].focus();
          this.digitEl[idx + 1].selectionStart = this.digitEl[idx + 1].value !== '' ? 1 : 0;
        }
      }
  
      // If value to display is a digit, set it and move focus to the next input field
      if (/^\d+$/.test(valueToDisplay) === true) {
        e.target.value = valueToDisplay;
        if (idx + 1 < this.digitEl.length) {
          this.digitEl[idx + 1].focus();
          this.digitEl[idx + 1].selectionStart = this.digitEl[idx + 1].value !== '' ? 1 : 0;
        }
      }
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
      const { idx, e } = props;
      e.preventDefault();
  
      this.otp = e.clipboardData.getData('text');
      if (this.otp.length !== 6) return; // exit immediately if the pasted content is not 6 characters
      if (/^\d+$/.test(this.otp) === false) return; // exit immediately if clipboard text contains any letters or special chars
  
      for (let i = 0; i < this.otp.length; i++) {
        this.digitEl[i].value = this.otp[i];
      }
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
  
      if (e.code.toLowerCase() !== 'backspace') return;
  
      if (idx !== 0) {
        this.digitEl[idx - 1].selectionStart = 1;
        this.digitEl[idx - 1].focus();
      }
    }
}

export { OTP }
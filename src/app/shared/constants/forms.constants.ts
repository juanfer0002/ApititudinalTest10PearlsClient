export const NUMBER_PATTERN = /^(\d*\.)?\d+$/
export const PHONE_PATTERN = /^(\(\d+\))?(\s?\d+\s?)+$/
export const INTEGER_PATTERN = /^\d*$/

export const FORM_ERROR_MSGS = {
    REQUIRED_ERROR: 'This is field is required',
    FORM_ERRORS: 'Please correct form errors, and try again.',
    PHONE_PATTERN: 'Only numbers, parentheses and spaces allowed',
    INTEGER_PATTERN: 'Only numbers allowed',
    NUMBER_PATTERN: 'Only numbers or decimal numbers allowed',
    MAX_LENGTH_ERROR: 'You have entered too many characters, please reduce up to:',
};

export const CLIENT_MSGS = {
    SUCCESS: "Client data has been saved successfully."
}
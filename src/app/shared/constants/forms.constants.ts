export const NUMBER_PATTERN = /^(\d*\.)?\d+$/
export const PHONE_PATTERN = /^(\(\d+\))?(\s?\d+\s?)+$/
export const INTEGER_PATTERN = /^\d*$/
export const PASSWORD_PATTERN = /^(?=.*\w)(?=.+[A-z])(?=.+\d)\S{8,16}$/

export const FORM_ERROR_MSGS = {
    REQUIRED_ERROR: 'This is field is required',
    EMAIL_ERROR: 'Enter a valid email',
    FORM_ERRORS: 'Please correct form errors, and try again.',
    PHONE_PATTERN: 'Only numbers, parentheses and spaces allowed',
    INTEGER_PATTERN: 'Only numbers allowed',
    NOT_SAME_PASSWORDS: 'Passwords do not match',
    MAX_LENGTH_ERROR: 'You have entered too many characters, please reduce up to:',
    PASSWORD_PATTERN: 'Password must be between 8 and 16 characters long and contain 1 number and 1 letter at least.',
};

export const SIGNIN_MSGS = {
    SUCCESS: "Welcome. You have logged in successfully"
}
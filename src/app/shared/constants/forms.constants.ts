import { IAlertDialogOptions } from '../components/alert-modal/alert-modal.component';

export const NUMBER_PATTERN = /^(\d*\.)?\d+$/;
export const PHONE_PATTERN = /^(\(\d+\))?(\s?\d+\s?)+$/;
export const INTEGER_PATTERN = /^\d*$/;

export const FORM_ERROR_MSGS = {
    REQUIRED_ERROR: 'This is field is required',
    FORM_ERRORS: 'Please correct form errors, and try again.',
    PHONE_PATTERN: 'Only numbers, parentheses and spaces allowed',
    INTEGER_PATTERN: 'Only numbers allowed',
    NUMBER_PATTERN: 'Only numbers or decimal numbers allowed',
    MAX_LENGTH_ERROR: 'You have entered too many characters, please reduce up to:',
};

export const CLIENT_MSGS = {
    SAVE_SUCESS: 'Client data has been saved successfully.',
    DELETE_SUCCESS: 'Client\'s data has been deleted successfully.'
};

export const VISIT_MSGS = {
    SAVE_SUCESS: 'Visit has been saved successfully.',
    DELETE_SUCCESS: 'Visit has been deleted successfully.'
};

export const DELETE_DIALOG_OPTS: IAlertDialogOptions = {
    title: 'Delete',
    body: 'Are you sure you want to delete this item?',
    actions: [
        { text: 'Cancel', value: false },
        { text: 'Yes', value: true },
    ]
};

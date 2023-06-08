
// required
export const requiredMsg = 'This field is required'


// email validation
export const emailErrorMsg = 'Please enter a valid email address.'
export const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
export const emailMaxLengthMsg = 'Maximum Required length is 254'


// Name validation
export const nameErrorMsg = 'Please enter only letters in this field.'
export const namePattern = /^[A-Za-z]+$/
export const nameMaxLengthMsg = 'Maximum Required length is 30'


// Password validation
export const passwordMsg = 'Please create a password that includes at least one uppercase letter, one number, and one special character.'
export const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}[|\\:;"'<>,.?/_₹])(\S).{7,20}$/
export const passwordMinLengthMsg = 'Minimum Required length is 8'
export const passwordMaxLengthMsg = 'Maximum Required length is 20'


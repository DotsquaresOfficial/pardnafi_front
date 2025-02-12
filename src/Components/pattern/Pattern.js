export const Passwordpattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%?^-_/$&*]).{8,}$/
export const Emailpattern = /^(?!.*\.\.)[A-Za-z0-9._%+-]+(?:@[A-Za-z0-9-]+\.[A-Za-z]{2,}|@[A-Za-z0-9-]+\.[A-Za-z]{2,6})(?:\.[A-Za-z]{2,6})*$/i;
export const Namepattern=/^[a-zA-Z][a-zA-Z][a-zA-Z ]{0,18}$/i
export const Mobilepattern=/^[1-9]\d{9}$/
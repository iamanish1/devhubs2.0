import { ALLOWED_ROLES } from "../constants/constants.js";

export const passwordValidator = (value) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    value
  );
};

export const skillsValidator = (value) => {
  return Array.isArray(value) && value.length > 0;
};

export const roleValidator = (role) => {
  return ALLOWED_ROLES.includes(role);
};

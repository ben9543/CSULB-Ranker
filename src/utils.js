export const checkEmail = (email) => {
    const domain = email.split("@")[1];
    if (domain === "student.csulb.edu" || domain === "csulb.edu")return true;
    return false;
}
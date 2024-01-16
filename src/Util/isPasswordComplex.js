const isPasswordComplex = (password) => {
    // Minimum length requirement
    const minLength = 8;
    
    // Check if the password meets the minimum length requirement
    if (password.length < minLength) {
      return false;
    }
  
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Check if the password contains at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return false;
    }
  
    // If all criteria are met, the password is considered complex
    return true;
  }
  
  // Example usage:
  const password = "StrongP@ssword123";
  if (isPasswordComplex(password)) {
    console.log("Password is complex.");
  } else {
    console.log("Password is not complex enough.");
  }
  
  export { isPasswordComplex };
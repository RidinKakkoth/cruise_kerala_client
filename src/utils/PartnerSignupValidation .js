const UserSignupValidation = () => {
    const validateForm = (values) => {
      const errors = {};
  
      if (!values.name.trim()) {
        errors.name = 'Name is required';
      }
      if (!values.company.trim()) {
        errors.name = 'Name is required';
      }
  
      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
  
      if (!values.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^[0-9]{10}$/.test(values.phone)) {
        errors.phone = 'Invalid phone number format';
      }
  
      if (!values.password.trim()) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
  
      return errors;
    };
  
    return { validateForm };
  };
  export default UserSignupValidation;
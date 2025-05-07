import useInput from './useInput';

const useEmail = (initialValue: string = "") => {
  const validateEmail = (value: string): string | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return "Por favor, insira um e-mail válido.";
    }
    return null;
  };

  return useInput({
    type: "email",
    initialValue,
    validate: validateEmail,
  });
};

export default useEmail;

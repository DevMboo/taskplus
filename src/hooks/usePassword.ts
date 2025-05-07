import useInput from './useInput';

const usePassword = (initialValue: string = "") => {
  const validatePassword = (value: string): string | null => {
    if (value.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }
    return null;
  };

  return useInput({
    type: "password",
    initialValue,
    validate: validatePassword,
  });
};

export default usePassword;

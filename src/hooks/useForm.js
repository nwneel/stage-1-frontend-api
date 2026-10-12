import { useCallback, useRef, useState } from "react";

function collectMessages(form, fieldNames) {
  const messages = {};
  fieldNames.forEach((fieldName) => {
    const field = form.elements[fieldName];
    if (field) messages[fieldName] = field.validationMessage;
  });
  return messages;
}

// Tracks native validation messages per field, only for fields the user touched.
export function useFieldErrors() {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((evt) => {
    const { form, name } = evt.target;
    setErrors((current) => ({
      ...current,
      ...collectMessages(form, [name, ...Object.keys(current)]),
    }));
  }, []);

  const validateForm = useCallback((form) => {
    const names = Array.from(form.elements)
      .map((field) => field.name)
      .filter(Boolean);
    setErrors(collectMessages(form, names));
    return form.checkValidity();
  }, []);

  const resetErrors = useCallback(() => setErrors({}), []);

  return { errors, validateField, validateForm, resetErrors };
}

export function useForm(defaultValues) {
  const initialValues = useRef(defaultValues);
  const [values, setValues] = useState(defaultValues);
  const [isValid, setIsValid] = useState(false);
  const { errors, validateField, resetErrors } = useFieldErrors();

  function handleChange(evt) {
    const { name, value, form } = evt.target;
    setValues({ ...values, [name]: value });
    validateField(evt);
    setIsValid(form.checkValidity());
  }

  const resetForm = useCallback(() => {
    setValues(initialValues.current);
    resetErrors();
    setIsValid(false);
  }, [resetErrors]);

  return { values, setValues, handleChange, errors, isValid, resetForm };
}

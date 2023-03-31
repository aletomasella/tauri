import { useState } from "react";

const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState(initialState);

  const onChange = (value: string, field: keyof T) => {
    setForm({ ...form, [field]: value });
  };

  const clean = () => {
    setForm(initialState);
  };

  return { form, update: onChange, clean };
};

export { useForm };

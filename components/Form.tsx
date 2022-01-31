import { useState } from "react";
import { Container, Field, Label, Input } from "./Form.styles";
interface FormProps {
  fields: any[];
  formValue: any;
  setFormValue: any;
}

function Form({ fields, formValue, setFormValue }: FormProps) {
  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue((formValues: any) => ({ ...formValues, [name]: value }));
  }
  return (
    <Container>
      {fields.map((field) => (
        <Field key={field}>
          <Label>{field}</Label>
          <Input
            value={formValue[field] || ""}
            name={field}
            onChange={handleChange}
          />
        </Field>
      ))}
    </Container>
  );
}
export default Form;

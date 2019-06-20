import map from "lodash/map";
import React from "react";
import {
  DatePicker,
  Form,
  Input,
  TimePicker,
  Select,
  Upload,
  Icon,
  Button,
  Radio,
  Checkbox
} from "antd";

const FormItem = Form.Item;

const CreateField = Component => ({
  field,
  form,
  hasFeedback,
  label,
  options,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) =>
    form.setFieldValue(field.name, value);
  const onChange = value => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <FormItem
        label={type !== "checkbox" && label}
        hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
      >
        {type === "checkbox" && (
          <Component
            {...field}
            {...props}
            onBlur={onBlur}
            type={type}
            onChange={type !== "select" ? onInputChange : onChange}
          >
            {label}
          </Component>
        )}
        {type === "file" ? (
          <Component
            {...field}
            {...props}
            onBlur={onBlur}
            type={type}
            onChange={type !== "select" ? onInputChange : onChange}
          >
            <button>Upload</button>
          </Component>
        ) : (
          type !== "checkbox" && (
            <Component
              {...field}
              {...props}
              onBlur={onBlur}
              type={type}
              onChange={type !== "select" ? onInputChange : onChange}
            >
              {options &&
                map(options, name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </Component>
          )
        )}
      </FormItem>
    </div>
  );
};

export default CreateField;

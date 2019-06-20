import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { buildYup } from "json-schema-to-yup";
import styled from "styled-components";
import CreateField from "./Field";

const FormErrorMessage = styled.span`
  color: #d4380d;
  margin-bottom: 20px;
  display: block;
`;

const jsonShape = (fields, name) => {
  const shape = {
    title: name,
    type: "object",
    log: true,
    required: [],
    properties: {}
  };
  const config = { errMessages: {} };
  fields.forEach(f => {
    let nullable = false;
    const name = f.verb ? `${f.name}__${f.verb}` : f.name;
    if (f.edit) {
      config.errMessages[name] = {};
      if (f.required) {
        shape.required.push(name);
        config.errMessages[name].required = `${f.label} is required`;
        config.errMessages[name].string = `${f.label} is required`;
      } else {
        nullable = true;
      }
      if (f.yup && f.yup.type) {
        shape.properties[name] = { type: f.yup.type };
        f.yup.checks.forEach(check => {
          shape.properties[name][check.key] = check.val;
          if (check.err) {
            config.errMessages[name][check.key] = check.err;
          }
        });
        shape.properties[name].nullable = nullable || false;
      }
    }
  });
  return buildYup(shape, config);
};

const FormikForm = ({
  formTitle,
  handleSubmit,
  fields,
  submitLabel,
  initialValues,
  validationSchema,
  card: Card
}) => {
  return (
    <>
      <h1>{formTitle}</h1>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
        render={({
          handleSubmit,
          isSubmitting,
          status,
          error,
          errors,
          touched,
          validateOnChange,
          values
        }) => (
          <Form onSubmit={handleSubmit}>
            {fields.map(field => {
              return field.object ? (
                <>
                  {/* Repeater */}
                  <FieldArray
                    name={field.name}
                    render={({ insert, remove, push }) => (
                      <>
                        {values[field.name] &&
                          values[field.name].length > 0 &&
                          values[field.name].map((friend, index) => (
                            <Card key={index} style={{ marginBottom: "20px" }}>
                              {field.object.map(repeaterField => {
                                return (
                                  <>
                                    <Field
                                      key={`${field.name}-${
                                        repeaterField.name
                                      }`}
                                      component={CreateField(
                                        repeaterField.component || "input"
                                      )}
                                      name={`${field.name}.${index}.${
                                        repeaterField.name
                                      }`}
                                      type={repeaterField.type}
                                      label={repeaterField.label}
                                      validate={field.validate}
                                      selectOptions={field.select}
                                      hasFeedback
                                      placeholder={repeaterField.placeholder}
                                    />
                                  </>
                                );
                              })}

                              <div className="col">
                                <button
                                  className="secondary"
                                  icon="minus"
                                  onClick={() => remove(index)}
                                >
                                  {field.removeLabel || "Remove"}
                                </button>
                              </div>
                            </Card>
                          ))}
                        <button
                          type="button"
                          onClick={() => {
                            const object = {};
                            field.object.map((repeaterField, i) => {
                              object[repeaterField.name] = "";
                            });
                            push(object);
                          }}
                          icon="plus"
                        >
                          {field.buttonLabel}
                        </button>
                      </>
                    )}
                  />
                </>
              ) : (
                <>
                  <Field
                    key={field.name}
                    component={CreateField(field.type || "input")}
                    options={field.options}
                    name={field.name}
                    type={field.type}
                    label={field.label}
                    // validate={field.validate}
                    hasFeedback
                    placeholder={field.placeholder}
                  />
                  {error && touched[field.name] && (
                    <FormErrorMessage>{error[field.name]}</FormErrorMessage>
                  )}
                </>
              );
            })}
            {status && status.msg && (
              <FormErrorMessage>{status.msg}</FormErrorMessage>
            )}
            <button type="submit" disabled={isSubmitting}>
              {submitLabel || "Submit"}
            </button>
          </Form>
        )}
      />
    </>
  );
};

export default FormikForm;

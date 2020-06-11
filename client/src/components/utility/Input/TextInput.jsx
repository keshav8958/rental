import React from "react";

const TextInput = ({
  input,
  width,
  type,
  placeholder,
  small = false,
  meta: { touched, error },
}) => {
  const isError = touched && error ? true : false;
  return (
    <div className="form-group">
      <input
        className={isError ? "form-control is-invalid" : "form-control"}
        {...input}
        placeholder={placeholder}
        type={type}
      />
      {small && <small>Seprate features by commas ex: a,b</small>}
      {isError && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default TextInput;

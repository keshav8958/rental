import React from "react";

const OptionInput = ({
  input,
  width,
  type,
  placeholder,
  categories,
  meta: { touched, error },
}) => {
  const isError = touched && error ? true : false;
  return (
    <div className="form-group">
      <select
        {...input}
        className={isError ? "form-control is-invalid" : "form-control"}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((category, i) => {
          return (
            <option key={i} value={category._id}>
              {category.name}
            </option>
          );
        })}
      </select>
      {isError && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default OptionInput;

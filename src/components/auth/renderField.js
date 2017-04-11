import React, { PropTypes } from 'react';

const renderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => (
  <div className="form-group-md">
    <label>{placeholder}</label>
    <div>
      <input className="form-control" {...input} placeholder={placeholder} type={type}/>
      {touched && ((error && <span className="label label-danger">{error}</span>) || (warning && <span className="label label-warning">{warning}</span>))}
    </div>
  </div>
);

renderField.PropTypes = {
	input: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	meta: PropTypes.object
}

export default renderField;
import PropTypes from "prop-types";

function LabelInputPair({ inputType, labelName, inputName, value, onChange }) {
  const onFocusDate = (e) => {
    e.target.type = "date";
  };

  const onBlurDate = (e) => {
    e.target.type = "text";
  };

  return (
    <div className="label-input-pair">
      {
        inputType === "date" ? (
          <input
            type="text"
            onFocus={onFocusDate}
            onBlur={onBlurDate}
            id={labelName}
            name={labelName}
            placeholder={inputName}
            required
          />
        ) : (
          <input
            type={inputType}
            id={labelName}
            name={labelName}
            placeholder={inputName}
            value={value}
            onChange={onChange}
            required
          />
        )
      }
    </div>
  );
}

export {
  LabelInputPair,
};

//inputType, labelName, inputName, value, onChange
LabelInputPair.propTypes = {
  inputType: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};

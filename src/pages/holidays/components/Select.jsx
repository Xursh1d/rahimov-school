import { useCallback } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { useHolidayStore } from "../../../store/HolidayStore";

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: "40",
  }),
  control: (provided) => ({
    ...provided,
    height: "37px",
    minHeight: "37px",
    width: "200px",
    fontSize: "13px",
    fontWeight: "400",
  }),
};
const mobileStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: "400",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "2px",
    width: "20px",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: "0 5px",
    width: "25px",
  }),
  control: (provided) => ({
    ...provided,
    height: "30px",
    minHeight: "30px",
    maxHeight: "30px",
    width: "150px",
    fontSize: "12px",
    padding: "0 !important",
    margin: "0 !important",
    zIndex: "0",
  }),
};

function Selector({ value, disabled, param, property }) {
  const { queryParams, updateParams, setLoader, loadItems } = useHolidayStore();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleSelectChange = useCallback(
    async (e) => {
      setLoader(true);
      updateParams({
        month_id: e?.value == undefined ? "" : e?.value,
      });
      await loadItems(
        new URLSearchParams({
          ...queryParams,
          month_id: e?.value == undefined ? "" : e?.value,
        }).toString()
      );
      setLoader(false);
    },
    [queryParams]
  );

  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={property}
      isDisabled={disabled}
      value={value}
      styles={isMobile ? mobileStyles : customStyles}
      options={param}
      isClearable
      theme={(theme) => ({
        ...theme,

        colors: {
          ...theme.colors,
          primary25: "#ecfccb",
          primary50: "#d9f99d",
          primary: "#16a34a",
        },
      })}
      onChange={handleSelectChange}
    />
  );
}
Selector.propTypes = {
  value: PropTypes.any.isRequired,
  disabled: PropTypes.any.isRequired,
  param: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
};
export default Selector;

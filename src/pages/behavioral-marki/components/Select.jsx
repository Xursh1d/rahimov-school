import { useCallback } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { useBehaviorMarkStore } from "../../../store/BehaviorMarkStore";

const customStyles = {
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

function Selector({ value, param, property }) {
  const { queryParams, updateParams, setLoading, loadItems } =
    useBehaviorMarkStore();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleSelectChange = useCallback(
    async (e) => {
      setLoading(true);
      if (property === "Oy") {
        updateParams({
          month_id: e?.value == undefined ? "" : e?.value,
        });
        await loadItems(
          new URLSearchParams({
            ...queryParams,
            month_id: e?.value == undefined ? "" : e?.value,
          }).toString()
        );
        localStorage.setItem(
          "behavioralFilters",
          JSON.stringify({
            ...queryParams,
            month_id: e?.value == undefined ? "" : e?.value,
          })
        );
      }
      if (property === "Sinf") {
        updateParams({
          class_id: e?.value == undefined ? "" : e?.value,
        });
        await loadItems(
          new URLSearchParams({
            ...queryParams,
            class_id: e?.value == undefined ? "" : e?.value,
          }).toString()
        );
        localStorage.setItem(
          "behavioralFilters",
          JSON.stringify({
            ...queryParams,
            class_id: e?.value == undefined ? "" : e?.value,
          })
        );
      }
      setLoading(false);
    },
    [queryParams]
  );

  return (
    <Select
      placeholder={property}
      styles={isMobile ? mobileStyles : customStyles}
      options={param}
      value={value}
      isClearable
      onChange={handleSelectChange}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#ecfccb",
          primary50: "#d9f99d",
          primary: "#16a34a",
        },
      })}
    />
  );
}
Selector.propTypes = {
  value: PropTypes.any.isRequired,
  param: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
};
export default Selector;

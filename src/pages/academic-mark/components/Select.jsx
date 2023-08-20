import { useCallback } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { useAcademicMarkStore } from "../../../store/AcademicMarkStore";

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

function Selector({ param, property }) {
  const { queryParams, updateParams, setLoading, loadItems } =
    useAcademicMarkStore();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleSelectChange = useCallback(
    async (e) => {
      setLoading(true);
      if (property === "Fan") {
        updateParams({
          subject_id: e?.value == undefined ? "" : e?.value,
        });
        await loadItems(
          new URLSearchParams({
            ...queryParams,
            subject_id: e?.value == undefined ? "" : e?.value,
          }).toString()
        );
      }
      if (property === "Ustoz") {
        updateParams({
          teacher_id: e?.value == undefined ? "" : e?.value,
        });
        await loadItems(
          new URLSearchParams({
            ...queryParams,
            teacher_id: e?.value == undefined ? "" : e?.value,
          }).toString()
        );
      }
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
  param: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
};
export default Selector;

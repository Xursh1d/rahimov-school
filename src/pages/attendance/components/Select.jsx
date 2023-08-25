import { useCallback } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { useAttendaceStore } from "../../../store/AttendanceStore";

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

function Selector({ value, disabled, param, property }) {
  const { queryParams, updateParams, setLoader, loadItems } =
    useAttendaceStore();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleSelectChange = useCallback(
    async (e) => {
      setLoader(true);
      if (property === "Ustoz") {
        if (e?.value == undefined) {
          const param = {
            teacher_id: "",
            subject_id: "",
            month_id: "",
            class_id: "",
          };
          updateParams(param);
          await loadItems(new URLSearchParams(param).toString());
          localStorage.setItem("attendanceFilters", JSON.stringify(param));
        } else {
          updateParams({
            teacher_id: e?.value,
          });
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              teacher_id: e?.value,
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              teacher_id: e?.value,
            })
          );
        }
      }

      if (property === "Fan") {
        if (e?.value == undefined) {
          const pram = {
            subject_id: "",
            month_id: "",
            class_id: "",
          };
          updateParams(pram);
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              subject_id: "",
              month_id: "",
              class_id: "",
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              subject_id: "",
              month_id: "",
              class_id: "",
            })
          );
        } else {
          updateParams({
            subject_id: e?.value,
          });
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              subject_id: e?.value,
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              subject_id: e?.value,
            })
          );
        }
      }

      if (property === "Oy") {
        if (e?.value == undefined) {
          updateParams({
            month_id: "",
          });
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              month_id: "",
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              month_id: "",
            })
          );
        } else {
          updateParams({
            month_id: e?.value,
          });
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              month_id: e?.value,
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              month_id: e?.value,
            })
          );
        }
      }

      if (property === "Sinf") {
        if (e?.value == undefined) {
          updateParams({
            class_id: "",
            month_id: "",
          });
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              month_id: "",
              class_id: "",
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              month_id: "",
              class_id: "",
            })
          );
        } else {
          updateParams({
            class_id: e?.value,
          });
          await loadItems(
            new URLSearchParams({
              ...queryParams,
              class_id: e?.value,
            }).toString()
          );
          localStorage.setItem(
            "attendanceFilters",
            JSON.stringify({
              ...queryParams,
              class_id: e?.value,
            })
          );
        }
      }
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

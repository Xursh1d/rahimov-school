import { useCallback } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import { useUserStore } from "../store/UserDetailsStore";

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
    width: "100px",
    fontSize: "11px",
    padding: "0 !important",
    margin: "0 !important",
    zIndex: "0",
  }),
};

function Selector({ param, property, value }) {
  const { queryParams, updateParams, setLoading, onReload, updateState } =
    useUserStore();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleSelectChange = useCallback(
    async (e) => {
      setLoading(true);
      if (property === "O'quv yili") {
        updateParams({
          academic_year_id: e?.value == undefined ? null : e?.value,
        });
        await updateState({
          ...queryParams,
          academic_year_id: e?.value == undefined ? null : e?.value,
        });
        await onReload();
      }
      if (property === "Filiallar") {
        updateParams({
          branch_id: e?.value == undefined ? null : e?.value,
        });
        await updateState({
          ...queryParams,
          branch_id: e?.value == undefined ? null : e?.value,
        });
        await onReload();
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
  value: PropTypes.any,
  param: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
};
export default Selector;

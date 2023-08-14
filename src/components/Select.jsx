import { useMemo } from "react";
import { useCallback } from "react";
import Select from "react-select";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "37px",
    minHeight: "37px",
    maxWidth: "200px",
    minWidth: "120px",
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
  control: (provided) => ({
    ...provided,
    height: "30px",
    minHeight: "30px",
    maxHeight: "30px",
    minWidth: "100px",
    fontSize: "12px",
    padding: "0 !important",
    margin: "0 !important",
  }),
};

function Selector({ param, property }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const options = useMemo(() => {
    return (
      param?.map((element) => ({
        label: element.name,
        value: element.id,
      })) || []
    );
  }, [param]);

  const handleSelectChange = useCallback(async () => {});

  return (
    <Select
      classNamePrefix="select"
      placeholder={property}
      styles={isMobile ? mobileStyles : customStyles}
      options={options}
      isClearable
      onChange={handleSelectChange}
    />
  );
}
Selector.propTypes = {
  param: PropTypes.array.isRequired,
  property: PropTypes.string.isRequired,
};
export default Selector;

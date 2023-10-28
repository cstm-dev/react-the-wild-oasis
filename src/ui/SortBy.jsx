import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Select from "ui/Select.jsx";

SortBy.propTypes = {
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ),
};

function SortBy({ sortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeElement = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={activeElement}
      onChange={handleChange}
      options={sortOptions}
      type="white"
    >
      Sort
    </Select>
  );
}

export default SortBy;

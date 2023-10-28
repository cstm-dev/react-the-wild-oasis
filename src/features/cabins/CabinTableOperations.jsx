import Filter from "ui/Filter.jsx";
import TableOperations from "ui/TableOperations.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterParamName="discount"
        filterOptions={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No-Discount" },
          { value: "with-discount", label: "With-Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

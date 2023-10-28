import CabinRow from "features/cabins/CabinRow";
import useGetCabins from "features/cabins/useGetCabins.js";
import { useSearchParams } from "react-router-dom";
import Menus from "ui/Menus.jsx";
import Spinner from "ui/Spinner";
import Table from "ui/Table.jsx";

function CabinTable() {
  const { data: cabins, isLoading } = useGetCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table cols="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

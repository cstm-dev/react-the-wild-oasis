import CabinTable from "features/cabins/CabinTable";
import CreateCabinForm from "features/cabins/CreateCabinForm.jsx";
import { useState } from "react";
import Button from "ui/Button.jsx";
import Heading from "ui/Heading";
import Row from "ui/Row";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}>
          Add a new cabin
        </Button>
        {showForm ? <CreateCabinForm /> : null}
      </Row>
    </>
  );
}

export default Cabins;

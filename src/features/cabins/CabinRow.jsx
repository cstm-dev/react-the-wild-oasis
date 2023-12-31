import PropTypes from "prop-types";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import CreateCabinForm from "features/cabins/CreateCabinForm.jsx";
import useCreateCabin from "features/cabins/useCreateCabin.js";
import useDeleteCabin from "features/cabins/useDeleteCabin.js";
import ConfirmDelete from "ui/ConfirmDelete.jsx";
import Menus from "ui/Menus.jsx";
import Modal from "ui/Modal.jsx";
import Table from "ui/Table.jsx";
import { formatCurrency } from "utils/helpers";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isLoading: isDeleting, mutate: deleteCabin } = useDeleteCabin();
  const { isLoading: isCreating, mutate: createCabin } = useCreateCabin();

  function handleDuplicateCabin() {
    const duplicateCabin = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    };

    createCabin(duplicateCabin);
  }

  return (
    <Table.Row>
      <Img src={image} />

      <Cabin>{name}</Cabin>

      <div>Fits up to {maxCapacity} guests</div>

      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open modalWindowOpen="cabin-edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open modalWindowOpen="cabin-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window modalWindowName="cabin-edit">
              <CreateCabinForm cabinEdit={cabin} disabled={isCreating} />
            </Modal.Window>

            <Modal.Window modalWindowName="cabin-delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

import { AddAddressIcon } from "../../../../public/Icons";
import AccountSectionTitle from "../atoms/AccountSectionTitle";
import AccountActionIconButton from "../atoms/AccountActionIconButton";
import AddressCard from "../molecules/AddressCard";

type AddressRow = {
  id: string;
  user_id: string;
  country: string;
  first_name: string;
  last_name: string;
  address_line_1: string;
  apartment: string | null;
  city: string;
  province: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
};

type Props = {
  addresses: AddressRow[];
  maxReached: boolean;
  deletingAddressId: string | null;
  onAdd: () => void;
  onEdit: (address: AddressRow) => void;
  onDelete: (address: AddressRow) => void;
};

export default function AddressesOrganism({
  addresses,
  maxReached,
  deletingAddressId,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className="flex flex-col gap-3">
      <AccountSectionTitle
        title="Addresses"
        action={
          <AccountActionIconButton
            label="Add address"
            onClick={onAdd}
            disabled={maxReached}
          >
            <AddAddressIcon className="h-4 w-4" />
          </AccountActionIconButton>
        }
      />

      {addresses.length === 0 ? (
        <p className="font-M-500 text-text-tertiary">No addresses saved</p>
      ) : (
        <div className="flex flex-col gap-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              deleting={deletingAddressId === address.id}
              onEdit={() => onEdit(address)}
              onDelete={() => onDelete(address)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
import { DeleteIcon, EditIcon } from "../../../../public/Icons";
import AccountActionIconButton from "../atoms/AccountActionIconButton";
import { AustraliaIcon, FinlandIcon } from "../../../../public/Icons";

type CountryValue = "Finland" | "Australia";

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

function normalizeCountry(value: string | null | undefined): CountryValue {
  return value === "Australia" ? "Australia" : "Finland";
}

function CountryIcon({ country }: { country: CountryValue }) {
  const Icon = country === "Australia" ? AustraliaIcon : FinlandIcon;
  return <Icon className="h-4 w-4" />;
}

type Props = {
  address: AddressRow;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function AddressCard({
  address,
  deleting,
  onEdit,
  onDelete,
}: Props) {
  const country = normalizeCountry(address.country);

  return (
    <article className="bg-bg-surface p-3 ring ring-border-primary">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <CountryIcon country={country} />
            <span className="font-M-600 text-text-primary">{country}</span>
            {address.is_default ? (
              <span className="font-XS-600 uppercase tracking-wide text-brand-primary">
                Default
              </span>
            ) : null}
          </div>

          <p className="mt-1 font-M-500 text-text-primary">
            {address.first_name} {address.last_name}
          </p>
          <p className="font-M-500 text-text-secondary">{address.address_line_1}</p>
          {address.apartment ? (
            <p className="font-M-500 text-text-secondary">{address.apartment}</p>
          ) : null}
          <p className="font-M-500 text-text-secondary">
            {address.city}, {address.province} {address.postal_code}
          </p>
          <p className="font-M-500 text-text-secondary">{address.phone_number}</p>
        </div>

        <div className="flex items-center gap-2">
          <AccountActionIconButton label="Edit address" onClick={onEdit}>
            <EditIcon className="h-4 w-4" />
          </AccountActionIconButton>

          <AccountActionIconButton
            label="Delete address"
            onClick={onDelete}
            disabled={deleting}
          >
            <DeleteIcon className="h-4 w-4" />
          </AccountActionIconButton>
        </div>
      </div>
    </article>
  );
}
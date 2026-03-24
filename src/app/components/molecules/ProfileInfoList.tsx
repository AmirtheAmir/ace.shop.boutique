import AccountInfoRow from "../atoms/AccountInfoRow";

type Props = {
  name: string;
  email: string;
};

export default function ProfileInfoList({ name, email }: Props) {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-y-2">
      <AccountInfoRow label="Name" value={name} />
      <AccountInfoRow label="Email" value={email} />
    </div>
  );
}
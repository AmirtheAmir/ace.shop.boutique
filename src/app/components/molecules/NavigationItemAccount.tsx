import NavigationLink from "../atoms/NavigationLink";

type Props = {
  onSignOut?: () => void;
  onBackToDefault?: () => void;
};

export default function NavigationItemAccount({
  onSignOut,
  onBackToDefault,
}: Props) {
  return (
    <div className="flex ring ring-border-primary">
      <NavigationLink label="Orders" onClick={onBackToDefault} />
      <NavigationLink label="Profile" onClick={onBackToDefault} />
      <NavigationLink label="Sign Out" onClick={onSignOut} />
    </div>
  );
}

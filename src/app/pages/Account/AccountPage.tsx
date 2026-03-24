"use client";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import {
  AddAddressIcon,
  AustraliaIcon,
  Close16Icon,
  DeleteIcon,
  DropDownIcon,
  EditIcon,
  FinlandIcon,
} from "../../../../public/Icons";
import { getSupabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

type AccountTab = "profile" | "orders";
type CountryValue = "Finland" | "Australia";

type ProfileRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

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

type ProfileDraft = {
  first_name: string;
  last_name: string;
  email: string;
};

type AddressDraft = {
  country: CountryValue;
  first_name: string;
  last_name: string;
  address_line_1: string;
  apartment: string;
  city: string;
  province: string;
  postal_code: string;
  phone_local: string;
  is_default: boolean;
};

const MAX_ADDRESSES = 4;
const PROFILE_SELECT = "id, first_name, last_name, email";
const ADDRESS_SELECT =
  "id, user_id, country, first_name, last_name, address_line_1, apartment, city, province, postal_code, phone_number, is_default";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function inferFirstName(email: string) {
  const base = email.split("@")[0]?.trim();
  if (!base) return "";

  const cleaned = base.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return "";

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function normalizeCountry(value: string | null | undefined): CountryValue {
  return value === "Australia" ? "Australia" : "Finland";
}

function getCountryPrefix(country: CountryValue) {
  return country === "Australia" ? "+61" : "+358";
}

function getLocalPhone(
  country: CountryValue,
  phoneNumber: string | null | undefined,
) {
  const phone = (phoneNumber ?? "").trim();
  if (!phone) return "";

  const prefix = getCountryPrefix(country);
  if (!phone.startsWith(prefix)) return phone;

  return phone.slice(prefix.length).trimStart();
}

function buildPhoneNumber(country: CountryValue, phoneLocal: string) {
  const prefix = getCountryPrefix(country);
  const normalized = phoneLocal.trim();

  return normalized ? `${prefix} ${normalized}` : prefix;
}

function emptyAddressDraft(isDefault: boolean): AddressDraft {
  return {
    country: "Finland",
    first_name: "",
    last_name: "",
    address_line_1: "",
    apartment: "",
    city: "",
    province: "",
    postal_code: "",
    phone_local: "",
    is_default: isDefault,
  };
}

function CountryIcon({
  country,
  className,
}: {
  country: CountryValue;
  className?: string;
}) {
  const Icon = country === "Australia" ? AustraliaIcon : FinlandIcon;

  return <Icon className={className} />;
}

function getProfileName(profile: ProfileRow | null) {
  if (!profile) return "";

  return [profile.first_name ?? "", profile.last_name ?? ""].join(" ").trim();
}

async function ensureProfileRow(supabase: SupabaseClient, user: User) {
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select(PROFILE_SELECT)
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  const userEmail = user.email ?? null;

  if (!existingProfile) {
    const metadataFirstName =
      typeof user.user_metadata?.first_name === "string"
        ? user.user_metadata.first_name
        : "";

    const firstName = metadataFirstName || inferFirstName(userEmail ?? "");

    const { data: insertedProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        first_name: firstName || null,
        last_name: null,
        email: userEmail,
      })
      .select(PROFILE_SELECT)
      .single();

    if (insertError) {
      throw insertError;
    }

    return insertedProfile as ProfileRow;
  }

  const updates: Partial<ProfileRow> = {};

  if (!existingProfile.first_name) {
    const metadataFirstName =
      typeof user.user_metadata?.first_name === "string"
        ? user.user_metadata.first_name
        : "";

    const fallbackName = metadataFirstName || inferFirstName(userEmail ?? "");
    if (fallbackName) {
      updates.first_name = fallbackName;
    }
  }

  if (!existingProfile.email && userEmail) {
    updates.email = userEmail;
  }

  if (Object.keys(updates).length === 0) {
    return existingProfile as ProfileRow;
  }

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select(PROFILE_SELECT)
    .single();

  if (updateError) {
    throw updateError;
  }

  return updatedProfile as ProfileRow;
}

async function fetchAddresses(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("addresses")
    .select(ADDRESS_SELECT)
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as AddressRow[];
}

export default function AccountPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const activeTab: AccountTab =
    searchParams.get("tab") === "orders" ? "orders" : "profile";
  const setActiveTab = (tab: AccountTab) => {
    router.push(`/account?tab=${tab}`);
  };
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [addresses, setAddresses] = useState<AddressRow[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState<ProfileDraft>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressRow | null>(null);
  const [addressDraft, setAddressDraft] = useState<AddressDraft>(
    emptyAddressDraft(true),
  );
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
    null,
  );

  const loadAccountData = useCallback(async () => {
    const supabase = getSupabase();

    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      setIsBootstrapping(false);
      return;
    }

    setIsBootstrapping(true);
    setErrorMessage(null);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }

      const session = sessionData.session;
      if (!session) {
        router.replace("/auth");
        return;
      }

      setUser(session.user);

      const ensuredProfile = await ensureProfileRow(supabase, session.user);
      const loadedAddresses = await fetchAddresses(supabase, session.user.id);

      setProfile(ensuredProfile);
      setAddresses(loadedAddresses);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load your account.";
      setErrorMessage(message);
    } finally {
      setIsBootstrapping(false);
    }
  }, [router]);

  useEffect(() => {
    void loadAccountData();
  }, [loadAccountData]);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/auth");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const profileName = useMemo(() => {
    const name = getProfileName(profile);
    if (name) return name;

    return user?.email ? inferFirstName(user.email) : "";
  }, [profile, user]);

  const profileEmail = profile?.email ?? user?.email ?? "";

  const openProfileEditor = () => {
    if (!profile && !user) return;

    setErrorMessage(null);
    setSuccessMessage(null);
    setProfileDraft({
      first_name: profile?.first_name ?? profileName,
      last_name: profile?.last_name ?? "",
      email: profileEmail,
    });
    setIsProfileModalOpen(true);
  };

  const openAddAddressModal = () => {
    if (addresses.length >= MAX_ADDRESSES) {
      setErrorMessage("You can save up to 4 addresses.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setEditingAddress(null);
    setAddressDraft(emptyAddressDraft(addresses.length === 0));
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (address: AddressRow) => {
    const country = normalizeCountry(address.country);

    setErrorMessage(null);
    setSuccessMessage(null);
    setEditingAddress(address);
    setAddressDraft({
      country,
      first_name: address.first_name ?? "",
      last_name: address.last_name ?? "",
      address_line_1: address.address_line_1 ?? "",
      apartment: address.apartment ?? "",
      city: address.city ?? "",
      province: address.province ?? "",
      postal_code: address.postal_code ?? "",
      phone_local: getLocalPhone(country, address.phone_number),
      is_default: address.is_default,
    });
    setIsAddressModalOpen(true);
  };

  const onSignOut = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace("/auth");
  };

  const onSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage("User session not found.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    const firstName = profileDraft.first_name.trim();
    const lastName = profileDraft.last_name.trim();
    const email = normalizeEmail(profileDraft.email);

    if (!firstName) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    setIsSavingProfile(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const currentUserEmail = normalizeEmail(user.email ?? "");
      const isEmailChanged = currentUserEmail !== email;

      if (isEmailChanged) {
        const { error: updateAuthError } = await supabase.auth.updateUser({
          email,
        });

        if (updateAuthError) {
          throw updateAuthError;
        }
      }

      const { data: updatedProfile, error: updateProfileError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName || null,
          email,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select(PROFILE_SELECT)
        .single();

      if (updateProfileError) {
        throw updateProfileError;
      }

      setProfile(updatedProfile as ProfileRow);
      setIsProfileModalOpen(false);
      setSuccessMessage(
        isEmailChanged
          ? "Profile saved. Confirm your new email if Supabase asks for confirmation."
          : "Profile saved.",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save profile.";
      setErrorMessage(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const onSaveAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage("User session not found.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    if (!editingAddress && addresses.length >= MAX_ADDRESSES) {
      setErrorMessage("You can save up to 4 addresses.");
      return;
    }

    const firstName = addressDraft.first_name.trim();
    const lastName = addressDraft.last_name.trim();
    const addressLine1 = addressDraft.address_line_1.trim();
    const apartment = addressDraft.apartment.trim();
    const city = addressDraft.city.trim();
    const province = addressDraft.province.trim();
    const postalCode = addressDraft.postal_code.trim();
    const phoneLocal = addressDraft.phone_local.trim();

    if (
      !firstName ||
      !lastName ||
      !addressLine1 ||
      !city ||
      !province ||
      !postalCode ||
      !phoneLocal
    ) {
      setErrorMessage("Please fill in all required address fields.");
      return;
    }

    setIsSavingAddress(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (addressDraft.is_default) {
        let resetQuery = supabase
          .from("addresses")
          .update({
            is_default: false,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);

        if (editingAddress) {
          resetQuery = resetQuery.neq("id", editingAddress.id);
        }

        const { error: resetDefaultError } = await resetQuery;
        if (resetDefaultError) {
          throw resetDefaultError;
        }
      }

      const payload = {
        country: addressDraft.country,
        first_name: firstName,
        last_name: lastName,
        address_line_1: addressLine1,
        apartment: apartment || null,
        city,
        province,
        postal_code: postalCode,
        phone_number: buildPhoneNumber(addressDraft.country, phoneLocal),
        is_default: addressDraft.is_default,
      };

      if (editingAddress) {
        const { error: updateAddressError } = await supabase
          .from("addresses")
          .update({
            ...payload,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingAddress.id)
          .eq("user_id", user.id);

        if (updateAddressError) {
          throw updateAddressError;
        }
      } else {
        const { error: insertAddressError } = await supabase
          .from("addresses")
          .insert({
            id: crypto.randomUUID(),
            user_id: user.id,
            ...payload,
          });

        if (insertAddressError) {
          throw insertAddressError;
        }
      }

      const refreshedAddresses = await fetchAddresses(supabase, user.id);
      setAddresses(refreshedAddresses);
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      setSuccessMessage(editingAddress ? "Address updated." : "Address added.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save address.";
      setErrorMessage(message);
    } finally {
      setIsSavingAddress(false);
    }
  };

  const onDeleteAddress = async (address: AddressRow) => {
    if (!user) {
      setErrorMessage("User session not found.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    setDeletingAddressId(address.id);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error: deleteAddressError } = await supabase
        .from("addresses")
        .delete()
        .eq("id", address.id)
        .eq("user_id", user.id);

      if (deleteAddressError) {
        throw deleteAddressError;
      }

      let refreshedAddresses = await fetchAddresses(supabase, user.id);

      if (
        refreshedAddresses.length > 0 &&
        !refreshedAddresses.some((item) => item.is_default)
      ) {
        const fallbackAddress = refreshedAddresses[0];

        const { error: fallbackDefaultError } = await supabase
          .from("addresses")
          .update({
            is_default: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", fallbackAddress.id)
          .eq("user_id", user.id);

        if (fallbackDefaultError) {
          throw fallbackDefaultError;
        }

        refreshedAddresses = await fetchAddresses(supabase, user.id);
      }

      setAddresses(refreshedAddresses);
      setSuccessMessage("Address deleted.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete address.";
      setErrorMessage(message);
    } finally {
      setDeletingAddressId(null);
    }
  };

  if (isBootstrapping) {
    return (
      <main className="">
        <p className="font-M-500 text-text-secondary">
          Loading your account...
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="px-4 py-3 md:px-8">
        <section className="min-h-[60vh] py-3">
          <div className="inline-flex ring ring-border-primary">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={[
                "px-5 py-3 font-M-500 ringed-right transition-colors duration-200",
                activeTab === "orders"
                  ? "text-text-primary underline underline-offset-4"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
            >
              Orders
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={[
                "px-5 py-3 font-M-500 ringed-right transition-colors duration-200",
                activeTab === "profile"
                  ? "text-text-primary underline underline-offset-4"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
            >
              Profile
            </button>

            <button
              type="button"
              onClick={onSignOut}
              className="px-5 py-3 font-M-500 text-text-primary transition-colors duration-200 hover:text-brand-primary"
            >
              Sign Out
            </button>
          </div>

          {errorMessage ? (
            <p className="mt-4 font-M-500 text-brand-primary">{errorMessage}</p>
          ) : null}

          {successMessage ? (
            <p className="mt-4 font-M-500 text-text-secondary">
              {successMessage}
            </p>
          ) : null}

          {activeTab === "orders" ? (
            <div className="mt-8 max-w-5xl bg-bg-surface p-5 ring ring-border-primary">
              <h2 className="font-L-600 text-text-primary">Orders</h2>
              <p className="mt-2 font-M-500 text-text-secondary">
                No orders yet.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid max-w-5xl gap-8 lg:grid-cols-2">
              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-L-600 text-text-primary">Profile</h2>

                  <button
                    type="button"
                    aria-label="Edit profile"
                    onClick={openProfileEditor}
                    className="text-brand-primary transition-opacity duration-200 hover:opacity-80"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-[64px_1fr] gap-y-2">
                  <span className="font-M-500 text-text-tertiary">Name</span>
                  <span className="font-M-500 text-text-primary">
                    {profileName || "-"}
                  </span>

                  <span className="font-M-500 text-text-tertiary">Email</span>
                  <span className="font-M-500 text-text-primary">
                    {profileEmail || "-"}
                  </span>
                </div>
              </section>

              <section className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-L-600 text-text-primary">Addresses</h2>

                  <button
                    type="button"
                    aria-label="Add address"
                    onClick={openAddAddressModal}
                    disabled={addresses.length >= MAX_ADDRESSES}
                    className="text-brand-primary transition-opacity duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:text-text-tertiary"
                  >
                    <AddAddressIcon className="h-4 w-4" />
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <p className="font-M-500 text-text-tertiary">
                    No addresses saved
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {addresses.map((address) => {
                      const country = normalizeCountry(address.country);

                      return (
                        <article
                          key={address.id}
                          className="bg-bg-surface p-3 ring ring-border-primary"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <CountryIcon
                                  country={country}
                                  className="h-4 w-4"
                                />
                                <span className="font-M-600 text-text-primary">
                                  {country}
                                </span>
                                {address.is_default ? (
                                  <span className="font-XS-600 uppercase tracking-wide text-brand-primary">
                                    Default
                                  </span>
                                ) : null}
                              </div>

                              <p className="mt-1 font-M-500 text-text-primary">
                                {address.first_name} {address.last_name}
                              </p>
                              <p className="font-M-500 text-text-secondary">
                                {address.address_line_1}
                              </p>
                              {address.apartment ? (
                                <p className="font-M-500 text-text-secondary">
                                  {address.apartment}
                                </p>
                              ) : null}
                              <p className="font-M-500 text-text-secondary">
                                {address.city}, {address.province}{" "}
                                {address.postal_code}
                              </p>
                              <p className="font-M-500 text-text-secondary">
                                {address.phone_number}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                aria-label="Edit address"
                                onClick={() => openEditAddressModal(address)}
                                className="text-brand-primary transition-opacity duration-200 hover:opacity-80"
                              >
                                <EditIcon className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                aria-label="Delete address"
                                disabled={deletingAddressId === address.id}
                                onClick={() => onDeleteAddress(address)}
                                className="text-brand-primary transition-opacity duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:text-text-tertiary"
                              >
                                <DeleteIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          )}
        </section>
      </main>

      {isProfileModalOpen ? (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/20 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[560px] bg-bg-base p-3 ring ring-border-primary">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-L-600 text-text-primary">
                Edit Your Profile
              </h3>

              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                aria-label="Close profile modal"
                className="text-text-tertiary transition-colors duration-200 hover:text-text-primary"
              >
                <Close16Icon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onSaveProfile} className="mt-3 flex flex-col gap-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  autoComplete="given-name"
                  value={profileDraft.first_name}
                  onChange={(event) =>
                    setProfileDraft((prev) => ({
                      ...prev,
                      first_name: event.target.value,
                    }))
                  }
                  placeholder="First name"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />

                <input
                  type="text"
                  autoComplete="family-name"
                  value={profileDraft.last_name}
                  onChange={(event) =>
                    setProfileDraft((prev) => ({
                      ...prev,
                      last_name: event.target.value,
                    }))
                  }
                  placeholder="Last name (optional)"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />
              </div>

              <input
                type="email"
                autoComplete="email"
                value={profileDraft.email}
                onChange={(event) =>
                  setProfileDraft((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                placeholder="Email"
                className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
              />

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="bg-bg-base px-4 py-2.5 font-M-500 text-text-primary ring ring-border-primary transition-colors duration-200 hover:bg-bg-hover"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="bg-bg-base px-4 py-2.5 font-M-600 text-text-primary ring ring-border-primary transition-colors duration-200 hover:bg-bg-hover disabled:cursor-not-allowed disabled:text-text-tertiary"
                >
                  {isSavingProfile ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isAddressModalOpen ? (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/20 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[560px] bg-bg-base p-3 ring ring-border-primary">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-L-600 text-text-primary">
                {editingAddress ? "Edit Your Address" : "Add Your Address"}
              </h3>

              <button
                type="button"
                onClick={() => {
                  setIsAddressModalOpen(false);
                  setEditingAddress(null);
                }}
                aria-label="Close address modal"
                className="text-text-tertiary transition-colors duration-200 hover:text-text-primary"
              >
                <Close16Icon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onSaveAddress} className="mt-3 flex flex-col gap-2">
              <div className="relative">
                <CountryIcon
                  country={addressDraft.country}
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                />

                <select
                  value={addressDraft.country}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      country: normalizeCountry(event.target.value),
                    }))
                  }
                  className="w-full appearance-none bg-bg-base py-2.5 pl-9 pr-10 font-M-500 text-text-primary ring ring-border-primary focus:outline-none"
                >
                  <option value="Finland">Finland</option>
                  <option value="Australia">Australia</option>
                </select>

                <DropDownIcon className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-text-secondary" />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  autoComplete="shipping given-name"
                  value={addressDraft.first_name}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      first_name: event.target.value,
                    }))
                  }
                  placeholder="First name"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />

                <input
                  type="text"
                  autoComplete="shipping family-name"
                  value={addressDraft.last_name}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      last_name: event.target.value,
                    }))
                  }
                  placeholder="Last name"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />
              </div>

              <input
                type="text"
                autoComplete="shipping address-line1"
                value={addressDraft.address_line_1}
                onChange={(event) =>
                  setAddressDraft((prev) => ({
                    ...prev,
                    address_line_1: event.target.value,
                  }))
                }
                placeholder="Address"
                className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
              />

              <input
                type="text"
                autoComplete="shipping address-line2"
                value={addressDraft.apartment}
                onChange={(event) =>
                  setAddressDraft((prev) => ({
                    ...prev,
                    apartment: event.target.value,
                  }))
                }
                placeholder="Apartment, Suite, etc"
                className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
              />

              <div className="grid gap-2 sm:grid-cols-3">
                <input
                  type="text"
                  autoComplete="shipping address-level2"
                  value={addressDraft.city}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      city: event.target.value,
                    }))
                  }
                  placeholder="City"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />

                <input
                  type="text"
                  autoComplete="shipping address-level1"
                  value={addressDraft.province}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      province: event.target.value,
                    }))
                  }
                  placeholder="Province"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />

                <input
                  type="text"
                  autoComplete="shipping postal-code"
                  value={addressDraft.postal_code}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      postal_code: event.target.value,
                    }))
                  }
                  placeholder="Postal code"
                  className="w-full bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary ring ring-border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center bg-bg-base ring ring-border-primary">
                <span className="px-3 font-M-500 text-text-tertiary">
                  {getCountryPrefix(addressDraft.country)}
                </span>

                <input
                  type="tel"
                  autoComplete="shipping tel"
                  value={addressDraft.phone_local}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      phone_local: event.target.value,
                    }))
                  }
                  placeholder="Phone number"
                  className="min-w-0 flex-1 bg-bg-base px-3 py-2.5 font-M-500 text-text-primary placeholder:text-text-tertiary focus:outline-none"
                />

                <div className="flex items-center gap-1 border-l border-border-primary px-3 text-text-secondary">
                  <CountryIcon
                    country={addressDraft.country}
                    className="h-4 w-4"
                  />
                  <DropDownIcon className="h-3 w-3" />
                </div>
              </div>

              <label className="mt-1 flex items-center gap-2 font-M-500 text-text-primary">
                <input
                  type="checkbox"
                  checked={addressDraft.is_default}
                  onChange={(event) =>
                    setAddressDraft((prev) => ({
                      ...prev,
                      is_default: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-text-primary"
                />
                This is my default address
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddressModalOpen(false);
                    setEditingAddress(null);
                  }}
                  className="bg-bg-base px-4 py-2.5 font-M-500 text-text-primary ring ring-border-primary transition-colors duration-200 hover:bg-bg-hover"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingAddress}
                  className="bg-bg-base px-4 py-2.5 font-M-600 text-text-primary ring ring-border-primary transition-colors duration-200 hover:bg-bg-hover disabled:cursor-not-allowed disabled:text-text-tertiary"
                >
                  {isSavingAddress ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

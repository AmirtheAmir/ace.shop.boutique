import axios from "axios";

export type PolicyType =
  | "refund"
  | "privacy"
  | "shipping"
  | "terms"
  | "cookies";

export type PolicySection = {
  id: string;
  type: PolicyType;
  section_order: number;
  title: string;
  description: string;
  created_at: string;
};

export async function fetchPolicySections(type: PolicyType) {
  const { data } = await axios.get<PolicySection[]>(`/api/policies/${type}`);
  return data;
}
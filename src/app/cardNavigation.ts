export const CASE_STUDIES_URL = "https://work.sandeepmajumder.com";
export const THOUGHTS_URL = "https://medium.com/@sandeep_m";
export const HANDCRAFTED_URL = "https://work.sandeepmajumder.com/handcrafted";

export function navigateFromCard(label: string): boolean {
  if (label === "Case Studies") {
    window.location.href = CASE_STUDIES_URL;
    return true;
  }
  if (label === "Thoughts") {
    window.location.href = THOUGHTS_URL;
    return true;
  }
  if (label === "Handcrafted") {
    window.location.href = HANDCRAFTED_URL;
    return true;
  }
  return false;
}

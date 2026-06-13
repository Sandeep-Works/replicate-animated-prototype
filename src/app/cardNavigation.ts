export const CASE_STUDIES_URL = "https://work.sandeepmajumder.com";

export function navigateFromCard(label: string): boolean {
  if (label === "Case Studies") {
    window.location.href = CASE_STUDIES_URL;
    return true;
  }
  return false;
}

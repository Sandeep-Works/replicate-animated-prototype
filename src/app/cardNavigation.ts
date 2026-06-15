export const CASE_STUDIES_URL = "https://work.sandeepmajumder.com";
export const THOUGHTS_URL = "https://medium.com/@sandeep_m";
export const HANDCRAFTED_URL = "https://work.sandeepmajumder.com/handcrafted";
export const EXPERIMENTS_URL = "https://work.sandeepmajumder.com/experiments";
export const RESUME_URL = "https://drive.google.com/file/d/1v6GTIESWuLo09K2LvsnHYi7ziWq1xIaX/view";

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
  if (label === "Experiments") {
    window.location.href = EXPERIMENTS_URL;
    return true;
  }
  if (label === "Resume") {
    window.location.href = RESUME_URL;
    return true;
  }
  return false;
}

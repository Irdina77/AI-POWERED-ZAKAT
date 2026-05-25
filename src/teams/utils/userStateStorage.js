export const USER_STATE_KEY = "userState";
export const DEFAULT_USER_STATE = "Selangor";

export function getUserState() {
  if (typeof window === "undefined") {
    return DEFAULT_USER_STATE;
  }

  return localStorage.getItem(USER_STATE_KEY) || DEFAULT_USER_STATE;
}

export function setUserState(state) {
  if (typeof window === "undefined" || !state) {
    return;
  }

  localStorage.setItem(USER_STATE_KEY, state);
}

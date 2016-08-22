
export function clearAllData() {
  if(confirm("Are you sure?")) {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.href = "/";
  }
}
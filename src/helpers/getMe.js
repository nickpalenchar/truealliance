export function getMe (prop) {
  var me = JSON.parse(window.localStorage.getItem(window.sessionStorage.getItem("activeId")));
  if(!me) return null;
  if(prop && me[prop]) return me[prop];
  return me;
}
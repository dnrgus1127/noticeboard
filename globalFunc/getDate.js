/**
 * @param 파라미터로 min (텍스트) 입력 시 (yyyy-mm-dd : hh:mm)
 * @returns 현재 시각 (yyyy-mm-dd)
 */
export function GetDate(mode) {
  let now = new Date();
  //현재 시간
  let date_now = `${now.getFullYear()}-${`${now.getMonth +1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() +1 }`}-`;
  // `${now.getMonth < 10 ? "0" + now.getMonth() : now.getMonth() }`
  date_now += `${now.getDate() < 10 ? "0"+now.getDate() : now.getDate()}`
  if (mode === "min") {
    let hour = now.getHours();
    let minute = now.getMinutes();
    if (hour < 10) {
      hour = `${"0" + now.getHours()}`;
    }
    if (minute < 10) {
      minute = `${"0" + now.getMinutes()}`;
    }
    date_now += ` : ${hour}:${minute}`;
  }
  return date_now;
}

export function saveCookie(
  cookieName = '',
  cookieValue = '',
  cookieDates = 7 // 默认为7天
) {
  const d = new Date();
  d.setDate(d.getDate() + cookieDates);
  document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(
    cookieValue
  )};expires=${d.toUTCString()};path=/`;
}

export function getCookie(cookieName = '') {
  const cookieStr = decodeURIComponent(document.cookie);
  const arr = cookieStr.split('; ');
  let cookieValue = '';
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split('=');
    if (temp[0] === cookieName) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
}

export function deleteCookie(name = '') {
  // 将过期日期设置为过去
  const pastDate = new Date(0);
  document.cookie = `${encodeURIComponent(name)}=; expires=${pastDate.toUTCString()};path=/`;
}

export function getTokenFromCookie(cookieName) {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${cookieName}=`))
      ?.split('=')[1];

    return cookieValue || null;
}

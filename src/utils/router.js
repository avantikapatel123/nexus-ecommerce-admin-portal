export const navigateTo = (path) => {
  if (typeof window === 'undefined') return;

  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('routechange'));
};

export const getCurrentPath = () => {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
};

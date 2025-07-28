export const localStore = (key: string, value: any) => {
  localStorage.setItem(key, btoa(JSON.stringify(value)));
};

export const localGet = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(atob(item)) : null;
};

export const localDelete = (key: string) => {
  localStorage.removeItem(key);
};

export const localDeleteAll = () => {
  localStorage.clear();
};
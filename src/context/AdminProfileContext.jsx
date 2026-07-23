import { createContext, useContext, useEffect, useState } from 'react';

const AdminProfileContext = createContext(null);

export const AdminProfileProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(() => {
    return (
      window.localStorage.getItem('admin-avatar') ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    );
  });

  const [name, setName] = useState(() => {
    return window.localStorage.getItem('admin-name') || 'Avantika Patel';
  });

  useEffect(() => {
    window.localStorage.setItem('admin-avatar', avatar);
  }, [avatar]);

  useEffect(() => {
    window.localStorage.setItem('admin-name', name);
  }, [name]);

  return (
    <AdminProfileContext.Provider value={{ avatar, setAvatar, name, setName }}>
      {children}
    </AdminProfileContext.Provider>
  );
};

export const useAdminProfile = () => useContext(AdminProfileContext);

export default AdminProfileProvider;

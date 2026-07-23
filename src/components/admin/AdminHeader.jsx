import { useState } from 'react';
import { useAdminProfile } from '../../context/AdminProfileContext';
import { ShieldCheck, X } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
];

export default function AdminHeader() {
  const { avatar, setAvatar, name, setName } = useAdminProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAvatar, setTempAvatar] = useState(avatar);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setName(tempName);
    setAvatar(tempAvatar);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setTempName(name);
    setTempAvatar(avatar);
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="admin-header-bar">
        <div className="header-meta">
          <span className="current-date">{currentDate}</span>
        </div>
        <div className="admin-profile-section">
          <div className="badge-system-admin">
            <ShieldCheck size={14} className="icon-pulse-blue" />
            <span>{name}</span>
          </div>
          <div className="admin-avatar clickable" onClick={handleOpenModal} title="Edit Profile Details">
            <img src={avatar} alt="Admin Avatar" className="avatar-img" />
          </div>
        </div>
      </header>

      {/* Profile Editor Modal Overlay */}
      {isModalOpen && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>Edit Admin Profile</h3>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)} type="button">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="adminNameInput">Display Name</label>
                <input 
                  id="adminNameInput"
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Choose Preset Avatar</label>
                <div className="avatar-presets-grid">
                  {PRESET_AVATARS.map((url, index) => (
                    <div 
                      key={index} 
                      className={`preset-avatar-option ${tempAvatar === url ? 'selected' : ''}`}
                      onClick={() => setTempAvatar(url)}
                    >
                      <img src={url} alt={`Preset ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="customAvatarUrl">Or Paste Custom Image URL</label>
                <input 
                  id="customAvatarUrl"
                  type="url" 
                  placeholder="https://images.unsplash.com/... or similar image url"
                  value={tempAvatar} 
                  onChange={(e) => setTempAvatar(e.target.value)} 
                  required 
                />
              </div>

              <div className="modal-footer-actions">
                <button className="secondary-btn" onClick={() => setIsModalOpen(false)} type="button">Cancel</button>
                <button className="primary-btn" type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

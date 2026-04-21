import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStudentProgress, getUserEnrollments } from '../services/api';
import BottomNav from '../components/BottomNav';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role?.name || user?.role;
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (role === 'Intern') {
      const uid = user._id || user.id;
      Promise.all([getUserEnrollments(uid), getStudentProgress(uid)])
        .then(([e, p]) => { setEnrollments(e.data); setProgress(p.data); });
    }
  }, [user, role]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'My Courses', action: () => navigate('/courses') },
    { label: 'Change Password', action: () => navigate('/reset') },
    { label: 'Log Out', action: handleLogout, danger: true },
  ];

  return (
    <div className="page-container">
      <h2 className="section-title">Profile</h2>

      <div className="profile-header card">
        <div className="avatar-wrapper">
          <div className="avatar-circle">{user.name?.charAt(0).toUpperCase()}</div>
        </div>
        <h3>{user.name}</h3>
        <p className="profile-role">{role}</p>
        <p className="profile-email">{user.email}</p>
      </div>

      {role === 'Intern' && (
        <div className="stats-row" style={{ marginTop: 16 }}>
          <div className="stat-card"><h3>{enrollments.length}</h3><p>Enrolled</p></div>
          <div className="stat-card"><h3>{progress.filter((p) => p.status === 'graded').length}</h3><p>Graded</p></div>
          <div className="stat-card"><h3>{progress.filter((p) => p.status === 'submitted').length}</h3><p>Submitted</p></div>
        </div>
      )}

      <div className="menu" style={{ marginTop: 16 }}>
        {menuItems.map((item, i) => (
          <button key={i} className={`menu-item ${item.danger ? 'danger' : ''}`} onClick={item.action}>
            <span>{item.label}</span>
            <span>›</span>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;

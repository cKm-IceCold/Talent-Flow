import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, getCourses, getAllEnrollments, deleteCourse } from '../services/api';
import BottomNav from '../components/BottomNav';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllUsers(), getCourses(), getAllEnrollments()])
      .then(([u, c, e]) => {
        setUsers(u.data);
        setCourses(c.data);
        setEnrollments(e.data);
      }).finally(() => setLoading(false));
  }, []);

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await deleteCourse(id);
    setCourses(courses.filter((c) => c._id !== id));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="dash-header">
        <div>
          <p className="greeting">Admin Panel</p>
          <h2>{user.name}</h2>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><h3>{users.length}</h3><p>Users</p></div>
        <div className="stat-card"><h3>{courses.length}</h3><p>Courses</p></div>
        <div className="stat-card"><h3>{enrollments.length}</h3><p>Enrollments</p></div>
      </div>

      <div className="tabs">
        {['users', 'courses', 'enrollments'].map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <div className="list">
          {users.map((u) => (
            <div className="list-item" key={u._id}>
              <div>
                <p className="item-title">{u.name}</p>
                <p className="item-sub">{u.email} · {u.role?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'courses' && (
        <div className="list">
          {courses.map((c) => (
            <div className="list-item" key={c._id}>
              <div>
                <p className="item-title">{c.title}</p>
                <p className="item-sub">by {c.mentor?.name}</p>
              </div>
              <button className="btn-delete" onClick={() => handleDeleteCourse(c._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'enrollments' && (
        <div className="list">
          {enrollments.map((e) => (
            <div className="list-item" key={e._id}>
              <div>
                <p className="item-title">{e.user?.name}</p>
                <p className="item-sub">{e.course?.title} · {e.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default AdminDashboard;

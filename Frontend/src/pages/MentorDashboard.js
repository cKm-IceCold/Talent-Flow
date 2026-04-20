import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCourses, createCourse } from '../services/api';
import BottomNav from '../components/BottomNav';
import './Dashboard.css';

const MentorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCourses().then((res) => {
      const mine = res.data.filter((c) => (c.mentor?._id || c.mentor) === (user._id || user.id));
      setCourses(mine);
    }).finally(() => setLoading(false));
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await createCourse(form);
      setCourses([...courses, res.data]);
      setForm({ title: '', description: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="dash-header">
        <div>
          <p className="greeting">Hello 👋</p>
          <h2>{user.name}</h2>
        </div>
        <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px' }} onClick={() => setShowForm(!showForm)}>
          + New Course
        </button>
      </div>

      {showForm && (
        <form className="card" style={{ marginBottom: 16 }} onSubmit={handleCreate}>
          <h3 style={{ marginBottom: 12 }}>Create Course</h3>
          <div className="input-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn-primary" type="submit">Create</button>
        </form>
      )}

      <div className="stats-row">
        <div className="stat-card"><h3>{courses.length}</h3><p>My Courses</p></div>
      </div>

      <h3 className="section-title">My Courses</h3>
      {courses.length === 0 ? (
        <p className="empty">You haven't created any courses yet.</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id} className="course-card">
              <div className="course-card-body">
                <h4>{course.title}</h4>
                <p>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default MentorDashboard;

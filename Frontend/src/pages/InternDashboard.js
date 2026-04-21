import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCourses, getUserEnrollments, getStudentProgress } from '../services/api';
import BottomNav from '../components/BottomNav';
import './Dashboard.css';

const InternDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCourses(),
      getUserEnrollments(user._id || user.id),
      getStudentProgress(user._id || user.id),
    ]).then(([c, e, p]) => {
      setCourses(c.data);
      setEnrollments(e.data);
      setProgress(p.data);
    }).finally(() => setLoading(false));
  }, [user]);

  const enrolledIds = enrollments.map((e) => e.course?._id || e.course);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="dash-header">
        <div>
          <p className="greeting">Hello 👋</p>
          <h2>{user.name}</h2>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>{enrollments.length}</h3>
          <p>Enrolled</p>
        </div>
        <div className="stat-card">
          <h3>{progress.filter((p) => p.status === 'graded').length}</h3>
          <p>Graded</p>
        </div>
        <div className="stat-card">
          <h3>{progress.filter((p) => p.status === 'submitted').length}</h3>
          <p>Submitted</p>
        </div>
      </div>

      <h3 className="section-title">All Courses</h3>
      {courses.length === 0 ? (
        <p className="empty">No courses available yet.</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id} className="course-card">
              <div className="course-card-body">
                <h4>{course.title}</h4>
                <p>{course.mentor?.name || 'TalentFlow'}</p>
                {enrolledIds.includes(course._id) && (
                  <span className="badge enrolled">Enrolled</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default InternDashboard;

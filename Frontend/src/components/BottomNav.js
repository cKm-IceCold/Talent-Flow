import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { MdOutlineInbox } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import './BottomNav.css';

const BottomNav = () => (
  <nav className="bottom-nav">
    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <AiOutlineHome size={22} /><span>Home</span>
    </NavLink>
    <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <BiBook size={22} /><span>Catalog</span>
    </NavLink>
    <NavLink to="/inbox" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <MdOutlineInbox size={22} /><span>Inbox</span>
    </NavLink>
    <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <CgProfile size={22} /><span>Profile</span>
    </NavLink>
  </nav>
);

export default BottomNav;

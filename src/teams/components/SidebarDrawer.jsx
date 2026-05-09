import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SidebarDrawer.css';

const SidebarDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
    { id: 'calculator', label: 'Kalkulator Zakat', icon: '🧮', path: '/calculator' },
    { id: 'nisab', label: 'Nisab Tahunan Zakat', icon: '🛡️', path: '/admin/nisab' },
    { id: 'logout', label: 'Logout', icon: '🚪', action: 'logout' }
  ];

  const handleMenuClick = (item) => {
    if (item.action === 'logout') {
      // Handle logout logic here
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userToken');
      navigate('/login');
    } else {
      navigate(item.path);
    }
    onClose();
  };

  const drawerVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="sidebar-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="sidebar-drawer"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* User Profile Section */}
            <div className="sidebar-profile">
              <div className="sidebar-avatar">
                <span>👤</span>
              </div>
              <div className="sidebar-user-info">
                <h3 className="sidebar-welcome">Welcome back!</h3>
                <p className="sidebar-email">user@example.com</p>
              </div>
            </div>

            {/* Divider */}
            <div className="sidebar-divider" />

            {/* Menu Items */}
            <nav className="sidebar-nav">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: index * 0.1 }}
                  className="sidebar-menu-item"
                  onClick={() => handleMenuClick(item)}
                >
                  <span className="sidebar-menu-icon">{item.icon}</span>
                  <span className="sidebar-menu-label">{item.label}</span>
                </motion.div>
              ))}
            </nav>

            {/* Islamic Pattern Accent */}
            <div className="sidebar-pattern">
              <div className="pattern-element">✦</div>
              <div className="pattern-element">✦</div>
              <div className="pattern-element">✦</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarDrawer;
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../Contexts/userContext';
import UserInfoBox from '../Subcomponents/UserInfoBox';
import ComingSoonBadge from './components/ComingSoonBadge';
import NewFeatureBadge from './components/NewFeatureBadge';

const AppSidebar = () => {
  const {user} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenavbar ${isOpen ? 'is-open' : ''} ml-auto `}>
      <div className='p-2'>
        <UserInfoBox user={user}/>
      </div>
      
      <div className="sidenavbar-toggle" onClick={toggleSidenavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className="sidenavbar-content">
        {/* Add sidenavbar content here */}
        <Link to='/' className=''>Home</Link>
        <Link to={'/my-profile/detail'}>My Profile</Link>
        <Link to={'/my-calendar'}>My Calendar</Link>
        <Link to={'/news-and-updates'}>News & Updates</Link>
        <Link to='/forms-repository' className=''>Forms Repository</Link>
        <Link to={'/team-directory'}>Team Directory</Link>
        <span className='user-select-none d-block mt-2 mb-1'><span className='text-muted'>HSQ Tools <ComingSoonBadge/></span></span>
        <Link to={'/wiki'}>Wiki</Link>
        
        {/* <p className='user-select-none'><span className='text-muted'>Wiki <ComingSoonBadge/></span></p> */}
        
        {/* Add more sidenavbar links as needed */}
      </div>
    </div>
  );
};

export default AppSidebar;

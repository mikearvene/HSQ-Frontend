import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import UserInfoBox from './Subcomponents/UserInfoBox';
import ComingSoonBadge from './Subcomponents/ComingSoonBadge';
import NewFeatureBadge from './Subcomponents/NewFeatureBadge';

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
        <Link to='/forms-repository' className=''>Forms Repository</Link>
        <Link to={'/team-directory'}>Team Directory</Link>
        <Link to={'/wiki'}>Wiki</Link>
        <Link to={'/news-and-updates'}>News & Updates</Link>
        <p className='user-select-none'><span className='text-muted'>My Calendar <ComingSoonBadge/></span></p>
        
        {/* <p className='user-select-none'><span className='text-muted'>Wiki <ComingSoonBadge/></span></p> */}
        
        {/* Add more sidenavbar links as needed */}
      </div>
    </div>
  );
};

export default AppSidebar;

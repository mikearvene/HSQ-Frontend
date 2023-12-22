import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import UserInfoBox from './Subcomponents/UserInfoBox';
import ComingSoonBadge from './Subcomponents/ComingSoonBadge';

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
        <Link to='/Forms-Repository' className=''>Forms Repository</Link>
        <p className='user-select-none'><span className='text-muted'>My Profile <ComingSoonBadge/></span></p>
        <p className='user-select-none'><span className='text-muted'>My Calendar <ComingSoonBadge/></span></p>
        <p className='user-select-none'><span className='text-muted'>News & Updates <ComingSoonBadge/></span></p>
        <p className='user-select-none'><span className='text-muted'>Team Directory <ComingSoonBadge/></span></p>
        <p className='user-select-none'><span className='text-muted'>Wiki <ComingSoonBadge/></span></p>
        
        {/* Add more sidenavbar links as needed */}
      </div>
    </div>
  );
};

export default AppSidebar;

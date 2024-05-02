import { Divider } from '@mui/material'
import React, {useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Menu, Box, ListItemIcon, MenuItem} from '@mui/material';
import { Badge } from '@mui/material';
import { useData } from '../DataProvider';
import bellicon from '../../assets/icons/bellicon.png';
import bellicon_dark from '../../assets/icons/bellicon_dark.png';
import { styled } from '@mui/system';

const StyledMenuItem = styled(MenuItem)(() => ({
  whiteSpace: "unset",
  wordBreak: "break-all"
}));

const Notification = (props) => {
    const [mockData, setMockData] = useState([{description: 'You have a new nweaf newfaf adsadsad asdsa das enwas notification', time: '2 minutes', hasViewed: true}, {description: 'You have a new notification', time: '3 hours', hasViewed: false}, {description: 'You have a new notification', time: '2 hours 20 minutes', hasViewed: false},{description: 'You have a new nweaf newfaf adsadsad asdsa das enwas notification', time: '2 minutes', hasViewed: true}, {description: 'You have a new notification', time: '3 hours', hasViewed: false}, {description: 'You have a new notification', time: '2 hours 20 minutes', hasViewed: false},{description: 'You have a new nweaf newfaf adsadsad asdsa das enwas notification', time: '2 minutes', hasViewed: true}, {description: 'You have a new notification', time: '3 hours', hasViewed: false}, {description: 'You have a new notification', time: '2 hours 20 minutes', hasViewed: false},{description: 'You have a new nweaf newfaf adsadsad asdsa das enwas notification', time: '2 minutes', hasViewed: true}, {description: 'You have a new notification', time: '3 hours', hasViewed: false}, {description: 'You have a new notification', time: '2 hours 20 minutes', hasViewed: false},{description: 'You have a new nweaf newfaf adsadsad asdsa das enwas notification', time: '2 minutes', hasViewed: true}, {description: 'You have a new notification', time: '3 hours', hasViewed: false}, {description: 'You have a new notification', time: '2 hours 20 minutes', hasViewed: false}]);
    const filteredData = mockData.filter(item => !item.hasViewed);
    const [notiCount, setNotiCount] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const { toggleDarkMode } = useData();
    const open = Boolean(anchorEl);

    const handleSetView = (event, idx) => {
        // event.preventDefault();
        event.stopPropagation();
    
        // Set notification to viewed when clicked
        const newMockData = [...mockData];
        newMockData[idx].hasViewed = true;
        setMockData(newMockData);
      };
    
    const handleClick = (event) => {
      // Reset notification count to 0 when clicking on the badge icon
      setNotiCount(0);
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  useEffect(() => {
      setNotiCount(filteredData.length);
  }, [filteredData]);
  return (
    
      <div>
          <Badge badgeContent={notiCount} color="primary">
              <img className='cursor-pointer' src={!toggleDarkMode ? bellicon : bellicon_dark} alt="bell" width={18} height={18} onClick={handleClick} />
          </Badge>
          <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              sx={{ ml: 1}}
              PaperProps={{
                  elevation: 0,
                  sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,

                      '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                      },
                      '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: "15px",
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                      },
                  },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
              <div className='w-[400px] max-h-[calc(100vh-136px)] h-[400px] overflow-y-scroll'>
                  <p className='text-[var(--text-data)] text-xl pl-5 pb-1 font-bold'>All Notifications</p>
                  <Divider />
                  {mockData.map((item, index) => (
                      <StyledMenuItem key={index} className="flex py-2" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }} onClick={(event)=>handleSetView(event,index)}>
                          <ListItemIcon className='flex justify-center items-center'>
                              <NotificationsIcon fontSize="small" />
                          </ListItemIcon>
                          <Box>
                              <p className='text-[var(--text-data)] w-[330px] text-sm  break-all inline-block'>{item.description}</p>
                              <div className='flex justify-between'>
                                <p className='text-[var(--text-caption)] text-xs '>{item.time} ago</p>
                                <p className='text-[var(--text-caption)] text-xs'>{item.hasViewed ? "Viewed" : "Not viewed"}</p>
                              </div>
                              
                          </Box>
                      </StyledMenuItem>
                  ))}
              </div>
          </Menu>
      </div>
  );
}


export default Notification
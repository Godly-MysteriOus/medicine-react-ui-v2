
import React from 'react';
import AdminLuFieldManagement from './screens/seller/FieldManagement/AdminLuFieldManagement';
import { useStyles } from './App.style';
function App() {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.logoImageHolder}> <img src="/companyLogo.png" alt=""/></div>
        <div className={classes.loggedInUserDetail}>
          <div className={classes.userName}>Jayant Singh</div>
          <div className={classes.loggedInDetail}>Logged In Time : 23-10-2002 12:03</div>
        </div>
      </div>
      <div className={classes.body}>
          <div className={classes.navigationHolder}></div>
          <div className={classes.renderableContentBody}>
            <AdminLuFieldManagement/>
          </div>
      </div>
    </div>
  )
}

export default App;

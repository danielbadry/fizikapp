import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';
import Inbox from './Inbox';
import WatchedVideosList from './WatchedVideosList';
import UserBasics from './user/UserBasics';
import UserFinancialTab from './user/UserFinancialTab';
import UserRequests from './UserRequests';
import FavoriteVideos from './FavoriteVideos';

//import ReactDOM from "react-dom";

class ProfileTabs extends React.PureComponent {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });
  render() {
    const { activeIndex } = this.state;
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <VerticalTabs value={activeIndex} onChange={this.handleChange}>
          
          <MyTab 
            label="عمومی" 
            style={{
              fontFamily: "IranSans"
            }}
            />

          <MyTab 
            label="مالی" 
            style={{
              fontFamily: "IranSans"
            }}
            />
          
          <MyTab 
            label="ویدیوهای دیده شده" 
            style={{
              fontFamily: "IranSans"
            }}
            />

          <MyTab 
            label="مورد علاقه ها" 
            style={{
              fontFamily: "IranSans"
            }}
            />
          
          <MyTab 
            label={
              <Badge 
                color="secondary" 
                badgeContent={+99}
                >
                  صندوق پیام
              </Badge>
            }
            style={{
              fontFamily: "IranSans"
            }}
            />

          <MyTab 
            label={
              <Badge 
                color="secondary" 
                badgeContent={+99}
                >
                  درخواست ها
              </Badge>
            }
            style={{
              fontFamily: "IranSans"
            }}
            />

        </VerticalTabs>

        {activeIndex === 0 && <TabContainer>
          <UserBasics />
        </TabContainer>}
        {activeIndex === 1 && <TabContainer>
          <UserFinancialTab />
        </TabContainer>}
        {activeIndex === 2 && <TabContainer>
          <WatchedVideosList />
        </TabContainer>}
        {activeIndex === 3 && <TabContainer>
          <FavoriteVideos />
        </TabContainer>}
        {activeIndex === 4 && <TabContainer>
          <Inbox />
        </TabContainer>}
        {activeIndex === 5 && <TabContainer>
          <UserRequests />
        </TabContainer>}
      </div>
    );
  }
}

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: "column"
  },
  indicator: {
    display: "none"
  }
}))(Tabs);

const MyTab = withStyles(theme => ({
  selected: {
    color: "tomato",
    borderRight: "2px solid tomato",
    fontFamily: "IranSans"
  }
}))(Tab);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default ProfileTabs;
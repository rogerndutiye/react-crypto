import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import News from "./News";
import Trades from "./Trades";
import Analysis from "./Analysis";
import Overview from "./Overview";
import Timeline from "./Timeline";

const CryptoDashboard = () => {
  return (
    <>
      <Tabs className="column crypto-data">
        <TabList className="tab tab-block font-thin">
          <Tab className="tab-item active">Overview</Tab>
          <Tab className="tab-item active">Analysis</Tab>
          <Tab className="tab-item active">Trades</Tab>
          <Tab className="tab-item active">News</Tab>
          <Tab className="tab-item active">Timeline</Tab>
        </TabList>
        <TabPanel>
          <Overview />
        </TabPanel>
        <TabPanel>
          <Analysis />
        </TabPanel>
        <TabPanel>
          <Trades />
        </TabPanel>
        <TabPanel>
          <News />
        </TabPanel>
        <TabPanel>
          <Timeline />
        </TabPanel>
      </Tabs>
    </>
  );
};
export default CryptoDashboard;

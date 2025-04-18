import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Result from './result';
import AirTravel from '../../assets/Travel.png';
import Phone from '../../assets/phone2.png';
import result from '../../assets/result.png';
import DigitalCampaignComp from './digitalCampaign';
import banner from '../../layouts/user/assets/images/NetZero Tool Pic.jpeg';
import Image from './Image';
import Video from './Video';
import GreenCheck from './greenCheck';
import PageView from './pageView';

const DigitalCampaignCalculation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* <div style={{ display: 'flex', marginBottom: "10px", overflow: 'hidden', alignItems: 'center', justifyContent: 'center', height: '600px', marginTop: '14px' }}>
                <img src={banner} alt="top_img" width="100%" />
            </div> */}
      <Container maxWidth className="custom-outer-bg tab-fixed mt-2">
        <Box className="tab-outer">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {/* <Tab
              icon={<img src={Phone} alt="" width={35} className="tabImgZoomIn tabImgWhite" />}
              label="Digital Campaign"
              className="tab-text"
            /> */}
            <Tab
              icon={<img src={Phone} alt="" width={35} className="tabImgZoomIn tabImgWhite" />}
              label="Page View"
              className="tab-text"
            />
            <Tab
              icon={<img src={Phone} alt="" width={35} className="tabImgZoomIn tabImgWhite" />}
              label="Image"
              className="tab-text"
            />
            <Tab
              icon={<img src={Phone} alt="" width={35} className="tabImgZoomIn tabImgWhite" />}
              label="Video"
              className="tab-text"
            />
            <Tab
              icon={<img src={result} alt="" width={35} className="tabImgZoomIn tabImgWhite" />}
              label="Summary"
              className="tab-text"
            />
            {/* <Tab
              icon={<img src={result} alt="" width={35} className="tabImgZoomIn tabImgWhite" />}
              label="Green"
              className="tab-text"
            /> */}
          </Tabs>
        </Box>
        <Box my={2} pb={2}>
          {/* {value === 0 && <DigitalCampaignComp setValue={setValue} value={value} />} */}
          {value === 0 && <PageView setValue={setValue} value={value} />}
          {value === 1 && <Image setValue={setValue} value={value} />}
          {value === 2 && <Video setValue={setValue} value={value} />}
          {value === 3 && <Result setValue={setValue} value={value} />}
          {/* {value === 4 && <GreenCheck />} */}
        </Box>
      </Container>
    </div>
  );
};

export default DigitalCampaignCalculation;

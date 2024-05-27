import { Grid } from '@mui/material'
import banner from '../../../assets/images/home_banner.jpg'

const Index = () => {
    return (
        <div className=''>
            <img src={banner} alt='img' />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='main py-5 my-2'>
                <Grid className='fs-5' item sm={12} md={6}>At <strong>Go Sustainable</strong>, we understand the needs and aspirations of organizations’ Chief Marketing Officer (CMO) vertical and its stakeholders. And we recognize the necessity of aligning your activities with a net-zero framework and creating an action plan, to achieve your short-, mid-, and long-term goals to reduce the greenhouse gas (GHG) emissions.</Grid>

                <Grid className='fs-5' item sm={12} md={6}>We strive to seamlessly integrate Environmental, Social, and Governance (ESG) considerations into your organization’s strategy through our advisory services. By aligning ESG principles with business objectives, we will support to enhance your brand credibility and contribute to long-term value creation, reinforcing your organization’s position as a socially responsible leader.</Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='main py-5 my-2'>
                <Grid className='fs-5' item sm={12} md={2} style={{ opacity: "0" }}>hb</Grid>
                <Grid className='fs-5 d-flex justify-content-center' item sm={12} md={8}>
                    <video
                        controls
                        src="https://gosustainable.ai/wp-content/uploads/2024/01/Shafeeq-Video.mp4"
                        width="1000" height="550">
                        <track kind="captions" src="captions.vtt" label="English" />
                        Sorry, your browser doesn't support embedded videos, but don't worry, you can
                        <a href="https://gosustainable.ai/wp-content/uploads/2024/01/Shafeeq-Video.mp4">download it</a>
                        and watch it with your favorite video player!
                    </video></Grid>
                <Grid className='fs-5' item sm={12} md={2} style={{ opacity: "0" }}>njk</Grid>

            </Grid>


        </div>
    )
}

export default Index

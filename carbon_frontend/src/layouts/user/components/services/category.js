import { PopupButton } from 'react-calendly'
import { Box, CardActionArea, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import cat1 from '../../assets/images/cat1.png'
import cat2 from '../../assets/images/cat2.png'
import cat3 from '../../assets/images/cat3.png'
import cat4 from '../../assets/images/cat4.png'
import cat5 from '../../assets/images/cat5.png'
import cat6 from '../../assets/images/cat6.png'
import cat7 from '../../assets/images/cat7.png'
import cat8 from '../../assets/images/cat8.png'
import cat9 from '../../assets/images/cat9.png'

const Category = () => {

    const data = [
        {
            img: cat4,
            title: "Air Travel",
            subTitle: "To & fro from the destination"
        },
        {
            img: cat5,
            title: "Transportation ",
            subTitle: "Local public transportation"
        },
        {
            img: cat6,
            title: "Accommodation ",
            subTitle: "Hotel stay"
        },
        {
            img: cat3,
            title: "Food & Beverage ",
            subTitle: "Type of F&B served"
        },
        {
            img: cat2,
            title: "Logistics ",
            subTitle: "Air Freight and logistics"
        },
        {
            img: cat1,
            title: "Production",
            subTitle: "Production of materials"
        },
        {
            img: cat7,
            title: "Energy",
            subTitle: "Electricity & Gasoline consumption"
        },
        {
            img: cat9,
            title: "Digital",
            subTitle: "Digital marketing, content & communications"
        },
        {
            img: cat8,
            title: "Waste",
            subTitle: "Waste generated & disposal method"
        },
    ];

    return (
        <div className='main pt-5'>
            <Grid container spacing={8}>

                {
                    data.map((item, i) => {
                        return (
                            <Grid item sm={12} md={4} className='wow animate__animated animate__fadeInUp animate__slow'>
                                <Card className='bg-bg-transparent shadow-none'>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="320"
                                            image={item.img}
                                            alt="green iguana"
                                            className='cadImage'
                                        />
                                        <CardContent className='text-center text-light p-2 fontFamily cardBtn rounded-4 template-inner-theme' style={{ backgroundColor: "#4ABD43" }}>
                                            <Typography gutterBottom variant="h5" component="div" className='mb-1 fontFamily'>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" className='fontFamily'>
                                                {item.subTitle}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })
                }

                {/* <ul className='wow animate__animated animate__fadeInUp animate__slow mt-3'>
                    {
                        data.map((item, i) => {
                            return (
                                <li>{item.title} {item.subTitle}</li>
                            )
                        })
                    }
                </ul> */}

            </Grid>

            <Box className="text-center py-5">

                <p className='fontFamily pb-3 fs-5 wow animate__animated animate__fadeInUp animate__slow'>
                    {/* Would you like to learn more about these <strong>nine categories </strong>and discover how you can collaborate with us to precisely pinpoint actions for mitigating carbon footprint? And are you ready to take the next step in reducing your carbon footprint reporting journey? */}
                    Are you ready to take the next step in reducing your carbon footprint reporting journey with us?
                </p>
                <p className='fontFamily fs-5 wow animate__animated animate__fadeInUp animate__slow'>
                    {/* Email us at <a className='text-decoration-none ' style={{ color: "#ffffd9" }} href='mailTo:info@sirat.earth'>Sirāt</a> */}
                    <PopupButton
                        url="https://calendly.com/mohammed-sirat"
                        rootElement={document.getElementById("root")}
                        text="Book a demo"
                        styles={{ border: 'none', background: 'none', color: "#ffffd9" }}
                    />
                </p>
            </Box>
        </div>
    )
}

export default Category

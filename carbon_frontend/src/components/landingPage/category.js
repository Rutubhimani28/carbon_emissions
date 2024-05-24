import React from 'react'
import cat1 from '../../assets/images/cat1.png'
import cat2 from '../../assets/images/cat2.png'
import cat3 from '../../assets/images/cat3.png'
import cat4 from '../../assets/images/cat4.png'
import cat5 from '../../assets/images/cat5.png'
import cat6 from '../../assets/images/cat6.png'
import cat7 from '../../assets/images/cat7.png'
import cat8 from '../../assets/images/cat8.png'
import cat9 from '../../assets/images/cat9.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

const Category = () => {
    const data = [
        {
            img: cat1,
            title: "Production",
            subTitle: "Production of materials"
        },
        {
            img: cat2,
            title: "Logistics",
            subTitle: "Freight and logistics"
        },
        {
            img: cat3,
            title: "Food & Beverage",
            subTitle: "Type of F&B served"
        },
        {
            img: cat4,
            title: "Travel",
            subTitle: "To & fro from the destination"
        },
        {
            img: cat5,
            title: "Transportation",
            subTitle: "Local public transportation"
        },
        {
            img: cat6,
            title: "Accommodation",
            subTitle: "Hotel stay"
        },
        {
            img: cat7,
            title: "Energy",
            subTitle: "Electricity & Gasoline consumption"
        },
        {
            img: cat8,
            title: "Digital",
            subTitle: "Digital marketing, content & communications"
        },
        {
            img: cat9,
            title: "Waste",
            subTitle: "Waste generated & disposal method"
        },
    ]

    return (
        <div className='main pt-5'>
            <Grid container spacing={8}>

                {
                    data.map((item, i) => {
                        return (
                            <Grid item sm={12} md={4}>
                                <Card className='bg-bg-transparent shadow-none'>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="320"
                                            image={item.img}
                                            alt="green iguana"
                                            className='cadImage'
                                        />
                                        <CardContent className='text-center text-light p-2 fontFamily cardBtn rounded-4' style={{ backgroundColor: "#4ABD43", borderRadius: "10px" }}>
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

            </Grid>
        </div>
    )
}

export default Category

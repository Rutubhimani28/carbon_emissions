/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Palette from '../../theme/palette'


// eslint-disable-next-line arrow-body-style
const Overview = ({ data, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <Card style={{ display: 'flex', justifyContent: 'center', paddingBottom: "70px" }}>
          <span className="loader" />
        </Card>
      ) : (
        <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
          <Box p={3}>
            <Grid container display="flex" spacing={4}>
              <Grid item xs={12} sm={6}>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                  <Typography variant="body1">Subject :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.subject ? data?.subject : "--"}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                  <Typography variant="body1">Start Date :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} >
                    {
                      data?.startDate ? moment(data?.startDate).format('lll') : "--"
                    }
                  </Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Note :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} >{data?.note ? data?.note : "--"}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1"> Assign To:</Typography>
                  <Typography variant="body2" color={Palette.primary.main} >
                    {data?.assignTo ?
                      <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.assignedUser}</Typography>
                      :
                      <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{'--'}</Typography>
                    }
                  </Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Created by :</Typography>
                  {
                    <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>
                      {data?.createdUser ? data?.createdUser : '--'}
                    </Typography>
                  }
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                  <Typography variant="body1">Status :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} >{data?.status ? data?.status : "--"}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">End Date :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} >
                    {
                      data?.endDate ? moment(data?.endDate).format('lll') : "--"
                    }
                  </Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Priority :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} >{data?.priority ? data?.priority : "--"}</Typography>
                </Grid>
                {
                  <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                    <Typography variant="body1">Related To {data?.relatedTo} :</Typography>
                    {
                      data?.relatedTo === "Lead" ?
                        <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.related ? data?.related : "--"}</Typography>
                        :
                        <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.related ? data?.related : "--"}</Typography>

                    }
                  </Grid>
                }

              </Grid>
            </Grid>
          </Box>
        </Card>
      )}

    </div>
  )
}

export default Overview

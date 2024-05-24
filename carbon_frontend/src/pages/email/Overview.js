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
        <Box style={{ borderTop: "1px solid", borderTopColor: Palette.grey[400], display: 'flex', justifyContent: 'center', paddingBottom: "70px" }}>
          <span className="loader" />
        </Box>
      ) : (
        <Box mt="0px" style={{ borderTop: "1px solid", borderTopColor: Palette.grey[400] }} p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Sender :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.senderName ? data?.senderName : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Subject :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.subject ? data?.subject : "--"}</Typography>
              </Grid>

              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">CreateOn :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {moment(data?.createdOn).format('lll')}
                </Typography>
              </Grid>

            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Receiver :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.receiver ? data?.receiver : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Created by :</Typography>
                {
                  data?.createdUser ?
                    <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>
                      {data?.createdUser}
                    </Typography>
                    :
                    <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>
                      '--'
                    </Typography>
                }
              </Grid>
              {
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Related To {data?.relatedTo === "Lead" ? 'Lead' : 'Contact'} :</Typography>
                  {
                    data?.relatedTo === "Lead" ?
                      <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.related ? data?.related : '--'}</Typography>
                      :
                      <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.related ? data?.related : '--'}</Typography>
                  }
                </Grid>
              }
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: "16px", paddingTop: "16px" }}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }}>
                <Typography variant="body1">Message :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} style={{ paddingBottom: "16px" }}>
                  <span dangerouslySetInnerHTML={{ __html: data?.message ? data?.message : data?.html ? data.html : "--" }} />
                </Typography>
              </Grid>
            </Grid>

          </Grid>
        </Box>
      )}

    </div>
  )
}

export default Overview

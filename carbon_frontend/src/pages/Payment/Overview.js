import { Box, Card, Grid, Typography } from '@mui/material'
import Palette from '../../theme/palette'

const Overview = ({ data, setUserAction, isLoading }) => {

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
                  <Typography variant="body1">First Name :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{`${data?.firstName ? data?.firstName : '--'}`}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Last Name :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{`${data?.lastName ? data?.lastName : '--'}`}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Account Number :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.accountNo ? data?.accountNo : '--'}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Checkout Request Id :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.checkoutRequestId ? data?.checkoutRequestId : "--"}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Phone Number:</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.senderPhoneNumber ? data?.senderPhoneNumber : '--'}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                  <Typography variant="body1">Customer Message:</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.customerMessage ? data?.customerMessage : "--"}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Email :</Typography>
                  <Typography variant="body2" color={Palette.primary.main} style={{ cursor: "pointer" }}>{data?.emailAddress ? data?.emailAddress : "--"}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Status :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.status ? data?.status : '--'}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Order Id :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.orderId ? data?.orderId : '--'}</Typography>
                </Grid>
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">Amount :</Typography>
                  <Typography variant="body2" color={Palette.grey[600]}>{data?.amount ? data?.amount : '--'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}

    </div>
  )
}

export default Overview

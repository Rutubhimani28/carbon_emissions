
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionButtonTwo from '../../components/ActionButtonTwo';
import AddCall from '../../components/call/Addcalls';
import AddMeeting from '../../components/meeting/Addmeetings';
import AddTask from '../../components/task/AddTask';
import { fetchCalendarData } from '../../redux/slice/calendarSlice';


const Calendar = () => {
    const [userAction, setUserAction] = useState(null)
    const [openTask, setOpenTask] = useState(false);
    const [openMeeting, setOpenMeeting] = useState(false);
    const [openCall, setOpenCall] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data, isLoading } = useSelector((state) => state?.calendarDetails)

    // open task model
    const handleOpenTask = () => setOpenTask(true);
    const handleCloseTask = () => setOpenTask(false);

    // open meeting model
    const handleOpenMeeting = () => setOpenMeeting(true);
    const handleCloseMeeting = () => setOpenMeeting(false);

    // open call model
    const handleOpenCall = () => setOpenCall(true);
    const handleCloseCall = () => setOpenCall(false);


    const handleDateSelect = (selectInfo) => {
        handleCloseTask();
    };

    const handleEventClick = (clickInfo) => {
        if (clickInfo.event.url) {
            clickInfo.jsEvent.preventDefault();
            window.open(clickInfo.event.url);
        }
        if (clickInfo?.event?._def?.groupId === 'task') {
            navigate(`/dashboard/task/view/${clickInfo?.event?._def?.publicId}`)
        } else if (clickInfo?.event?._def?.groupId === 'meeting') {
            navigate(`/dashboard/meeting/view/${clickInfo?.event?._def?.publicId}`)
        } if (clickInfo?.event?._def?.groupId === 'call') {
            navigate(`/dashboard/call/view/${clickInfo?.event?._def?.publicId}`)
        }
    };

    const renderEventContent = (eventInfo) => (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );

    useEffect(() => {
        dispatch(fetchCalendarData());
    }, [userAction])

    return (
        <div>
            {/* Add Task Model */}
            <AddTask open={openTask} handleClose={handleCloseTask} setUserAction={setUserAction} lead='lead' contact='contact' />


            {/* Add Meeting Model */}
            <AddMeeting open={openMeeting} handleClose={handleCloseMeeting} setUserAction={setUserAction} />

            {/* Add Call Model */}
            <AddCall open={openCall} handleClose={handleCloseCall} setUserAction={setUserAction} />

            <Container maxWidth>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4">
                        Calendar
                    </Typography>
                    <ActionButtonTwo
                        handleOpenTask={handleOpenTask}
                        handleOpenMeeting={handleOpenMeeting}
                        handleOpenCall={handleOpenCall}
                    />
                </Stack>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', height: "600px" }}>
                        <span className="loader" />
                    </div>
                ) : (<>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h4" style={{ opacity: "0" }}>
                            d
                        </Typography>
                        <Box display="flex" alignItems={"center"}>
                            <Typography variant="body2" style={{ marginLeft: "20px", display: "flex", alignItems: "center" }} >
                                <FiberManualRecordIcon style={{ fontSize: "10px", marginRight: "5px", color: "green" }} />
                                <span>Call</span>
                            </Typography>
                            <Typography variant="body2" style={{ marginLeft: "20px", display: "flex", alignItems: "center" }} >
                                <FiberManualRecordIcon style={{ fontSize: "10px", marginRight: "5px", color: "red" }} />
                                <span>Meeting</span>
                            </Typography>
                            <Typography variant="body2" style={{ marginLeft: "20px", display: "flex", alignItems: "center" }} >
                                <FiberManualRecordIcon style={{ fontSize: "10px", marginRight: "5px", color: "#3788d8" }} /><span>Task</span>
                            </Typography>

                        </Box>
                    </Stack>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        minHeight="400px"
                        height="600px"
                        events={data}

                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        eventClick={handleEventClick}
                        select={handleDateSelect}
                        eventContent={renderEventContent}
                        views={{
                            listWeek: { buttonText: 'List' },
                            multiMonthFourMonth: {
                                type: 'multiMonth',
                                buttonText: 'multiMonth',
                                duration: { months: 4 },
                            }
                        }}
                        buttonText={{
                            today: 'Today',
                            dayGridMonth: 'Month',
                            timeGridWeek: 'Week',
                            timeGridDay: 'Day',
                        }}
                        eventClassNames="custom-fullcalendar"
                    />
                </>
                )}

            </Container>
        </div>
    );

};

export default Calendar;

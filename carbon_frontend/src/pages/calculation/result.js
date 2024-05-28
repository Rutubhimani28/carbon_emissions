import { Button, Card, Container } from '@mui/material';
import { useState } from 'react';
import SendMail from './sendMail';

const Result = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Container maxWidth>
                <Card style={{ padding: "5px" }}>
                    <h1>Result</h1>
                    <Button variant='outlined' onClick={() => setOpen(true)}>Send Mail</Button>
                    <SendMail open={open} close={() => setOpen(false)} />
                </Card>
            </Container>
        </div>
    )
}

export default Result

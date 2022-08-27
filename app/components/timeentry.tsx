import { Box, Grid, useMantineTheme } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
//import { RichTextEditor } from '@mantine/rte';

//import { Form } from "@remix-run/react";
import { useState } from "react";

const data = {
    id: 1,
    timeLog: [
            {
            start: 4,
            end: 5,}
        ],
    matter: 'Task 1',
    desc: '',
}

export default function TimeEntry () {
    const theme = useMantineTheme()
    const [err, setErr] = useState("")
    const [value, onChange] = useState('<p>Rich text editor content</p>');
    return (
        <Box style={{width: "100%"}}>
            <form method="post">
            <Grid sx={{ }} >
                <Grid.Col span={2} sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[0], }}>
                    <p>TIME</p>
                    <TimeInput name="start" label="Start" value={new Date()} format="12"/>
                    <TimeInput name="end" label="End" format="12" error={err}/>

                </Grid.Col>
                <Grid.Col span={8} sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[0], }}>
                    <p>{data.matter}</p>
                    
                    
                    

                </Grid.Col>
                <Grid.Col span={2} sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.green[0], }}>
                    <p>TOTAL</p>
                    <p>{}</p>

                </Grid.Col>

            </Grid>
            </form>

        </Box>
    )
}
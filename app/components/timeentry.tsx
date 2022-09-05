import { Autocomplete, Box, Grid, NumberInput, Textarea, Title, useMantineTheme } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import RichTextEditor from "@mantine/rte";
import dayjs from "dayjs";
//import { RichTextEditor } from '@mantine/rte';

//import { Form } from "@remix-run/react";
import { useState } from "react";
import { ClientOnly } from "remix-utils";


export default function TimeEntry ({log, entry, updateEntry}) {
    console.table(entry)
    const beginning = dayjs(log?.start)
    const ending = dayjs(log?.end)
    const total = ending.diff(beginning, 'minutes')
    
    const theme = useMantineTheme()
    const [err, setErr] = useState("")
    const [value, setValue] = useState(entry.matter);

    function updateMatter (e) {
        const item = {...entry, ...e}
        updateEntry(item)
    }

    
    return (
        <Box style={{width: "100%", marginBottom: "10px", border: "1%", borderColor: "bisque", borderWidth: '3%'}}>
            <Title>{}</Title>
            <form method="post">
            <Grid sx={{ }} >
                <Grid.Col span={2} sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[0], }}>
                    <p>TIME</p>
                    <TimeInput name="start" label="Start" defaultValue={new Date(log.start)}/>
                    <TimeInput name="end" label="End" format="12" error={err} defaultValue={new Date(log?.end)}/>

                </Grid.Col>
                <Grid.Col span={8} sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[0], }}>
                    <Autocomplete 
                        data={['One', 'Two']}
                        label={'Matter'}
                        defaultValue={value}
                        onChange={setValue}
                        onBlur={(e) => updateMatter({matter: e.target.value})}
                        />
                        <Textarea
      placeholder="Description"
      label="Work Done"
      defaultValue={entry.desc}
      onChange={(e) => e}
      onBlur={(e) => updateMatter({desc: e.target.value})}
    />
                    
                    
                    

                </Grid.Col>
                <Grid.Col span={2} sx={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.green[0], }}>
                    <p>TOTAL</p>
                    
                    <NumberInput
      label="Total"
      defaultValue={total}
      precision={1}
      min={-1}
      step={0.01}
      max={24*60}
    />

                </Grid.Col>

            </Grid>
            </form>

        </Box>
    )
}
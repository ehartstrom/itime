import { Center, Container, Stack } from "@mantine/core";
import dayjs from "dayjs";

const data = [
    1,
    2,
    3,
    7,
    8,
    10
]

export default function Tomorrow () {
    const [gaps, steps] = findGaps(data, 1)
    var duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)
    var x = dayjs()
    var y = dayjs().minute(0)
    var diffr = dayjs.duration(x.diff(y))
    return (
        <Container>
            <Center>
                <Stack>
                <p>{JSON.stringify(data)}</p>
                <hr />
                <p>{gaps}</p>
                <p>{steps}</p>
                <p>{JSON.stringify(diffr)}</p>
                <p>{x.diff(y, "minutes")}</p>
                </Stack>
            </Center>
        </Container>
    )
}

function findGaps (list, step) {
    let gaps = []
    let steps = []
    list.forEach((element, index, l) => {
        if (index === l.length -1) return // reached end
        //console.log('length: ', l.length, ' index: ', index)
        if (element + step !== l[index + 1])  return (
            gaps.push([element + step, l[index + 1] - step]),
            steps.push([element, l[index +1 ]]))
       
    });
    //console.table(gaps)
    return [steps, gaps]
}
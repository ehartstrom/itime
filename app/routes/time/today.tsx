import { Center, Container, Text, Timeline } from "@mantine/core";
import { createCookie, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
} from "@tabler/icons";

import  dayjs from 'dayjs'
import TimeEntry from "~/components/timeentry";
import { getUserTZ } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  //const userId = await requireUserId(request);
  const utz = await getUserTZ(request)
  //const noteListItems = await getNoteListItems({ userId });
  return json({ utz });
};



export default function TimePage() {
  
  return (
    <Container>
      <Center>
        <TimeEntry />
      </Center>
    </Container>
  );
}

function TimeBullet () {
  const data = useLoaderData();
  const userOffset = data.utz - 120 // perform math function types variable?  also, two hours off
  const now = new Date()
  const offset = new Date().getTimezoneOffset();

  var utc = require('dayjs/plugin/utc')
  //var timezone = require('dayjs/plugin/timezone')

  // var userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
  // console.log('tz: ', userTZ, ' offset: ', offset)

  const bbb = 123

  dayjs.extend(utc)
  //dayjs.extend(timezone)
  const rendertime = dayjs.utc(now).utcOffset(userOffset, false).format('h:mm a') // set to false to show correct time
  // const origtime = dayjs.utc(now).format('h:mm a')
  //console.log('time: ', rendertime)

  //Set-Cookie: yummy_cookie=choco
  //const cookie_utz = createCookie(userTZ);
  //dayjs.tz(now, Intl.DateTimeFormat().resolvedOptions().timeZone).format('h:mm a')}{' offset: '}{offset}
  
  return (
    <p><b>{rendertime}{' orig time: '}{}{' offset: '}{}</b></p>
    
  )
}

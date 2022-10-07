import { Box, Center, Container, Space, Stack, Text, Timeline } from "@mantine/core";
import { createCookie, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
} from "@tabler/icons";

import  dayjs from 'dayjs'
import { useMemo, useState } from "react";
import TimeEntry from "~/components/timeentry";
import { getUserTZ } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  //const userId = await requireUserId(request);
  const utz = await getUserTZ(request)
  //const noteListItems = await getNoteListItems({ userId });
  return json({ utz });
};


const data2 = {
  logs: [
    {
      id: 1,
      start: dayjs().hour(8).minute(0).toISOString(),
      end: dayjs().hour(9).toISOString(),
      entry: 'a'
    },
    {
      id: 2,
      start: dayjs().hour(10).minute(5).toISOString(),
      end: dayjs().hour(11).toISOString(),
      entry: 'b'
    },
    {
      id: 3,
      start: dayjs().hour(12).minute(10).toISOString(),
      end: dayjs().hour(13).toISOString(),
      entry: 'b'
    }
  ],
  entry: [
    {
      id: 'a',
      matter: 'Project 1',
      desc: 'workedy workedy'

    },
    {
      id: 'b',
      matter: 'Project 2',
      desc: 'bleh'

    }

  ]
}


export default function TimePage() {
  //console.table(data2.logs)
  // const logs = data2?.logs
  // const entry = data2?.entry

  const [logs, setLogs] = useState(data2.logs)
  const [entry, setEntry] = useState(data2.entry)
  const [list, setList] = useState(
    logs.map(l =>  {
      const e = entry.find(v => v.id === l.entry)
      return {...l, entry: e}
    })
  )

  function updateLog (update) {
    
    const newList = list.map(l =>  {
      const e = l.entry//entry?.find(v => v.matter === l.entry?.id)
      if (l.id == update.id) {
      return {...update, entry: e}}
      else {
        return l//{...l, entry: e}
      }
     })
    setList( newList )
  }


  function updateList (update) {
    // console.log('update')
    // console.table(list)
    // console.log(update)
    const newList = list.map(l =>  {
      //const e = entry?.find(v => v.matter === l.entry?.id)
      if (l.entry?.id == update.id) {
      return {...l, entry: update}}
      else {
        return l//{...l, entry: e}
      }
     })
    setList( newList )
  }

  function ListDisplay () {
    return (
      <>
    {list.map(l =>  {
      // const e = entry.find(v => v.id === l.entry)
      // const data = {...l, entry: e}
      
      return (
      <Center key={l.id}>
      <TimeEntry  log={l} entry={l.entry} updateEntry={updateList} updateLog={updateLog} matters={data2.entry}/> 
      </Center>
      )
    }  )}
    </>
    )
  }

  

  

  return (
    <Container>
      
        
        {<ListDisplay/>}
        
        
        <TimeEntry updateEntry={updateList} updateLog={updateLog} matters={data2.entry}/>
        {JSON.stringify(entry)}
       
      
      
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

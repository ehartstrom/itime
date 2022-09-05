import { Box, Center, Container, SimpleGrid, Title } from "@mantine/core";
import { ClientOnly } from "remix-utils";

/* 
gen two or more layers of rows of numbers
total at top
current selected total at bottom
session: time per prob, percentage right/wrong, number of solutions reached
side controls: solving for: 10, 100, random 2, 3, 4, or 4+; and number of numbers in problem: 2 to 5?

Math.floor(Math.random() * (max - min + 1)) + min);
*/
function getRandNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Numbers () {
    const min = 1
    const max = 10
    const rows = 2
    const cols = 3
    const goal = 10

    // attempt two - gen rand #s for one row, make second row based on first row and scramble colums
    // determine how many right answers should be available - all rows or only one right answer?

    const row1 = Array.from({
        length: cols
    }, () => getRandNum(min, max-min))

    const row2 = row1.map((n) => max - n)


    // attempt one

    const arr = Array.from({
        length: 10
    }, () => getRandNum(min, max))
    const fixer = getRandNum(1, 3) // pick which num to fix as the 'answer'
    const base = Array.from({
        length: rows
        }, () => getRandNum(min, cols)) // get random element from options
    
    //const displayRows = for (let)
    // [row1: [col1, col2, col3]]

    
    let nums = Array(rows).fill().map(() => Array.from({
        length: cols
        }, () => getRandNum(min, max))
        
    )
        // does [o,o] + [1,0] === answer?  return true and stop
    let solutions = nums.map((row) => {
        row.map((cell) => {  //0,0
            // map over next row up, check if we're at the top, and if so compare total to goal
            // do i need to check if we're at the top?
            //return cell + row[cell + 1] === max
            //[row + 1]
            // next row up, iterate over each cell, check sum
            nums[1].map((uppercell) => {
                //console.log(cell, ' + ', uppercell, ' equals: ',  cell + uppercell)
                if (cell + uppercell == goal) return true
                return false
            })
            
        })
    })
    console.table(solutions)
    console.log(nums[0][0+2])
    console.table(nums)

    let sols:number[][] = [] 
    var r:any;
    //sols.push(1,1)
    var c:any;
    var n: any;
    
    for (r in nums) { //row
        // for (let c = 0; c<nums[0].length; c++) { //cell
        //     console.log(nums[r][c], ' + ', nums[r+1][c], ' goal: ', goal)
        //     if (nums[0][0] + nums[0+1][0] === goal) sols.push( [nums[0][0], nums[0+1][0] ]);
            
        // }
        //sols.push(r)
        for (c in nums[r]) {
            for (n in nums[r+1]) {
                console.log('here!!!!', c, ' + ', n)
                if (nums[r][c] + nums[r+1][n] === goal) sols.push([nums[r][c], nums[r+1][n]])
            }

        }
    }
    // end sol 1


    //let solution = solutions.includes('true')

    return (
        <ClientOnly> 
        {() => (
        <Box>
            <Container>
                <Center>
                <Title>{max.toString()}</Title>
                <p>{JSON.stringify(sols)}</p>
                </Center>
                {nums.map((row) => {
                    return (
                    <SimpleGrid cols={cols} key={'id' + row.toString()}>
                        {row.map((cell) => {

                            return (
                                <div key={'id' + cell.toString()}>
                                    {cell.toString()}
                                </div>
                            )
                        })}
                    </SimpleGrid>
                    )
                })
                }
                <Center>
                    {row1.join(', ')}
                </Center>
                <Center>
                    {row2.join(', ')}
                </Center>
                
                

            </Container>

        </Box>
        )}
        </ClientOnly>
        
    )
}


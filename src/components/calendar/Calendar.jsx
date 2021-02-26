import { useEffect, useState } from 'react';
import axios, { AxiosRespones } from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const initialState = {
    dates: undefined,
    events: [],
    isLoading: true
}

const Calendar = () => {
    const [state, setState] = useState(initialState);

    const datesSet = (dates) => {
        setState((prevState) => {
            return {
                ...prevState,
                dates: dates
            }
        })
    }

    const isLoading = (isLoading) => {
        console.log(isLoading);
        setState((prevState) => {
            return {
                ...prevState,
                isLoading: isLoading
            }
        });
    }
    
    useEffect(() => {
        const getEvents = async () => {
            const startDate = `${state.dates.start.getFullYear()}-${state.dates.start.getMonth() + 1 < 10 ? '0' + (state.dates.start.getMonth() + 1) : state.dates.start.getMonth() + 1}-${state.dates.start.getDate() < 10 ? '0' + state.dates.start.getDate() : state.dates.start.getDate()}`
            const endDate = `${state.dates.end.getFullYear()}-${state.dates.end.getMonth() + 1 < 10 ? '0' + (state.dates.end.getMonth() + 1) : state.dates.end.getMonth() + 1}-${state.dates.end.getDate() < 10 ? '0' + state.dates.end.getDate() : state.dates.end.getDate()}`
            const response = await axios({
                method: 'GET',
                url: `https://statsapi.mlb.com/api/v1/schedule`,
                params: {
                    sportId: 1,
                    startDate: startDate,
                    endDate: endDate
                }
            })
            const games = [];
            let events
            
            for (let date of response.data.dates) {
                for (let game of date.games) {
                    games.push(game);
                }
            }

            events = games.map((game) => {
                return {
                    title: game.teams.home.team.name,
                    start: game.gameDate
                }
            })

            setState((prevState) => {
                return {
                    ...prevState,
                    events: events,
                }
            })
        }

        if (state.dates !== undefined) {
            getEvents();
        }
    }, [state.dates]);

    return (
        <div>
            {state.isLoading &&
                <div>
                    Loading...
                </div>
            }
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                datesSet={datesSet}
                events={state.events}
                loading={isLoading}
            />
        </div>
    )
}

export default Calendar
import React, {Fragment} from 'react';
import MaterialTable from 'material-table';
import NavBar from "../nav-bar/navigationBar";
import {Paper} from "@material-ui/core";
import Logo from  "./avatar.png"

export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Event Name', field: 'name' },
            { title: 'Venue ', field: 'name' },
            { title: 'Date', field: 'eventDate', type: 'numeric' },
            {
                title: 'Time',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Istanbul' },
            },
        ],
        data: [
            { name: 'Medina', surname: 'Zaganjori', birthYear: 1987, birthCity: 63 },
            {
                name: 'Mehmet Yakup',
                surname: 'Bilgic',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    return (
        <Fragment>
            <NavBar/>
            <Paper variant="outlined" style={{backgroundColor:"#b3e5fc", marginLeft: "auto", marginRight: "auto", marginTop: 40, width: 700, height:500, padding: 16 }}>
                <img src={Logo} alt="Example" width="64" height="64"/>
                <MaterialTable
                    title="Menu Events"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />

            </Paper></Fragment>)
}
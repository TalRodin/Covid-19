import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './InfoBox.css'


function InfoBox({title,cases, colorR, isBlue, active, total, ...props}) {
    return (
        <Card 
        onClick={props.onClick}
         className={`infoBox ${active && "infoBox--selected"} ${colorR &&  "infoBox--red"} ${isBlue &&  "infoBox--blue"}`}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
        <h2 className={`infoBox__cases ${ !colorR && !isBlue &&  "infoBox__cases--green"} ${!colorR && isBlue && "infoBox__cases--blue"} `}>{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

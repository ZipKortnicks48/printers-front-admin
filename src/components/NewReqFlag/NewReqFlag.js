import React from "react"
import { Tooltip, Chip } from '@material-ui/core'
export const NewReqFlag = () => {
    return (
        <Tooltip title="Новая заявка без исполнителя">
            <Chip color="secondary" size="small" label="NEW" />
        </Tooltip>)
}
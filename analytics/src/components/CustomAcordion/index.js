import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { camelToTitleCase } from "../../Helper";

const CustomAcordion = ({ issues = [], columns = [], handleIssues }) => {
    console.log("issues", issues);
    console.log("columns", columns);
    const [selectedColumn, setColumn] = React.useState();

    const onAccordionClick = (item) => {
        setColumn(item.field == selectedColumn ? "" : item.field)
    }

    return (
        <div>
            {columns.map((item) => {
                return (
                    <Accordion sx={{ marginLeft: 2 }} expanded={item.field === selectedColumn} onClick={() => onAccordionClick(item)} >
                        <AccordionSummary
                            expandIcon={<GridExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item.headerName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            {issues.length > 0 &&
                                issues?.filter(i => i.typeId == selectedColumn)?.map((el) => (
                                    <Typography onClick={() => handleIssues(el)} style={{ cursor: 'pointer' }}>
                                        {`${el.name} ${camelToTitleCase(el.typeId)}`}
                                    </Typography>
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
};
export default CustomAcordion;

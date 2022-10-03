import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import * as React from "react";

const CustomAcordion = ({ data = [] }) => {

    return (
        <div>
            {data.map((item) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<GridExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item.headerName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
};
export default CustomAcordion;

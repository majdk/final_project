import React from "react";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export default function ErrorPage() {

    return (
        <Grid container >
            <Grid item sm={2} xs={12} />
            <Grid item sm={8} xs={12}>
                <Typography variant="h1" style={{
                    marginTop: "100px",
                    textAlign: "center"
                }}>
                    Page not found!
                </Typography>
            </Grid>
            <Grid item sm={2} xs={12} />
        </Grid>
    );
}

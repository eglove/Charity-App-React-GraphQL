import PleaseSignIn from "../components/PleaseSignIn";
import PermissionsComponent from "../components/Permissions";
import React from "react";

const Permissions = props => (
    <PleaseSignIn>
        <PermissionsComponent/>
    </PleaseSignIn>
);

export default Permissions;
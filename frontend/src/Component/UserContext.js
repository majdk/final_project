// Signed-in user context
import React from "react";

export const UserContext = React.createContext({
    name: 'Guest',
    changeUser: () => {},
});
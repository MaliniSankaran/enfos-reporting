import { useEffect, useState } from "react";
import type { Report } from "./types/Report";
import { getReports } from "./services/reportService";
import {getUsers} from "./services/userService.ts";
import {getDepartments} from "./services/departmentService.ts";
import {getProjects} from "./services/projectService.ts";

function App() {

    useEffect(() => {
        getReports().then((data) => console.log("Reports:", data));
        getUsers().then((data) => console.log("Users:", data));
        getDepartments().then((data) => console.log("Departments:", data));
        getProjects().then((data) => console.log("Projects:", data));
    }, []);
    return (
        <div>
            <h1>Enfos Reporting Portal</h1>
        </div>
    );
}

export default App;
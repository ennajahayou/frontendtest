import React from 'react';
import { TasksProvider } from './TasksContext';
import CEOProfil from './CEOProfil';
import Archives from './Archives';

const MainComponent = () => {
    return (
        <TasksProvider>
            <CEOProfil />
            <Archives />
        </TasksProvider>
    );
};

export default MainComponent;



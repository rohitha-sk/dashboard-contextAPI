import React, { useContext } from 'react'
import { DashboardContext } from './DashboardProvider';

function useDashboard() {
    const context = useContext(DashboardContext);
    if(!context){
        throw new Error("Error!");
    }else{
        return context;
    }
}

export default useDashboard
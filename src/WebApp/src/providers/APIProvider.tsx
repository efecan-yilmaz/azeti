import { ReactNode, createContext, useContext } from 'react';

import { useIndicator } from './IndicatorProvider';

export type Scoreboard = {
    scoreId: number,
    playerName: string,
    score: number
}

type APIContextType = {
    getScoreBoard: () => Promise<any>,
    addNewScore: (score: Scoreboard) => Promise<any>,
    deleteAll: () => Promise<any>
}


export const APIContext = createContext<APIContextType>({
    getScoreBoard: () => new Promise(() => {}),
    addNewScore: () => new Promise(() => {}),
    deleteAll: () => new Promise(() => {})
});

export const useAPI = () => useContext(APIContext);

type APIProviderProps = {
    children: ReactNode
}

const APIProvider: React.FC<APIProviderProps> = ({children}) => {
    const indicatorContext = useIndicator();

    const getScoreBoard = async () => {
        try {
            indicatorContext.setShowProgress(true);
            const res = await fetch('http://localhost:9001/scoreboard/');
    
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
    
            const data = await res.json();
            indicatorContext.setShowProgress(false);
            return data;
        } catch (error) {
            indicatorContext.setSnackBar({
                show: true, 
                text: `Please check azeti server in port 9001. Error: ${error}`, 
                severity: 'error'
            });
            indicatorContext.setShowProgress(false);
        }
    }    
    
    const addNewScore = async (score: Scoreboard) => {
        try {
            indicatorContext.setShowProgress(true);
            const res = await fetch('http://localhost:9001/scoreboard/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(score)
            });
        
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
        
            const data = await res.json();
            indicatorContext.setShowProgress(false);
            return data;
        } catch (error) {
            indicatorContext.setSnackBar({
                show: true, 
                text: `Please check azeti server in port 9001. Error: ${error}`, 
                severity: 'error'
            });
            indicatorContext.setShowProgress(false);
        }
    }

    const deleteAll = async () => {
        try {
            indicatorContext.setShowProgress(true);
            const res = await fetch('http://localhost:9001/scoreboard/', {
                method: 'DELETE'
            });
        
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
        
            indicatorContext.setShowProgress(false);
            return true;
        } catch (error) {
            indicatorContext.setSnackBar({
                show: true, 
                text: `Please check azeti server in port 9001. Error: ${error}`, 
                severity: 'error'
            });
            indicatorContext.setShowProgress(false);
        }
    
    }
    
    return (
        <APIContext.Provider value={{getScoreBoard, addNewScore, deleteAll}}>
            {children}
        </APIContext.Provider>
    )
}

export default APIProvider

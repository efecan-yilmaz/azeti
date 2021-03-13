import { useState, createContext, useContext, Dispatch, SetStateAction, ReactNode, useEffect } from 'react';

import { Scoreboard } from './APIProvider';

type ScoreboardContextType = {
    scoreboard: Scoreboard[];
    setScoreboard: Dispatch<SetStateAction<never[]>>;
    topScore: Scoreboard | null;
}

export const ScoreboardContext = createContext<ScoreboardContextType>({scoreboard: [], setScoreboard: () => {}, topScore: null});

export const useScoreboard = () => useContext(ScoreboardContext);

type ScoreboardProviderProps = {
    children: ReactNode
}

const ScoreboardProvider: React.FC<ScoreboardProviderProps> = ({children}) => {
    const [scoreboard, setScoreboard] = useState([]);
    const [topScore, setTopScore] = useState<Scoreboard | null>(null);

    useEffect(() => {
        setTopScore(prevTopScore => scoreboard[0]);
    }, [scoreboard]);

    return (
        <ScoreboardContext.Provider value={{scoreboard, setScoreboard, topScore}}>
            {children}
        </ScoreboardContext.Provider>
    )
}

export default ScoreboardProvider;
import './App.css';

import ScoreboardProvider from './providers/ScoreboardProvider';
import IndicatorProvider from './providers/IndicatorProvider';
import APIProvider from './providers/APIProvider';
import GameUI from './components/GameUI';
import Scoreboard from './components/Scoreboard';
import Progress from './components/Progress';
import SnackBar from './components/SnackBar';

function App() {
  return (
    <IndicatorProvider>
        <APIProvider>
            <ScoreboardProvider>
                <Progress />
                <SnackBar />
                <div className="App">
                    <GameUI />
                    <Scoreboard />
                </div>
            </ScoreboardProvider>
        </APIProvider>
    </IndicatorProvider>
  );
}

export default App;

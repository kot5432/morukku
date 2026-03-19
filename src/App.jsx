import React from 'react';
import { useMolkkyGame } from './hooks/useMolkkyGame';
import { SetupScreen } from './components/SetupScreen';
import { ScoreInputScreen } from './components/ScoreInputScreen';
import { ScoreDisplayScreen } from './components/ScoreDisplayScreen';
import { ResultScreen } from './components/ResultScreen';
import { OrientationWrapper } from './components/OrientationWrapper';

function App() {
  const game = useMolkkyGame();

  if (game.status === 'setup') {
    return <SetupScreen onStart={game.startGame} />;
  }

  if (game.status === 'playing') {
    return (
      <OrientationWrapper
        portraitComponent={<ScoreInputScreen game={game} onScore={game.addScore} onUndo={game.undo} />}
        landscapeComponent={<ScoreDisplayScreen game={game} />}
      />
    );
  }

  return (
    <ResultScreen
      game={game}
      onNext={game.nextSet}
      onReset={game.resetGame}
    />
  );
}

export default App;

import React from 'react';

export function ScoreDisplayScreen({ game }) {
    const team1 = game.teams[0];
    const team2 = game.teams[1];

    return (
        <div className="flex flex-col h-full w-full justify-center items-center" style={{ padding: '20px' }}>
            <div className="text-2xl font-bold" style={{ color: 'var(--gray-dark)', marginBottom: '10px' }}>
                第{game.currentSet}セット
            </div>

            <div className="flex w-full space-between items-center flex-1" style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Team 1 */}
                <div className="flex-col items-center justify-center w-full" style={{ display: 'flex', flex: 1 }}>
                    <div className="text-3xl font-bold text-center" style={{ color: game.currentTurnId === team1.id ? 'var(--primary-color)' : 'var(--text-color)' }}>
                        {team1.name} {game.currentTurnId === team1.id ? '🎯' : ''}
                    </div>
                    <div className="font-bold" style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', margin: '10px 0', lineHeight: 1 }}>{team1.score}</div>
                    <div className="text-3xl font-bold" style={{ color: 'var(--danger-color)' }}>
                        ミス: {team1.misses === 0 ? 'なし' : 'X '.repeat(team1.misses).trim()}
                    </div>
                    <div className="text-xl font-bold" style={{ marginTop: '15px' }}>{team1.setsWon} セット取得</div>
                </div>

                <div className="text-4xl font-bold" style={{ color: 'var(--gray-light)', margin: '0 20px' }}>VS</div>

                {/* Team 2 */}
                <div className="flex-col items-center justify-center w-full" style={{ display: 'flex', flex: 1 }}>
                    <div className="text-3xl font-bold text-center" style={{ color: game.currentTurnId === team2.id ? 'var(--primary-color)' : 'var(--text-color)' }}>
                        {team2.name} {game.currentTurnId === team2.id ? '🎯' : ''}
                    </div>
                    <div className="font-bold" style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', margin: '10px 0', lineHeight: 1 }}>{team2.score}</div>
                    <div className="text-3xl font-bold" style={{ color: 'var(--danger-color)' }}>
                        ミス: {team2.misses === 0 ? 'なし' : 'X '.repeat(team2.misses).trim()}
                    </div>
                    <div className="text-xl font-bold" style={{ marginTop: '15px' }}>{team2.setsWon} セット取得</div>
                </div>

            </div>
        </div>
    );
}

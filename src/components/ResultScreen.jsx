import React from 'react';
import { Button } from './Button';

export function ResultScreen({ game, onNext, onReset }) {
    const isGameEnd = game.status === 'game_finished';

    const team1 = game.teams[0];
    const team2 = game.teams[1];

    let setWinner = null;
    let reason = '';

    if (team1.score === 50) { setWinner = team1; reason = '50点到達！'; }
    else if (team2.score === 50) { setWinner = team2; reason = '50点到達！'; }
    else if (team1.misses >= 3) { setWinner = team2; reason = `${team1.name}が3連続ミス`; }
    else if (team2.misses >= 3) { setWinner = team1; reason = `${team2.name}が3連続ミス`; }

    if (isGameEnd) {
        if (team1.setsWon >= 2) setWinner = team1;
        if (team2.setsWon >= 2) setWinner = team2;
        reason = '2セット先取で優勝！';
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center" style={{ padding: '20px' }}>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--success-color)', marginBottom: '1rem' }}>
                {isGameEnd ? '試合終了' : `第${game.currentSet}セット 終了`}
            </h1>

            {setWinner && (
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <div className="text-3xl font-bold" style={{ marginBottom: '0.5rem' }}>{setWinner.name} の勝利！</div>
                    <div className="text-xl font-bold" style={{ color: 'var(--danger-color)' }}>{reason}</div>
                </div>
            )}

            {/* 運営向け管理用スコア */}
            <div className="w-full text-center" style={{ maxWidth: '600px', backgroundColor: 'var(--gray-light)', borderRadius: '12px', padding: '20px', marginBottom: '2rem' }}>
                <h2 className="text-xl font-bold" style={{ marginBottom: '1rem', color: 'var(--gray-dark)' }}>運営管理用 スコア</h2>
                <div className="text-3xl font-bold" style={{ marginBottom: '1rem' }}>
                    {team1.name} <span style={{ color: 'var(--primary-color)' }}>{team1.score}</span> : <span style={{ color: 'var(--primary-color)' }}>{team2.score}</span> {team2.name}
                </div>
                <div className="text-xl font-bold">
                    セット取得: {team1.name} ({team1.setsWon}) - {team2.name} ({team2.setsWon})
                </div>
            </div>

            <div className="flex" style={{ gap: '20px' }}>
                {!isGameEnd && (
                    <Button onClick={onNext} className="text-2xl" style={{ padding: '20px 40px' }}>次のセットへ</Button>
                )}
                {isGameEnd && (
                    <Button onClick={onReset} className="text-2xl" style={{ padding: '20px 40px' }}>新しく試合を始める</Button>
                )}
            </div>
        </div>
    );
}

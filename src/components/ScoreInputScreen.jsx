import React from 'react';
import { Button } from './Button';

export function ScoreInputScreen({ game, onScore, onUndo }) {
    const currentTeam = game.teams.find(t => t.id === game.currentTurnId);
    const otherTeam = game.teams.find(t => t.id !== game.currentTurnId);

    return (
        <div className="flex flex-col h-full w-full" style={{ padding: '20px' }}>
            <div className="flex space-between items-center w-full" style={{ marginBottom: '10px' }}>
                <div className="text-xl font-bold">第{game.currentSet}セット</div>
                <Button variant="outline" onClick={onUndo} disabled={game.history.length === 0} style={{ padding: '8px 16px', fontSize: '1rem' }}>
                    1手戻る
                </Button>
            </div>

            <div className="flex-col items-center flex-1 w-full" style={{ display: 'flex' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--gray-dark)' }}>{currentTeam.name} のターン</div>
                <div className="text-5xl font-bold" style={{ margin: '15px 0', color: 'var(--primary-color)' }}>{currentTeam.score}点</div>

                <div className="text-xl font-bold" style={{ color: 'var(--danger-color)', marginBottom: '15px' }}>
                    ミス: {currentTeam.misses === 0 ? 'なし' : 'X '.repeat(currentTeam.misses).trim()}
                </div>

                {/* 相手チームのスコア表示 */}
                <div className="flex space-between w-full" style={{ padding: '15px', backgroundColor: 'var(--gray-light)', borderRadius: '12px', marginBottom: 'auto', maxWidth: '350px' }}>
                    <span className="font-bold text-xl">{otherTeam.name}</span>
                    <span className="font-bold text-xl" style={{ color: 'var(--gray-dark)' }}>{otherTeam.score}点</span>
                </div>

                {/* キーパッド部分 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%', maxWidth: '350px', marginTop: '20px' }}>
                    <Button variant="danger" style={{ gridColumn: 'span 3', padding: '20px', fontSize: '1.5rem' }} onClick={() => onScore(0)}>
                        ミス (ー)
                    </Button>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                        <Button key={num} variant="keypad" onClick={() => onScore(num)}>{num}</Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

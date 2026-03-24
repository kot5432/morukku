import React, { useState } from 'react';
import { Button } from './Button';

export function SetupScreen({ onStart }) {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');

    return (
        <div className="flex flex-col h-full items-center justify-center p-4" style={{ padding: '20px' }}>
            <h1 className="text-3xl font-bold" style={{ marginBottom: '2rem' }}>モルック採点アプリ</h1>

            <div className="w-full" style={{ maxWidth: '400px' }}>
                <div className="flex flex-col" style={{ marginBottom: '1.5rem' }}>
                    <label className="font-bold text-xl" style={{ marginBottom: '0.5rem' }}>先攻チーム名</label>
                    <input
                        type="text"
                        placeholder="ここをタップして入力"
                        value={team1}
                        onChange={e => setTeam1(e.target.value)}
                        style={{
                            padding: '16px',
                            fontSize: '1.25rem',
                            borderRadius: '12px',
                            border: '2px solid var(--gray-light)',
                            outline: 'none',
                            width: '100%'
                        }}
                    />
                </div>

                <div className="flex flex-col" style={{ marginBottom: '2.5rem' }}>
                    <label className="font-bold text-xl" style={{ marginBottom: '0.5rem' }}>後攻チーム名</label>
                    <input
                        type="text"
                        placeholder="ここをタップして入力"
                        value={team2}
                        onChange={e => setTeam2(e.target.value)}
                        style={{
                            padding: '16px',
                            fontSize: '1.25rem',
                            borderRadius: '12px',
                            border: '2px solid var(--gray-light)',
                            outline: 'none',
                            width: '100%'
                        }}
                    />
                </div>

                <Button className="w-full text-xl" style={{ padding: '20px' }} onClick={() => onStart(team1, team2)}>
                    試合開始
                </Button>
            </div>
        </div>
    );
}

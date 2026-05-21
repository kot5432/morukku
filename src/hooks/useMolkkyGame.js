import { useState, useCallback } from 'react';

export function useMolkkyGame() {
    const [gameState, setGameState] = useState({
        teams: [
            { id: 1, name: '先攻チーム', score: 0, misses: 0, setsWon: 0, lastPoints: null },
            { id: 2, name: '後攻チーム', score: 0, misses: 0, setsWon: 0, lastPoints: null }
        ],
        currentTurnId: 1,
        currentSet: 1,
        status: 'setup', // setup, playing, set_finished, game_finished
        history: []
    });

    const startGame = useCallback((name1, name2) => {
        setGameState({
            teams: [
                { id: 1, name: name1 || '先攻チーム', score: 0, misses: 0, setsWon: 0, lastPoints: null },
                { id: 2, name: name2 || '後攻チーム', score: 0, misses: 0, setsWon: 0, lastPoints: null }
            ],
            currentTurnId: 1,
            currentSet: 1,
            status: 'playing',
            history: []
        });
    }, []);

    const addScore = useCallback((points) => {
        setGameState(prev => {
            if (prev.status !== 'playing') return prev;

            const newTeams = prev.teams.map(t => ({ ...t }));
            const tIdx = newTeams.findIndex(t => t.id === prev.currentTurnId);
            const oIdx = tIdx === 0 ? 1 : 0;

            const team = newTeams[tIdx];
            const otherTeam = newTeams[oIdx];

            team.lastPoints = points;

            if (points === 0) {
                team.misses += 1;
            } else {
                team.misses = 0;
                team.score += points;
            }

            let nextStatus = 'playing';

            if (team.score > 50) {
                team.score = 25;
            } else if (team.score === 50) {
                team.setsWon += 1;
                nextStatus = 'set_finished';
            }

            // 3回ミスで相手チームが50点となりセット勝利
            if (team.misses >= 3) {
                team.score = 0;
                team.misses = 0;
                otherTeam.score = 50;
                otherTeam.setsWon += 1;
                nextStatus = 'set_finished';
            }

            // ゲーム終了判定（2セット先取）
            if (team.setsWon >= 2 || otherTeam.setsWon >= 2) {
                nextStatus = 'game_finished';
            }

            return {
                ...prev,
                teams: newTeams,
                status: nextStatus,
                currentTurnId: nextStatus === 'playing' ? otherTeam.id : prev.currentTurnId,
                history: [...prev.history, prev]
            };
        });
    }, []);

    const nextSet = useCallback(() => {
        setGameState(prev => {
            if (prev.status !== 'set_finished') return prev;

            const newTeams = prev.teams.map(t => ({
                ...t,
                score: 0,
                misses: 0,
                lastPoints: null
            }));

            const newSet = prev.currentSet + 1;
            // 偶数セットはチーム2からスタート
            const nextTurnId = newSet % 2 === 0 ? 2 : 1;

            return {
                ...prev,
                teams: newTeams,
                currentSet: newSet,
                currentTurnId: nextTurnId,
                status: 'playing'
            };
        });
    }, []);

    const resetGame = useCallback(() => {
        setGameState({
            teams: [
                { id: 1, name: '先攻チーム', score: 0, misses: 0, setsWon: 0, lastPoints: null },
                { id: 2, name: '後攻チーム', score: 0, misses: 0, setsWon: 0, lastPoints: null }
            ],
            currentTurnId: 1,
            currentSet: 1,
            status: 'setup',
            history: []
        });
    }, []);

    const undo = useCallback(() => {
        setGameState(prev => {
            if (prev.history.length === 0) return prev;
            return prev.history[prev.history.length - 1];
        });
    }, []);

    return {
        ...gameState,
        startGame,
        addScore,
        nextSet,
        resetGame,
        undo
    };
}

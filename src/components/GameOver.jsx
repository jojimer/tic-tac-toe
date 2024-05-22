export default function GameOver({winner,rematch}) {
    const message = (typeof winner === 'boolean') ? 'Draw!' : winner.name + ' won!';

    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{message}</p>
            <p><button onClick={rematch}>Rematch!</button></p>
        </div>
    )
}
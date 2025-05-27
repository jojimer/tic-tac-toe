import { ResetButton } from './ResetButton';

export default function GameOver({winner}) {
    const message = (winner.name == undefined) ? 'Draw!' : winner.name + ' won!';

    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{message}</p>
            <ResetButton>Rematch!</ResetButton>
        </div>
    )
}
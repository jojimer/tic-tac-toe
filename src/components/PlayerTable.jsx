export default function PlayerTable(){
    return (
        <div id="player-table">
            <div className="overflow-x-auto border border-base-content/5">
                <table className="table table-lg">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Rounds</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>x</th>
                        <td>Cy Ganderton</td>
                        <td className="round-result-wrap"><span className="round-result">x</span><span className="round-result"></span></td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>o</th>
                        <td>Hart Hagerty</td>
                        <td className="round-result-wrap"><span className="round-result"></span><span className="round-result">o</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
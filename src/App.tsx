import React, {ChangeEvent} from 'react';
import './App.css';

// type PlayerData = {
//     pairIndex: number,
//     name: string,
//     playedTables: number[]
// }

type PairsData = {
    pairIndex: number,
    firstPlayerName: string;
    secondPlayerName: string;
    playedTables: number[]
}

type Props = {

};

type State = {
    tableCount: number,
    pairsData: PairsData[];
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tableCount: 0,
            pairsData: [],
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevState.tableCount !== this.state.tableCount) {
            this.initializePairs();
        }
    }

    onTableCountChanged(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            tableCount: Number.parseInt(event.target.value) || 0,
        })
    }

    onPlayerNameChanged(event: ChangeEvent<HTMLInputElement>, pairIndex: number, isFirst?: boolean) {
        const {pairsData} = this.state;

        let newPairData: PairsData | undefined;

        if (isFirst) {
            newPairData = {
                ...pairsData[pairIndex],
                firstPlayerName: event.target.value,
            }
        } else {
            newPairData = {
                ...pairsData[pairIndex],
                secondPlayerName: event.target.value,
            }
        }

        const updatedData = pairsData;
        updatedData[pairIndex] = newPairData;

        this.setState({
            pairsData: updatedData,
        });
    }

    initializePairs() {
        const pairsData: PairsData[] = [];
        for (let i = 0; i < this.state.tableCount; i++) {
            pairsData.push({
                pairIndex: i,
                firstPlayerName: '',
                secondPlayerName: '',
                playedTables: [],
            })
        }
        this.setState({
            pairsData,
        })
    }

    createPlayersPair(pairIndex: number): React.ReactNode {
        return (
            <div className="players_pair_container">
                <p className="player_name_header">Игрок 1</p>
                <input className={'player_name_input'} type={'text'} value={this.state.pairsData[pairIndex]?.firstPlayerName} onChange={event => this.onPlayerNameChanged(event, pairIndex, true)}/>
                <p className="player_name_header">Игрок 2</p>
                <input className={'player_name_input'} type={'text'} value={this.state.pairsData[pairIndex]?.secondPlayerName} onChange={event => this.onPlayerNameChanged(event, pairIndex)}/>
            </div>
        )
    }

    render() {
        const {tableCount} = this.state;
        const tables: React.ReactNode[] = [];
        for (let i = 0; i < tableCount; i++) {
            tables.push(this.createPlayersPair(i));
        }

        return (
            <div className="App">
                <div className="App-header">
                    <p>
                        Число столов:
                    </p>
                    <input className={'table_count_input'} type={'text'} value={this.state.tableCount.toString()}
                           onChange={(event) => this.onTableCountChanged(event)}/>
                    {tables}
                </div>
            </div>
        );
    }
}

export default App;

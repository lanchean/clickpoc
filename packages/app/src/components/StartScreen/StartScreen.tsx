import * as React from 'react';
import { connect } from 'react-redux';

import { Button } from '@clickopolis/core';

import { turnOnFlag } from 'actions';
// import { StartScreenOptions } from 'components/StartScreenOptions';

import './StartScreen.scss';

export interface StartScreenProps {
    turnOnFlag: turnOnFlag;
}

export interface StartScreenState {
    startScreenOptions: any;
    isStartingNewGame: boolean;
    hasFilledInOptions: boolean;
}

export class StartScreenBase extends React.Component<StartScreenProps, StartScreenState> {
    constructor(props:StartScreenProps) {
        super(props);
        this.state = {
            startScreenOptions: null,
            isStartingNewGame: false,
            hasFilledInOptions: false
        };
    }

    private startNewGame = () => {
        this.props.turnOnFlag('HAS_STARTED_GAME');
    }

    private loadOptions = async () => {
        const { StartScreenOptions } = await import('components/StartScreenOptions');
        await this.setState({ startScreenOptions: <StartScreenOptions />, isStartingNewGame: true });
    }

    public render() {
        return (
            <div className='start-screen'>
                <h1 className='clickopolis-heading'>Clickopolis <img src='./images/icon.png' /></h1>
                { this.state.isStartingNewGame ? null : <Button onClick={this.loadOptions} iconHeight='1rem' icon='./images/plus.svg' className='start-new-game-button' value='Start New Game' /> }
                { this.state.startScreenOptions }
                { this.state.isStartingNewGame ? <Button disabled={!this.state.hasFilledInOptions} className='start-button' onClick={this.startNewGame} icon='./images/icon.png' value='Start!' /> : null }
            </div>
        );
    }
}

export const StartScreen = connect(
    null,
    {
        turnOnFlag
    }
)(StartScreenBase as any);
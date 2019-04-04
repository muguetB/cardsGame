import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import {Button} from '../common'
import axios from 'axios';
import type {Card} from "../types";

const typeOfCards = ['2','3','4','5','6','7','8','9','10', 'JACK', 'QUEEN', 'KING', 'ACE'];

type State = {
    card: Card,
    winner: boolean,
    error: boolean
}

class Game extends PureComponent<{}, State> {

    state = {
        card: {
            code: '',
            image: '',
            suit: '',
            value: ''
        },
        winner: false,
        error: false
    }

    componentWillMount(): void {
        axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then(
            response => {
               this.setState({
                   card: response.data.cards[0],
                   error: false
               })
            })
            .catch(function (error) {
                this.setState({ error: true })
            })
    }

    getNextCard = (cardWillBeBigger: boolean): void => {
        axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then(
                response => {
                    this.checkIfUserWin(response.data.cards[0].value, cardWillBeBigger)
                    this.setState({
                        card: response.data.cards[0],
                        error: false,
                    })
                })
            .catch(function (error) {
                this.setState({ error: true })
            })
    }

    checkIfUserWin = (cardValue: string, cardWillBeBigger: boolean): void => {
        this.setState(prevState => {
            if (cardWillBeBigger) {
                if (this.checkIfNewCardIsBigger(
                    typeOfCards.findIndex(elem => elem === prevState.card.value),
                    typeOfCards.findIndex(elem => elem === cardValue))) {
                    return {winner: true}
                }
            } else {
                if(this.checkIfNewCardIsLower(
                    typeOfCards.findIndex(elem => elem === prevState.card.value),
                    typeOfCards.findIndex(elem => elem === cardValue))) {
                    return {winner: true}
                }
            }
            return {winner: false}
        })
    }

    checkIfNewCardIsBigger = (previousValue: number, currentValue: number): boolean=> {
        return previousValue < currentValue;
    }

    checkIfNewCardIsLower = (previousValue: number, currentValue: number): boolean => {
        return previousValue > currentValue;
    }

    showErrorMessage = (): void => {
        if (this.state.error) {
            return <Text>Sorry we couldn't fetch a new card :(</Text>
        }
    }

    showWinnerMessage = (): void => {
        if (this.state.winner) {
            return  <Text style={styles.information}>You win!!!</Text>
        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.mainView}>
                {this.showErrorMessage()}
                {this.showWinnerMessage()}
                <View style={styles.cardView}>
                    {
                        this.state.card.image !== '' && (
                        <Image
                            style={styles.image}
                            source={{uri: this.state.card.image}}/>
                            )
                    }
                </View>
                <View style={styles.buttonsView}>
                    <Button onPress={() => this.getNextCard(true)} text={'Up'}/>
                    <Button onPress={() => this.getNextCard(false)} text={'Down'}/>
                </View>
            </View>
        )
    }
}

export default Game;

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardView: {
      marginBottom: 10,
      width: 314,
      height: 226,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    buttonsView: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    information: {
        fontSize: 20,
        color: 'red',
        marginVertical: 6
    }
});

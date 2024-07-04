import './style.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import PlayerHand from './components/PlayerHand';
import CenterOfTable from './components/CenterOfTable';
import PlayerBox from './components/PlayerBox';

function App() {

  const [playerOneHand, setPlayerOneHand] = useState()
  const [playerTwoHand, setPlayerTwoHand] = useState()
  const [playerThreeHand, setPlayerThreeHand] = useState()
  const [playerFourHand, setPlayerFourHand] = useState()
  const [selectedCardOne, setSelectedCardOne] = useState()
  const [selectedCardTwo, setSelectedCardTwo] = useState()
  const [centerTable, setCenterTable] = useState()
  const [turn, setTurn] = useState(3)
  const [boxOne, setBoxOne] = useState('outerBox')
  const [boxTwo, setBoxTwo] = useState('outerBox')
  const [boxThree, setBoxThree] = useState('outerBox')
  const [boxFour, setBoxFour] = useState('outerBox')
  const [deckID, setDeckID] = useState()
  const [playerTurn, setPlayerTurn] = useState()
  const [start, setStart] = useState(false)
  const [turnWarning, setTurnWarning] = useState(false)
  const [matchWarning, setMatchWarning] = useState(false)
  const [playerTwo, setPlayerTwo] = useState()
  const [playerThree, setPlayerThree] = useState()
  const [playerFour, setPlayerFour] = useState()
  const [thirdCardClass, setThirdCardClass] = useState('card')
  const [fourthCardClass, setFourthCardClass] = useState('card')
  const [gameStarter, setGameStarter] = useState()

  // Drawing Cards
  const cards = ['AS', 'AD', 'AC', 'AH', '2S', '2D', '2C', '2H', '3S', '3D', '3C', '3H', '4S', '4D', '4C', '4H', '5S', '5D', '5C', '5H', '6S', '6D', '6C', '6H', '7S', '7D', '7C', '7H', '8S', '8D', '8H', '8C', '9S', '9D', '9C', '9H', '0S', '0D', '0C', '0H', 'QD', 'QS', 'QC', 'QH', 'KS']
  const shuffleDeck = async () => {
    const deck = await axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=${cards}`)
    setDeckID(deck.data.deck_id)
    const drawCard = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=45`)
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerOne/add/?cards=${drawCard.data.cards[0].code + ',' + drawCard.data.cards[1].code + ',' + drawCard.data.cards[2].code + ',' + drawCard.data.cards[3].code + ',' + drawCard.data.cards[4].code + ',' + drawCard.data.cards[5].code + ',' + drawCard.data.cards[6].code + ',' + drawCard.data.cards[7].code + ',' + drawCard.data.cards[8].code + ',' + drawCard.data.cards[9].code + ',' + drawCard.data.cards[10].code}`)
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerTwo/add/?cards=${drawCard.data.cards[11].code + ',' + drawCard.data.cards[12].code + ',' + drawCard.data.cards[13].code + ',' + drawCard.data.cards[14].code + ',' + drawCard.data.cards[15].code + ',' + drawCard.data.cards[16].code + ',' + drawCard.data.cards[17].code + ',' + drawCard.data.cards[18].code + ',' + drawCard.data.cards[19].code + ',' + drawCard.data.cards[20].code + ',' + drawCard.data.cards[21].code}`)
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerThree/add/?cards=${drawCard.data.cards[22].code + ',' + drawCard.data.cards[23].code + ',' + drawCard.data.cards[24].code + ',' + drawCard.data.cards[25].code + ',' + drawCard.data.cards[26].code + ',' + drawCard.data.cards[27].code + ',' + drawCard.data.cards[28].code + ',' + drawCard.data.cards[29].code + ',' + drawCard.data.cards[30].code + ',' + drawCard.data.cards[31].code + ',' + drawCard.data.cards[32].code}`)
    await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerFour/add/?cards=${drawCard.data.cards[33].code + ',' + drawCard.data.cards[34].code + ',' + drawCard.data.cards[35].code + ',' + drawCard.data.cards[36].code + ',' + drawCard.data.cards[37].code + ',' + drawCard.data.cards[38].code + ',' + drawCard.data.cards[39].code + ',' + drawCard.data.cards[40].code + ',' + drawCard.data.cards[41].code + ',' + drawCard.data.cards[42].code + ',' + drawCard.data.cards[43].code + ',' + drawCard.data.cards[44].code}`)
    const listPile = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerOne/list/`)
    const listPileTwo = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerTwo/list/`)
    const listPileThree = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerThree/list/`)
    const listPileFour = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck.data.deck_id}/pile/playerFour/list/`)
    setPlayerOneHand(listPile.data.piles.playerOne.cards)
    setPlayerTwoHand(listPileTwo.data.piles.playerTwo.cards)
    setPlayerThreeHand(listPileThree.data.piles.playerThree.cards)
    setPlayerFourHand(listPileFour.data.piles.playerFour.cards)
    setStart(true)
  }
  useEffect(() => {
    shuffleDeck()
  }, [])

  const findDuplicates = (array, key) => {
    const duplicates = [];
    const seen = {};

    array.forEach(item => {
      if (seen[item[key]]) {
        if (seen[item[key]].length === 1) {
          duplicates.push(seen[item[key]][0]);
          duplicates.push(item);
          seen[item[key]].push(item);
        }
      } else {
        seen[item[key]] = [item];
      }
    });

    return duplicates;
  };

  const addCardsToCenter = async (duplicates) => {
    const uniqueCodes = [...new Set(duplicates.map(item => item.code))]; // Duplicate codes removal

    try {
      const addCardPromises = uniqueCodes.map(code =>
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/centerOfTable/add/?cards=${code}`)
      );

      await Promise.all(addCardPromises);

      const centerOfTablee = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/centerOfTable/list/`);
      setCenterTable(centerOfTablee.data.piles.centerOfTable.cards);
    } catch (error) {
      console.error('Error adding cards to center or refreshing center:', error);
    }
  };

  // Throwing Cards
  useEffect(() => {
    if (gameStarter === true) {

      const checkAndAddDuplicates = (hand) => {
        const duplicates = findDuplicates(hand, 'value');
        if (duplicates.length > 0) {
          addCardsToCenter(duplicates);
        } else {
          console.log('No duplicates found');
        }
      };

      if (turn === 2 && playerTwoHand) {
        checkAndAddDuplicates(playerTwoHand);
      } else if (turn === 3 && playerThreeHand) {
        checkAndAddDuplicates(playerThreeHand);
      } else if (turn === 4 && playerFourHand) {
        checkAndAddDuplicates(playerFourHand);
      }
    }
  }, [turn, playerTwoHand, playerThreeHand, playerFourHand])

  // Selecting Card Function
  function selectCard(e) {
    if (selectedCardOne == null) {
      setSelectedCardOne(e.target.id)
    }
    if (selectedCardOne != null && selectedCardTwo == null) {
      setSelectedCardTwo(e.target.id)
    }
    if (selectedCardOne == null) {
      e.target.className = 'selectedCard';
    }
  }
  // Removing Card Class
  function removeCardClass() {
    let cardOne = document.querySelector('.selectedCard')
    cardOne.className = 'card'
  }
  // Players card controlling useEffect
  useEffect(() => {
    if (selectedCardOne != null && selectedCardTwo != null) {
      if (selectedCardOne.charAt(0) === selectedCardTwo.charAt(0) && selectedCardOne.charAt(selectedCardOne.length - 1) !== selectedCardTwo.charAt(selectedCardTwo.length - 1)) {
        const addToCenterOfTable = async () => {
          await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/centerOfTable/add/?cards=${selectedCardOne},${selectedCardTwo}`)
          const centerOfTablee = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/centerOfTable/list/`)
          const listPile = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/list/`)
          removeCardClass()
          setPlayerOneHand(listPile.data.piles.playerOne.cards)
          setCenterTable(centerOfTablee.data.piles.centerOfTable.cards)
        }
        if (turn === 1) {
          addToCenterOfTable()
          setSelectedCardOne(null)
          setSelectedCardTwo(null)
        } else {
          setSelectedCardOne(null)
          setSelectedCardTwo(null)
          removeCardClass()
          if (turnWarning === false) {
            setTurnWarning(true)
            setTimeout(() => {
              setTurnWarning(false)
            }, 3000);
          }
        }
      } else {
        if (matchWarning === false) {
          setMatchWarning(true)
          setTimeout(() => {
            setMatchWarning(false)
          }, 3000);
        }
        removeCardClass()
        setSelectedCardOne(null)
        setSelectedCardTwo(null)
      }
    }
  }, [selectedCardOne, setSelectedCardOne, selectedCardTwo, setSelectedCardTwo])

  // Remaining players checker
  useEffect(() => {
    if (playerTwoHand && playerThreeHand && playerFourHand) {
      const handChecker = async () => {
        const playerChecker = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerThree/list/`)
        if (playerChecker.data.piles.playerThree.remaining === 0) {
          setPlayerThree(false)
        }
        if (playerChecker.data.piles.playerTwo.remaining === 0) {
          setPlayerTwo(false)
        }
        if (playerChecker.data.piles.playerFour.remaining === 0) {
          setPlayerFour(false)
        }
      }
      handChecker()
    }
  }, [playerThreeHand, playerTwoHand, playerOneHand, playerFourHand])

  // Random card selector for Ai
  const aiRandomCardSelector = async () => {
    if (gameStarter === true) {
      if (turn === 3 && playerThree !== false) {
        if (playerFour !== false) {
          let randomCard = document.querySelector(`.playerFourHand .playerCards div:nth-child(${Math.floor(Math.random() * playerFourHand.length) + 1}) div`).id
          await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerThree/add/?cards=${randomCard}`)
        } else {
          let randomCard = document.querySelector(`.playerOneHand .playerCards div:nth-child(${Math.floor(Math.random() * playerOneHand.length) + 1}) div`).id
          await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerFour/add/?cards=${randomCard}`)
        }
      }
      if (turn === 2 && playerTwo !== false) {
        if (playerThree !== false) {
          let randomCard = document.querySelector(`.playerThreeHand .playerCards div:nth-child(${Math.floor(Math.random() * playerThreeHand.length) + 1}) div`).id
          await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerTwo/add/?cards=${randomCard}`)
        } else if (playerFour !== false) {
          let randomCard = document.querySelector(`.playerFourHand .playerCards div:nth-child(${Math.floor(Math.random() * playerFourHand.length) + 1}) div`).id
          await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerThree/add/?cards=${randomCard}`)
        } else {
          let randomCard = document.querySelector(`.playerOneHand .playerCards div:nth-child(${Math.floor(Math.random() * playerOneHand.length) + 1}) div`).id
          await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerFour/add/?cards=${randomCard}`)
        }
      }
      if (turn === 4 && playerFour !== false) {
        let randomCard = document.querySelector(`.playerOneHand .playerCards div:nth-child(${Math.floor(Math.random() * playerOneHand.length) + 1}) div`).id
        await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerFour/add/?cards=${randomCard}`)
      }
      const listPile = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/list/`)
      const listPileTwo = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerTwo/list/`)
      const listPileThree = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerThree/list/`)
      const listPileFour = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerFour/list/`)
      setPlayerOneHand(listPile.data.piles.playerOne.cards)
      setPlayerTwoHand(listPileTwo.data.piles.playerTwo.cards)
      setPlayerThreeHand(listPileThree.data.piles.playerThree.cards)
      setPlayerFourHand(listPileFour.data.piles.playerFour.cards)
    }
  }

  // Turn Visualiser
  useEffect(() => {
    if (start === true) {
      if (turn === 3) {
        aiRandomCardSelector()
        setBoxThree('turnOuterBox')
        setTimeout(() => {
          setGameStarter(true)
          setBoxThree('outerBox')
          if (playerTwo !== false) {
            setTurn(2)
          } else {
            setTurn(1)
          }
        }, 10000);
      } else if (turn === 2) {
        aiRandomCardSelector()
        setBoxTwo('turnOuterBox')
        setTimeout(() => {
          setBoxTwo('outerBox')
          setTurn(1)
          setPlayerTurn(true)
        }, 10000);
      } else if (turn === 1) {
        if (playerTurn === false) {
          setBoxOne('turnOuterBox')
          setTimeout(() => {
            setBoxOne('outerBox')
            if (playerFour !== false) {
              setTurn(4)
            } else if (playerThree !== false) {
              setTurn(3)
            } else {
              setTurn(2)
            }
          }, 10000);
        }
      } else if (turn === 4) {
        setPlayerTurn(false)
        aiRandomCardSelector()
        setBoxFour('turnOuterBox')
        setTimeout(() => {
          setBoxFour('outerBox')
          if (playerThree !== false) {
            setTurn(3)
          } else if (playerTwo !== false) {
            setTurn(2)
          } else {
            setTurn(1)
          }
        }, 10000);
      }
    }
  }, [turn, start, setStart, playerTurn, playerFour, playerThree, playerTwo])

  const drawingCard = async (e) => {
    if (playerTurn === true) {
      await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/add/?cards=${e.target.id}`)
      const listPile = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/list/`)
      const listPileTwo = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerTwo/list/`)
      setPlayerOneHand(listPile.data.piles.playerOne.cards)
      setPlayerTwoHand(listPileTwo.data.piles.playerTwo.cards)
      setPlayerTurn(false)
    } else {
      if (turnWarning === false) {
        setTurnWarning(true)
        setTimeout(() => {
          setTurnWarning(false)
        }, 3000);
      }
    }
  }
  const drawingCardFromThree = async (e) => {
    if (playerTwo === false && playerThree !== false) {
      if (playerTurn === true) {
        await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/add/?cards=${e.target.id}`)
        const listPile = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/list/`)
        const listPileThree = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerThree/list/`)
        setPlayerOneHand(listPile.data.piles.playerOne.cards)
        setPlayerThreeHand(listPileThree.data.piles.playerThree.cards)
        setPlayerTurn(false)
      } else {
        if (turnWarning === false) {
          setTurnWarning(true)
          setTimeout(() => {
            setTurnWarning(false)
          }, 3000);
        }
      }
    }
  }
  const drawingCardFromFour = async (e) => {
    if (playerTwo === false && playerThree === false) {
      if (playerTurn === true) {
        await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/add/?cards=${e.target.id}`)
        const listPile = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerOne/list/`)
        const listPileFour = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/playerFour/list/`)
        setPlayerOneHand(listPile.data.piles.playerOne.cards)
        setPlayerFourHand(listPileFour.data.piles.playerFour.cards)
        setPlayerTurn(false)
      } else {
        if (turnWarning === false) {
          setTurnWarning(true)
          setTimeout(() => {
            setTurnWarning(false)
          }, 3000);
        }
      }
    }
  }

  // If left hand player has no remaining cards this function will make we can pull cards from other player
  useEffect(() => {
    if (playerTwo === false) {
      setThirdCardClass('playerThreeCard')
    }
    if (playerTwo === false && playerThree === false) {
      setFourthCardClass('playerFourCard')
    }
  }, [playerTwo, playerThree])

  return (
    <div className="boardWrapper">
      <div className='leftColumn'>
        <div className='playerTwoHand'>
          <PlayerBox name={'Yasin Öztekin'} outerBox={boxTwo} />
          <div className='playerCards'>
            {playerTwoHand && playerTwoHand.map((card, key) => (
              <PlayerHand key={key} value={card.code} click={(e) => drawingCard(e)} cardClass={'card'} cardIMG={`url(https://www.deckofcardsapi.com/static/img/back.png)`} />
            ))}
          </div>
        </div>
      </div>
      <div className='centerColumn'>
        <div className='playerThreeHand'>
          <div className='playerCards'>
            {playerThreeHand && playerThreeHand.map((card, key) => (
              <PlayerHand key={key} value={card.code} click={(e) => drawingCardFromThree(e)} cardClass={thirdCardClass} cardIMG={`url(https://www.deckofcardsapi.com/static/img/back.png)`} />
            ))}
          </div>
          <PlayerBox name={'Yunus Oruç'} outerBox={boxThree} />
        </div>
        <div className='centerOfTable'>
          {centerTable && centerTable.map((card, key) => (
            <CenterOfTable key={key} value={card.code} cardIMG={`url(${card.image})`} />
          ))}
        </div>
        {/* todo center of the table */}
        <div className='playerOneHand'>
          <PlayerBox name={'Çınarr'} outerBox={boxOne} />
          <div className='playerCards'>
            {playerOneHand && playerOneHand.map((card, key) => (
              <PlayerHand key={key} click={(e) => selectCard(e)} value={card.code} cardClass={'card'} cardIMG={`url(${card.image})`} />
            ))}
          </div>
        </div>
      </div>
      <div className='rightColumn'>
        <div className='playerFourHand'>
          <PlayerBox name={'Şüko'} outerBox={boxFour} />
          <div className='playerCards'>
            {playerFourHand && playerFourHand.map((card, key) => (
              <PlayerHand key={key} value={card.code} click={(e) => drawingCardFromFour(e)} cardClass={fourthCardClass} cardIMG={`url(https://www.deckofcardsapi.com/static/img/back.png)`} />

            ))}
          </div>
        </div>
      </div>
      <div className='warning'>
        {turnWarning && <div className='turnWarning'>
          It's not your turn!
        </div>}
        {matchWarning && <div className='matchWarning'>
          Cards doesn't match!
        </div>}
      </div>
    </div>
  );
}

export default App;

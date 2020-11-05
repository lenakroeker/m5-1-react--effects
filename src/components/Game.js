import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import useKeyDown from "../hooks/useKeyDown.hook";
import cookieSrc from "../cookie.svg";
import Item from "./item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];



const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(0)
  const [purchasedItems, setPurchasedItems] = useState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    }
  )

  // update document title to show number of cookies

  useDocumentTitle(numCookies, "cookie game")

  // allow use spacebar
  const SpaceKeyFunction = () => {
    setNumCookies(numCookies + 1)
  }
  useKeyDown("Space", SpaceKeyFunction)

  // cookie by the second

  const calculateCookiesPerTick = (obj) => {
    let total = 0;
    total += obj.cursor * 1;
    total += obj.grandma * 10;
    total += obj.farm * 80;
    console.log("added" + total)
    return total
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies)
    // Add this number of cookies to the total
  }, 1000);


  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{(purchasedItems.cursor * 1) + (purchasedItems.grandma * 10) + (purchasedItems.farm * 80)}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={() => { setNumCookies(numCookies + 1) }} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item, index) => {
          console.log(item.id, purchasedItems[item.id])
          return (
            <Item key={index + item.name}
              index={index}
              id={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleClick={() => {
                if (numCookies > item.cost) {
                  console.log(item.name + " click");
                  console.log(purchasedItems.cursor)
                  setNumCookies(numCookies - item.cost);
                  switch (item.id) {
                    case "cursor":
                      setPurchasedItems({ ...purchasedItems, cursor: purchasedItems.cursor + 1 });
                      break;
                    case "grandma":
                      setPurchasedItems({ ...purchasedItems, grandma: purchasedItems.grandma + 1 });
                      break;
                    case "farm":
                      setPurchasedItems({ ...purchasedItems, farm: purchasedItems.farm + 1 });
                      break;
                  }

                } else {
                  window.alert("not enough cookies to purchase " + item.name)
                }
              }} />)
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;

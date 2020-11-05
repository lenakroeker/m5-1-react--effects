import React, { useEffect, useRef } from "react";
import styled from "styled-components";


const Item = (props) => {
    const { index, id, name, cost, value, numOwned, handleClick } = props;
    // autofocus first item on load
    const ref = useRef(null);

    useEffect(() => {
        if (index === 0)
            ref.current.focus();
        return () => {

        }
    }, [])
    return (
        <Button ref={ref} key={id} onClick={handleClick}>
            <Player>
                <h2>{name}</h2>
                <p>Cost: {cost}, produces {value} cookie(s)/second </p>
            </Player>

            <Number>{numOwned}</Number>
        </Button>
    )
}

export default Item;

const Button = styled.button`
color: white;
border: none;
background: rgb(32, 32, 32) ;
border-bottom: 2px solid white;
text-align: left;
padding: 10px 20px;
margin: 10px;
display: grid;
line-height: 3em;
grid-template-columns: 350px 20px;
grid-template-areas:
"info number";`

const Player = styled.div`
grid-area: info;`

const Number = styled.h1`
grid-area: number;
padding-top: 20px;`
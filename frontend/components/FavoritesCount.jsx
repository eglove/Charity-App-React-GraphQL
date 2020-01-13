import React from "react";
import styled from "styled-components";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const AnimationStyles = styled.span`
    .count {
        display: block;
        position: relative;
        transition: all 0.4s;
        backface-visibility: hidden;
    }
    // initial state of button
    .count-enter {
        transform: rotateX(0.5turn);
    }
    .count-enter-active {
        transform: rotateX(0);
    }
    .count-exit {
        top: 0;
        position: absolute;
        transform: rotateX(0);
    }
    .count-exit-active {
        transform: rotateX(0.5turn);
    }
`;

const Dot = styled.div`
    background: ${props => props.theme.blue};
    color: white;
    border-radius: 50%;
    padding: 0.5em;
    line-height: 1em;
    min-width: 2em;
    margin: 0.5em;
    font-weight: 100;
    text-align: center;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
`;

const FavoritesCount = ({count}) => (
    <AnimationStyles>
        <TransitionGroup>
            <CSSTransition
                unmountOnExit
                className="count"
                classNames="count"
                key={count}
                timeout={{enter: 400, exit: 400}}
            >
                <Dot>
                    {count}
                </Dot>
            </CSSTransition>
        </TransitionGroup>
    </AnimationStyles>
);

export default FavoritesCount;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import hamma from './assets/hamma.jpg';
import chroufa from './assets/chroufa.jpg';
import slouma from './assets/slouma.jpg';
import './maze.css';

const Maze = ({ speed, addMsg,
    gameStarted,
    setGameStarted }) => {
    const WIDTH = 40;
    const HEIGHT = 40;

    const [matrix] = useState([
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0]
    ]);

    const agentPaths = {
        bfs: {
            path: [
                [
                    0,
                    0
                ],
                [
                    1,
                    0
                ],
                [
                    0,
                    1
                ],
                [
                    2,
                    0
                ],
                [
                    0,
                    2
                ],
                [
                    3,
                    0
                ],
                [
                    1,
                    2
                ],
                [
                    4,
                    0
                ],
                [
                    3,
                    1
                ],
                [
                    1,
                    3
                ],
                [
                    5,
                    0
                ],
                [
                    3,
                    2
                ],
                [
                    1,
                    4
                ],
                [
                    4,
                    2
                ],
                [
                    2,
                    4
                ],
                [
                    4,
                    3
                ],
                [
                    2,
                    5
                ],
                [
                    4,
                    4
                ],
                [
                    2,
                    6
                ],
                [
                    4,
                    5
                ],
                [
                    2,
                    7
                ],
                [
                    4,
                    6
                ],
                [
                    2,
                    8
                ],
                [
                    5,
                    6
                ],
                [
                    4,
                    7
                ],
                [
                    1,
                    8
                ],
                [
                    6,
                    6
                ],
                [
                    0,
                    8
                ],
                [
                    7,
                    6
                ],
                [
                    6,
                    5
                ],
                [
                    0,
                    9
                ],
                [
                    0,
                    7
                ],
                [
                    7,
                    7
                ],
                [
                    6,
                    4
                ],
                [
                    0,
                    10
                ],
                [
                    0,
                    6
                ],
                [
                    7,
                    8
                ],
                [
                    7,
                    4
                ],
                [
                    0,
                    11
                ],
                [
                    0,
                    5
                ],
                [
                    7,
                    3
                ],
                [
                    0,
                    12
                ],
                [
                    8,
                    3
                ],
                [
                    0,
                    13
                ],
                [
                    8,
                    2
                ],
                [
                    0,
                    14
                ],
                [
                    8,
                    1
                ],
                [
                    0,
                    15
                ],
                [
                    9,
                    1
                ],
                [
                    1,
                    15
                ],
                [
                    9,
                    0
                ],
                [
                    2,
                    15
                ],
                [
                    10,
                    0
                ],
                [
                    3,
                    15
                ],
                [
                    11,
                    0
                ],
                [
                    4,
                    15
                ],
                [
                    3,
                    16
                ],
                [
                    12,
                    0
                ],
                [
                    4,
                    14
                ],
                [
                    13,
                    0
                ],
                [
                    4,
                    13
                ],
                [
                    14,
                    0
                ],
                [
                    4,
                    12
                ],
                [
                    15,
                    0
                ],
                [
                    3,
                    12
                ],
                [
                    15,
                    1
                ],
                [
                    2,
                    12
                ],
                [
                    15,
                    2
                ],
                [
                    2,
                    13
                ],
                [
                    2,
                    11
                ],
                [
                    16,
                    2
                ],
                [
                    14,
                    2
                ],
                [
                    2,
                    10
                ],
                [
                    17,
                    2
                ],
                [
                    13,
                    2
                ],
                [
                    3,
                    10
                ],
                [
                    17,
                    3
                ],
                [
                    17,
                    1
                ],
                [
                    12,
                    2
                ],
                [
                    3,
                    9
                ],
                [
                    18,
                    3
                ],
                [
                    18,
                    1
                ],
                [
                    11,
                    2
                ],
                [
                    4,
                    9
                ],
                [
                    18,
                    4
                ],
                [
                    18,
                    0
                ],
                [
                    10,
                    2
                ],
                [
                    11,
                    3
                ],
                [
                    5,
                    9
                ],
                [
                    18,
                    5
                ],
                [
                    19,
                    0
                ],
                [
                    11,
                    4
                ],
                [
                    6,
                    9
                ],
                [
                    5,
                    8
                ],
                [
                    18,
                    6
                ],
                [
                    10,
                    4
                ],
                [
                    6,
                    10
                ],
                [
                    18,
                    7
                ],
                [
                    10,
                    5
                ],
                [
                    7,
                    10
                ],
                [
                    6,
                    11
                ],
                [
                    19,
                    7
                ],
                [
                    9,
                    5
                ],
                [
                    5,
                    11
                ],
                [
                    8,
                    5
                ],
                [
                    9,
                    6
                ],
                [
                    9,
                    7
                ],
                [
                    10,
                    7
                ],
                [
                    11,
                    7
                ],
                [
                    11,
                    8
                ],
                [
                    12,
                    8
                ],
                [
                    12,
                    9
                ],
                [
                    13,
                    9
                ],
                [
                    13,
                    10
                ],
                [
                    13,
                    11
                ],
                [
                    14,
                    11
                ],
                [
                    14,
                    12
                ],
                [
                    14,
                    13
                ],
                [
                    15,
                    13
                ],
                [
                    15,
                    14
                ],
                [
                    15,
                    15
                ],
                [
                    15,
                    16
                ],
                [
                    16,
                    16
                ],
                [
                    17,
                    16
                ],
                [
                    17,
                    17
                ],
                [
                    18,
                    17
                ],
                [
                    19,
                    17
                ],
                [
                    19,
                    18
                ],
                [
                    19,
                    19
                ]
            ]
            , image: hamma, color: 'blue', msgs: [
                "Can I go to (1, 0) ?",
                "Can I go to (0, 1) ?",
                "Can I go to (2, 0) ?",
                "Can I go to (0, 0) ?",
                "Can I go to (0, 2) ?",
                "Can I go to (0, 0) ?",
                "Can I go to (3, 0) ?",
                "Can I go to (1, 0) ?",
                "Can I go to (1, 2) ?",
                "Can I go to (0, 1) ?",
                "Can I go to (4, 0) ?",
                "Can I go to (2, 0) ?",
                "Can I go to (3, 1) ?",
                "Can I go to (0, 2) ?",
                "Can I go to (1, 3) ?",
                "Can I go to (5, 0) ?",
                "Can I go to (3, 0) ?",
                "Can I go to (3, 2) ?",
                "Can I go to (3, 0) ?",
                "Can I go to (1, 4) ?",
                "Can I go to (1, 2) ?",
                "Can I go to (6, 0) ?",
                "Can I go to (4, 0) ?",
                "Can I go to (4, 2) ?",
                "Can I go to (3, 1) ?",
                "Can I go to (2, 4) ?",
                "Can I go to (1, 3) ?",
                "Can I go to (3, 2) ?",
                "Can I go to (4, 3) ?",
                "Can I go to (1, 4) ?",
                "Can I go to (2, 5) ?",
                "Can I go to (5, 3) ?",
                "Can I go to (4, 4) ?",
                "Can I go to (4, 2) ?",
                "Can I go to (2, 6) ?",
                "Can I go to (2, 4) ?",
                "Can I go to (4, 5) ?",
                "Can I go to (4, 3) ?",
                "Can I go to (2, 7) ?",
                "Can I go to (2, 5) ?",
                "Can I go to (4, 6) ?",
                "Can I go to (4, 4) ?",
                "Can I go to (2, 8) ?",
                "Can I go to (2, 6) ?",
                "Can I go to (5, 6) ?",
                "Can I go to (4, 7) ?",
                "Can I go to (4, 5) ?",
                "Can I go to (1, 8) ?",
                "Can I go to (2, 7) ?",
                "Can I go to (6, 6) ?",
                "Can I go to (4, 6) ?",
                "Can I go to (4, 6) ?",
                "Can I go to (2, 8) ?",
                "Can I go to (0, 8) ?",
                "Can I go to (7, 6) ?",
                "Can I go to (5, 6) ?",
                "Can I go to (6, 5) ?",
                "Can I go to (1, 8) ?",
                "Can I go to (0, 9) ?",
                "Can I go to (0, 7) ?",
                "Can I go to (6, 6) ?",
                "Can I go to (7, 7) ?",
                "Can I go to (6, 6) ?",
                "Can I go to (6, 4) ?",
                "Can I go to (0, 10) ?",
                "Can I go to (0, 8) ?",
                "Can I go to (0, 8) ?",
                "Can I go to (0, 6) ?",
                "Can I go to (7, 8) ?",
                "Can I go to (7, 6) ?",
                "Can I go to (7, 4) ?",
                "Can I go to (6, 5) ?",
                "Can I go to (0, 11) ?",
                "Can I go to (0, 9) ?",
                "Can I go to (0, 7) ?",
                "Can I go to (0, 5) ?",
                "Can I go to (8, 8) ?",
                "Can I go to (7, 7) ?",
                "Can I go to (6, 4) ?",
                "Can I go to (7, 3) ?",
                "Can I go to (0, 12) ?",
                "Can I go to (0, 10) ?",
                "Can I go to (0, 6) ?",
                "Can I go to (8, 3) ?",
                "Can I go to (7, 4) ?",
                "Can I go to (0, 13) ?",
                "Can I go to (0, 11) ?",
                "Can I go to (9, 3) ?",
                "Can I go to (7, 3) ?",
                "Can I go to (8, 2) ?",
                "Can I go to (0, 14) ?",
                "Can I go to (0, 12) ?",
                "Can I go to (8, 3) ?",
                "Can I go to (8, 1) ?",
                "Can I go to (0, 15) ?",
                "Can I go to (0, 13) ?",
                "Can I go to (9, 1) ?",
                "Can I go to (8, 2) ?",
                "Can I go to (1, 15) ?",
                "Can I go to (0, 14) ?",
                "Can I go to (8, 1) ?",
                "Can I go to (9, 0) ?",
                "Can I go to (2, 15) ?",
                "Can I go to (0, 15) ?",
                "Can I go to (10, 0) ?",
                "Can I go to (9, 1) ?",
                "Can I go to (3, 15) ?",
                "Can I go to (1, 15) ?",
                "Can I go to (11, 0) ?",
                "Can I go to (9, 0) ?",
                "Can I go to (4, 15) ?",
                "Can I go to (2, 15) ?",
                "Can I go to (3, 16) ?",
                "Can I go to (12, 0) ?",
                "Can I go to (10, 0) ?",
                "Can I go to (3, 15) ?",
                "Can I go to (4, 14) ?",
                "Can I go to (3, 15) ?",
                "Can I go to (13, 0) ?",
                "Can I go to (11, 0) ?",
                "Can I go to (4, 15) ?",
                "Can I go to (4, 13) ?",
                "Can I go to (14, 0) ?",
                "Can I go to (12, 0) ?",
                "Can I go to (4, 14) ?",
                "Can I go to (4, 12) ?",
                "Can I go to (15, 0) ?",
                "Can I go to (13, 0) ?",
                "Can I go to (3, 12) ?",
                "Can I go to (4, 13) ?",
                "Can I go to (16, 0) ?",
                "Can I go to (14, 0) ?",
                "Can I go to (15, 1) ?",
                "Can I go to (4, 12) ?",
                "Can I go to (2, 12) ?",
                "Can I go to (15, 2) ?",
                "Can I go to (15, 0) ?",
                "Can I go to (3, 12) ?",
                "Can I go to (2, 13) ?",
                "Can I go to (2, 11) ?",
                "Can I go to (16, 2) ?",
                "Can I go to (14, 2) ?",
                "Can I go to (15, 1) ?",
                "Can I go to (2, 12) ?",
                "Can I go to (2, 12) ?",
                "Can I go to (2, 10) ?",
                "Can I go to (17, 2) ?",
                "Can I go to (15, 2) ?",
                "Can I go to (15, 2) ?",
                "Can I go to (13, 2) ?",
                "Can I go to (3, 10) ?",
                "Can I go to (2, 11) ?",
                "Can I go to (16, 2) ?",
                "Can I go to (17, 3) ?",
                "Can I go to (17, 1) ?",
                "Can I go to (14, 2) ?",
                "Can I go to (12, 2) ?",
                "Can I go to (2, 10) ?",
                "Can I go to (3, 9) ?",
                "Can I go to (18, 3) ?",
                "Can I go to (17, 2) ?",
                "Can I go to (18, 1) ?",
                "Can I go to (17, 2) ?",
                "Can I go to (13, 2) ?",
                "Can I go to (11, 2) ?",
                "Can I go to (4, 9) ?",
                "Can I go to (3, 10) ?",
                "Can I go to (19, 3) ?",
                "Can I go to (17, 3) ?",
                "Can I go to (18, 4) ?",
                "Can I go to (17, 1) ?",
                "Can I go to (18, 0) ?",
                "Can I go to (12, 2) ?",
                "Can I go to (10, 2) ?",
                "Can I go to (11, 3) ?",
                "Can I go to (5, 9) ?",
                "Can I go to (3, 9) ?",
                "Can I go to (18, 5) ?",
                "Can I go to (18, 3) ?",
                "Can I go to (19, 0) ?",
                "Can I go to (18, 1) ?",
                "Can I go to (11, 2) ?",
                "Can I go to (11, 4) ?",
                "Can I go to (11, 2) ?",
                "Can I go to (6, 9) ?",
                "Can I go to (4, 9) ?",
                "Can I go to (5, 8) ?",
                "Can I go to (19, 5) ?",
                "Can I go to (18, 6) ?",
                "Can I go to (18, 4) ?",
                "Can I go to (18, 0) ?",
                "Can I go to (10, 4) ?",
                "Can I go to (11, 3) ?",
                "Can I go to (5, 9) ?",
                "Can I go to (6, 10) ?",
                "Can I go to (5, 9) ?",
                "Can I go to (18, 7) ?",
                "Can I go to (18, 5) ?",
                "Can I go to (11, 4) ?",
                "Can I go to (10, 5) ?",
                "Can I go to (7, 10) ?",
                "Can I go to (6, 11) ?",
                "Can I go to (6, 9) ?",
                "Can I go to (19, 7) ?",
                "Can I go to (18, 6) ?",
                "Can I go to (9, 5) ?",
                "Can I go to (10, 4) ?",
                "Can I go to (6, 10) ?",
                "Can I go to (5, 11) ?",
                "Can I go to (6, 10) ?",
                "Can I go to (18, 7) ?",
                "Can I go to (19, 8) ?",
                "Can I go to (10, 5) ?",
                "Can I go to (8, 5) ?",
                "Can I go to (9, 6) ?",
                "Can I go to (6, 11) ?",
                "Can I go to (9, 5) ?",
                "Can I go to (9, 7) ?",
                "Can I go to (9, 5) ?",
                "Can I go to (10, 7) ?",
                "Can I go to (9, 6) ?",
                "Can I go to (11, 7) ?",
                "Can I go to (9, 7) ?",
                "Can I go to (10, 7) ?",
                "Can I go to (11, 8) ?",
                "Can I go to (12, 8) ?",
                "Can I go to (11, 7) ?",
                "Can I go to (11, 8) ?",
                "Can I go to (12, 9) ?",
                "Can I go to (13, 9) ?",
                "Can I go to (12, 8) ?",
                "Can I go to (12, 9) ?",
                "Can I go to (13, 10) ?",
                "Can I go to (13, 11) ?",
                "Can I go to (13, 9) ?",
                "Can I go to (14, 11) ?",
                "Can I go to (13, 10) ?",
                "Can I go to (13, 11) ?",
                "Can I go to (14, 12) ?",
                "Can I go to (14, 13) ?",
                "Can I go to (14, 11) ?",
                "Can I go to (15, 13) ?",
                "Can I go to (14, 12) ?",
                "Can I go to (14, 13) ?",
                "Can I go to (15, 14) ?",
                "Can I go to (15, 15) ?",
                "Can I go to (15, 13) ?",
                "Can I go to (15, 16) ?",
                "Can I go to (15, 14) ?",
                "Can I go to (16, 16) ?",
                "Can I go to (15, 15) ?",
                "Can I go to (17, 16) ?",
                "Can I go to (15, 16) ?",
                "Can I go to (16, 16) ?",
                "Can I go to (17, 17) ?",
                "Can I go to (18, 17) ?",
                "Can I go to (17, 16) ?",
                "Can I go to (19, 17) ?",
                "Can I go to (17, 17) ?",
                "Can I go to (18, 17) ?",
                "Can I go to (19, 18) ?",
                "Can I go to (19, 19) ?",
                "Can I go to (19, 17) ?"
            ]
        },
        dfs: {
            path: [
                [
                    0,
                    0
                ],
                [
                    1,
                    0
                ],
                [
                    2,
                    0
                ],
                [
                    3,
                    0
                ],
                [
                    4,
                    0
                ],
                [
                    5,
                    0
                ],
                [
                    6,
                    0
                ],
                [
                    7,
                    0
                ],
                [
                    6,
                    1
                ],
                [
                    6,
                    2
                ],
                [
                    3,
                    1
                ],
                [
                    3,
                    2
                ],
                [
                    4,
                    2
                ],
                [
                    4,
                    3
                ],
                [
                    5,
                    3
                ],
                [
                    4,
                    4
                ],
                [
                    4,
                    5
                ],
                [
                    4,
                    6
                ],
                [
                    5,
                    6
                ],
                [
                    6,
                    6
                ],
                [
                    7,
                    6
                ],
                [
                    7,
                    7
                ],
                [
                    7,
                    8
                ],
                [
                    8,
                    8
                ],
                [
                    8,
                    9
                ],
                [
                    9,
                    9
                ],
                [
                    10,
                    9
                ],
                [
                    9,
                    10
                ],
                [
                    9,
                    11
                ],
                [
                    8,
                    11
                ],
                [
                    9,
                    12
                ],
                [
                    10,
                    12
                ],
                [
                    11,
                    12
                ],
                [
                    11,
                    13
                ],
                [
                    12,
                    13
                ],
                [
                    12,
                    14
                ],
                [
                    12,
                    15
                ],
                [
                    13,
                    15
                ],
                [
                    11,
                    11
                ],
                [
                    11,
                    10
                ],
                [
                    6,
                    5
                ],
                [
                    6,
                    4
                ],
                [
                    7,
                    4
                ],
                [
                    7,
                    3
                ],
                [
                    8,
                    3
                ],
                [
                    9,
                    3
                ],
                [
                    8,
                    2
                ],
                [
                    8,
                    1
                ],
                [
                    9,
                    1
                ],
                [
                    9,
                    0
                ],
                [
                    10,
                    0
                ],
                [
                    11,
                    0
                ],
                [
                    12,
                    0
                ],
                [
                    13,
                    0
                ],
                [
                    14,
                    0
                ],
                [
                    15,
                    0
                ],
                [
                    16,
                    0
                ],
                [
                    15,
                    1
                ],
                [
                    15,
                    2
                ],
                [
                    16,
                    2
                ],
                [
                    17,
                    2
                ],
                [
                    17,
                    3
                ],
                [
                    18,
                    3
                ],
                [
                    19,
                    3
                ],
                [
                    19,
                    2
                ],
                [
                    18,
                    4
                ],
                [
                    18,
                    5
                ],
                [
                    19,
                    5
                ],
                [
                    18,
                    6
                ],
                [
                    18,
                    7
                ],
                [
                    19,
                    7
                ],
                [
                    19,
                    8
                ],
                [
                    19,
                    9
                ],
                [
                    18,
                    9
                ],
                [
                    17,
                    9
                ],
                [
                    16,
                    9
                ],
                [
                    15,
                    9
                ],
                [
                    15,
                    10
                ],
                [
                    15,
                    8
                ],
                [
                    14,
                    8
                ],
                [
                    15,
                    7
                ],
                [
                    16,
                    7
                ],
                [
                    16,
                    6
                ],
                [
                    16,
                    5
                ],
                [
                    16,
                    4
                ],
                [
                    15,
                    4
                ],
                [
                    14,
                    4
                ],
                [
                    13,
                    4
                ],
                [
                    14,
                    5
                ],
                [
                    14,
                    6
                ],
                [
                    13,
                    6
                ],
                [
                    12,
                    6
                ],
                [
                    12,
                    5
                ],
                [
                    13,
                    7
                ],
                [
                    17,
                    10
                ],
                [
                    17,
                    11
                ],
                [
                    17,
                    12
                ],
                [
                    16,
                    12
                ],
                [
                    17,
                    13
                ],
                [
                    18,
                    13
                ],
                [
                    19,
                    13
                ],
                [
                    19,
                    14
                ],
                [
                    19,
                    15
                ],
                [
                    18,
                    15
                ],
                [
                    19,
                    12
                ],
                [
                    19,
                    11
                ],
                [
                    17,
                    14
                ],
                [
                    17,
                    8
                ],
                [
                    17,
                    1
                ],
                [
                    18,
                    1
                ],
                [
                    18,
                    0
                ],
                [
                    19,
                    0
                ],
                [
                    14,
                    2
                ],
                [
                    13,
                    2
                ],
                [
                    12,
                    2
                ],
                [
                    11,
                    2
                ],
                [
                    10,
                    2
                ],
                [
                    11,
                    3
                ],
                [
                    11,
                    4
                ],
                [
                    10,
                    4
                ],
                [
                    10,
                    5
                ],
                [
                    9,
                    5
                ],
                [
                    8,
                    5
                ],
                [
                    9,
                    6
                ],
                [
                    9,
                    7
                ],
                [
                    10,
                    7
                ],
                [
                    11,
                    7
                ],
                [
                    11,
                    8
                ],
                [
                    12,
                    8
                ],
                [
                    12,
                    9
                ],
                [
                    13,
                    9
                ],
                [
                    13,
                    10
                ],
                [
                    13,
                    11
                ],
                [
                    14,
                    11
                ],
                [
                    14,
                    12
                ],
                [
                    14,
                    13
                ],
                [
                    15,
                    13
                ],
                [
                    15,
                    14
                ],
                [
                    15,
                    15
                ],
                [
                    15,
                    16
                ],
                [
                    16,
                    16
                ],
                [
                    17,
                    16
                ],
                [
                    17,
                    17
                ],
                [
                    18,
                    17
                ],
                [
                    19,
                    17
                ],
                [
                    19,
                    18
                ],
                [
                    19,
                    19
                ]
            ]
            , image: chroufa, color: 'green', msgs: ['aeae', 'ezazeaz']
        },
        astar: {
            path: [
                [
                    0,
                    0
                ],
                [
                    1,
                    0
                ],
                [
                    2,
                    0
                ],
                [
                    3,
                    0
                ],
                [
                    4,
                    0
                ],
                [
                    5,
                    0
                ],
                [
                    6,
                    0
                ],
                [
                    6,
                    1
                ],
                [
                    3,
                    1
                ],
                [
                    3,
                    2
                ],
                [
                    4,
                    2
                ],
                [
                    4,
                    3
                ],
                [
                    5,
                    3
                ],
                [
                    4,
                    4
                ],
                [
                    4,
                    5
                ],
                [
                    4,
                    6
                ],
                [
                    5,
                    6
                ],
                [
                    6,
                    6
                ],
                [
                    7,
                    6
                ],
                [
                    7,
                    7
                ],
                [
                    7,
                    8
                ],
                [
                    8,
                    8
                ],
                [
                    8,
                    9
                ],
                [
                    9,
                    9
                ],
                [
                    10,
                    9
                ],
                [
                    9,
                    10
                ],
                [
                    9,
                    11
                ],
                [
                    9,
                    12
                ],
                [
                    10,
                    12
                ],
                [
                    11,
                    12
                ],
                [
                    11,
                    13
                ],
                [
                    12,
                    13
                ],
                [
                    12,
                    14
                ],
                [
                    12,
                    15
                ],
                [
                    13,
                    15
                ],
                [
                    11,
                    11
                ],
                [
                    11,
                    10
                ],
                [
                    8,
                    11
                ],
                [
                    6,
                    5
                ],
                [
                    4,
                    7
                ],
                [
                    6,
                    4
                ],
                [
                    7,
                    4
                ],
                [
                    7,
                    3
                ],
                [
                    8,
                    3
                ],
                [
                    9,
                    3
                ],
                [
                    8,
                    2
                ],
                [
                    8,
                    1
                ],
                [
                    9,
                    1
                ],
                [
                    9,
                    0
                ],
                [
                    10,
                    0
                ],
                [
                    11,
                    0
                ],
                [
                    12,
                    0
                ],
                [
                    13,
                    0
                ],
                [
                    14,
                    0
                ],
                [
                    15,
                    0
                ],
                [
                    16,
                    0
                ],
                [
                    15,
                    1
                ],
                [
                    15,
                    2
                ],
                [
                    16,
                    2
                ],
                [
                    17,
                    2
                ],
                [
                    17,
                    3
                ],
                [
                    18,
                    3
                ],
                [
                    19,
                    3
                ],
                [
                    18,
                    4
                ],
                [
                    18,
                    5
                ],
                [
                    19,
                    5
                ],
                [
                    18,
                    6
                ],
                [
                    18,
                    7
                ],
                [
                    19,
                    7
                ],
                [
                    19,
                    8
                ],
                [
                    19,
                    9
                ],
                [
                    18,
                    9
                ],
                [
                    17,
                    9
                ],
                [
                    17,
                    10
                ],
                [
                    17,
                    11
                ],
                [
                    17,
                    12
                ],
                [
                    17,
                    13
                ],
                [
                    18,
                    13
                ],
                [
                    19,
                    13
                ],
                [
                    19,
                    14
                ],
                [
                    19,
                    15
                ],
                [
                    18,
                    15
                ],
                [
                    17,
                    14
                ],
                [
                    19,
                    12
                ],
                [
                    19,
                    11
                ],
                [
                    16,
                    12
                ],
                [
                    16,
                    9
                ],
                [
                    17,
                    8
                ],
                [
                    15,
                    9
                ],
                [
                    15,
                    10
                ],
                [
                    15,
                    8
                ],
                [
                    14,
                    8
                ],
                [
                    15,
                    7
                ],
                [
                    16,
                    7
                ],
                [
                    16,
                    6
                ],
                [
                    19,
                    2
                ],
                [
                    16,
                    5
                ],
                [
                    16,
                    4
                ],
                [
                    15,
                    4
                ],
                [
                    17,
                    1
                ],
                [
                    18,
                    1
                ],
                [
                    14,
                    4
                ],
                [
                    14,
                    5
                ],
                [
                    14,
                    6
                ],
                [
                    13,
                    6
                ],
                [
                    13,
                    7
                ],
                [
                    12,
                    6
                ],
                [
                    18,
                    0
                ],
                [
                    19,
                    0
                ],
                [
                    13,
                    4
                ],
                [
                    12,
                    5
                ],
                [
                    14,
                    2
                ],
                [
                    13,
                    2
                ],
                [
                    12,
                    2
                ],
                [
                    11,
                    2
                ],
                [
                    11,
                    3
                ],
                [
                    11,
                    4
                ],
                [
                    10,
                    4
                ],
                [
                    10,
                    5
                ],
                [
                    9,
                    5
                ],
                [
                    9,
                    6
                ],
                [
                    9,
                    7
                ],
                [
                    10,
                    7
                ],
                [
                    11,
                    7
                ],
                [
                    11,
                    8
                ],
                [
                    12,
                    8
                ],
                [
                    12,
                    9
                ],
                [
                    13,
                    9
                ],
                [
                    13,
                    10
                ],
                [
                    13,
                    11
                ],
                [
                    14,
                    11
                ],
                [
                    14,
                    12
                ],
                [
                    14,
                    13
                ],
                [
                    15,
                    13
                ],
                [
                    15,
                    14
                ],
                [
                    15,
                    15
                ],
                [
                    15,
                    16
                ],
                [
                    16,
                    16
                ],
                [
                    17,
                    16
                ],
                [
                    17,
                    17
                ],
                [
                    18,
                    17
                ],
                [
                    19,
                    17
                ],
                [
                    19,
                    18
                ],
                [
                    8,
                    5
                ],
                [
                    10,
                    2
                ],
                [
                    0,
                    1
                ],
                [
                    0,
                    2
                ],
                [
                    1,
                    2
                ],
                [
                    1,
                    3
                ],
                [
                    1,
                    4
                ],
                [
                    2,
                    4
                ],
                [
                    2,
                    5
                ],
                [
                    2,
                    6
                ],
                [
                    2,
                    7
                ],
                [
                    2,
                    8
                ],
                [
                    1,
                    8
                ],
                [
                    0,
                    8
                ],
                [
                    0,
                    9
                ],
                [
                    0,
                    10
                ],
                [
                    0,
                    11
                ],
                [
                    0,
                    12
                ],
                [
                    0,
                    13
                ],
                [
                    0,
                    14
                ],
                [
                    0,
                    15
                ],
                [
                    1,
                    15
                ],
                [
                    2,
                    15
                ],
                [
                    3,
                    15
                ],
                [
                    4,
                    15
                ],
                [
                    3,
                    16
                ],
                [
                    4,
                    14
                ],
                [
                    4,
                    13
                ],
                [
                    4,
                    12
                ],
                [
                    3,
                    12
                ],
                [
                    2,
                    12
                ],
                [
                    2,
                    13
                ],
                [
                    2,
                    11
                ],
                [
                    2,
                    10
                ],
                [
                    3,
                    10
                ],
                [
                    3,
                    9
                ],
                [
                    4,
                    9
                ],
                [
                    5,
                    9
                ],
                [
                    6,
                    9
                ],
                [
                    6,
                    10
                ],
                [
                    7,
                    10
                ],
                [
                    6,
                    11
                ],
                [
                    5,
                    11
                ],
                [
                    5,
                    8
                ],
                [
                    0,
                    7
                ],
                [
                    0,
                    6
                ],
                [
                    0,
                    5
                ],
                [
                    19,
                    19
                ]
            ]
            , image: slouma, color: 'red', msgs: ['aeae', 'ezazeaz']
        }
    };
    const [agentPositions, setAgentPositions] = useState({
        bfs: [0, 0],
        dfs: [0, 0],
        astar: [0, 0]
    });

    const cellColorRef = useRef({});

    useEffect(() => {
        const intervalIds = [];
        if (gameStarted) {
            Object.keys(agentPaths).forEach(agent => {
                let step = 0;
                const id = setInterval(() => {
                    if (step < agentPaths[agent].path.length) {
                        const [row, col] = agentPaths[agent].path[step];
                        updateCellColor(row, col, agentPaths[agent].color);
                        moveAgent(agent, row, col);
                        step++;
                    } else {
                        clearInterval(id);
                    }
                }, speed); // Adjust time as needed

                intervalIds.push(id);
            });

        }

        return () => {
            intervalIds.forEach(clearInterval);
        };
    }, []);

    const moveAgent = (agent, row, col) => {
        setAgentPositions(prevPositions => ({
            ...prevPositions,
            [agent]: [row, col]
        }));

        // Get the step number for the agent
        const step = agentPaths[agent].path.findIndex(position => position[0] === row && position[1] === col);

        // Log the agent's information and associated message
        console.log(`${agent.toUpperCase()} - Position: [${row}, ${col}]`);
        if (step < agentPaths[agent].msgs.length) {
            console.log(`Message: ${agentPaths[agent].msgs[step]}`);
        } else {
            console.log("No more messages.");
        }
        console.log("-------");
    };


    const updateCellColor = (row, col, color) => {
        const key = `${row}-${col}`;
        if (!cellColorRef.current[key]) {
            cellColorRef.current[key] = [];
        }
        if (!cellColorRef.current[key].includes(color)) {
            cellColorRef.current[key].push(color);
        }

        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        if (cell) {
            cell.style.background = getCombinedColor(cellColorRef.current[key]);
        }
    };

    const getCombinedColor = (colors) => {
        if (colors.length === 1) {
            return colors[0];
        } else {
            return `linear-gradient(to right, ${colors.join(', ')})`;
        }
    };

    const renderMaze = () => {
        return matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="maze-row">
                {row.map((cell, colIndex) => (
                    <div key={colIndex}
                        style={{ width: WIDTH, height: HEIGHT }}
                        data-row={rowIndex}
                        data-col={colIndex}
                        className={`cell ${cell === 1 ? 'obstacle' : ''}`}>
                    </div>
                ))}
            </div>
        ));
    };
    const renderAgents = () => {
        // Function to calculate the offset based on the number of agents in the same cell
        const calculateOffset = (row, col, index, maxAgents) => {
            const offset = 5; // Base offset value in pixels
            const angle = (2 * Math.PI / maxAgents) * index; // Angle to position each agent
            return {
                x: Math.cos(angle) * offset,
                y: Math.sin(angle) * offset
            };
        };

        // Find the maximum number of agents in any single cell
        const maxAgentsPerCell = Object.values(agentPositions).reduce((acc, position) => {
            const key = `${position[0]}-${position[1]}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(agentPaths).map((agent, index) => {
            const [row, col] = agentPositions[agent];
            const cellSize = WIDTH; // Cell size (width and height)

            // Determine the number of agents in the same cell
            const agentsInCell = maxAgentsPerCell[`${row}-${col}`];

            // Calculate offset for the current agent
            const { x: offsetX, y: offsetY } = calculateOffset(row, col, index, agentsInCell);

            // Centering the agent in the cell with the offset
            const style = {
                top: `calc(${row * cellSize + cellSize / 2}px + ${offsetY}px)`,
                left: `calc(${col * cellSize + cellSize / 2}px + ${offsetX}px)`,
                transform: 'translate(-50%, -50%)' // Adjusts the centering considering the offset
            };

            return (
                <img key={agent}
                    src={agentPaths[agent].image}
                    alt={agent}
                    className="agent-image"
                    style={{ ...style, width: WIDTH / 2, height: HEIGHT / 2, transition: `top ${speed}ms, left ${speed}ms` }} />
            );
        });
    };



    return (
        <div className="maze-container">
            {renderMaze()}
            {renderAgents()}
        </div>
    );
};

export default Maze;


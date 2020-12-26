# Meaning Engine
This document outlines the software design of the "meaning engine", which is a fancy name for the code that takes in [meaning objects]() that represent rules, and applies to them to the game. Although some convenience functions and constants live in the special [meaning package]() on the frontend, it is by design a fragmented system, since many different parts of the app need to interact with it. Thus the need for this document - we're not describing one file or module, but rather a broader pattern.

## Design
This section seeks to lay out the main design points of the system, and the reasoning behind each. Each design point is formatted like a very informal proof; each statement is assumed to be true, except for ones that start with "From", which are subconclusions that combine previous points (and sometimes some implied points) to create a new statement we can assume to be true. Each conclusion follows from the sum of the "From" lines. Hopefully, if any of these assumptions are later shown to be flawed, this will allow somewhat logical modifications of the central design to be made.

We know that the client relies on calculations happening somewhere to determine probabilities, expected damage, etc. - where should that code go, and how often should it be called? 
0. The client needs to display damage calculations that are accurate, i.e. outputs follow deterministically from inputs.
1. The logic to calculate damage (from shooting or fighting) from every unit to every enemy unit is expensive in terms of performance.
2. The client is already performance-constrained, due to the use of 3D graphics.
3. From 0-2: We will perform the damage calculations on the server.
4. To perform damage calculations, we need to know the current exact state of the board, including remaining wounds and positions of every unit. We call this "board state".
5. Board state can change very frequently - at least once for every time any unit moves or acts, and sometimes much more than that, if the user adjusts previously entered values. 
6. Performing a correspondence with the server (sending boardstate, waiting, then receiving and processing new dmg info) is expensive.
7. From 3-6: The naive solution, a [Reconciliation pattern](https://reactjs.org/docs/reconciliation.html) that watches for board state changes, would update too frequently.
8. Displaying information that is inaccurate, but that the user knows is inaccurate, is ok.
9. If the user knows when their information is out of date, they know when it's inaccurate.
10. WH04k gameplay involves long periods where the app is not interacted with while dice are rolled, models are moved, snacks are made, etc.
11. From 10: Any reasonable interval-based system would refresh too often.
12: From 7-11: The system will be built around a "Refresh Damage Info" button, which will manually perform one correspondence every time it's pressed.

#### CONCLUSION A: Damage calculations are done on the server, and correspondences must be manually triggered by button press or phase change.

Now that we know the basic shape of the design, we can begin iterating to improve performance. First, we tackle the problem of unneccessary calculations for every refresh.
0. Any calculation with unchanged inputs does not need to be performed again if we remember the old result. 
1. Every refresh, there's lots of calculations that will have unchanged inputs.
2. To do any memoization, we need to store the previous values (inputs + outputs) in state.
3. The server is stateless.
4. From 1-3: Any memoization must be handled by the client.
5. From A: The server performs the calculations - the only control the client has is in what information it sends to the server.
6. The server still needs to receive the whole board state every time to perform its calculations.
7. From 4-6: The client needs to send some form of "extra" information to the server, to tell it what to recalculate. 
8. The best way I've come up with to decide which calculations to perform is by flagging individual units as having "changed" in some way.

#### CONCLUSION B: The client will flag certain units, and the server will only perform calculations that regard those units. 

Ok, so we now have all we need for the server to function, and for basic communication. But how does the client decide which units to flag?
0. The client already has information split into two objects: Match state (phase and round) and Board state (unit positions and wounds remaining). 
1. Any changes in flags will be based off changes in these two objects.
2. These objects are managed in the [warReducer](https://github.com/robbwdoering/bellum.ai/blob/master/react-ui/src/war/reducer.js).
3. From 0-2: We will decide which units to flag in the warReducer. 
4. Any unit that changes position should be flagged.
5. The client should flag units that have models die (or flee).
6. Any unit that changes and has an aura rule should flag all the units within the original radius, and all those within the new radius.
7. The client should flag all units when the round changes if there are round-dependent rules at play - for these purposes, we instantiate these rules as standalone global auras.

#### CONCLUSION C: The warReducer will flag units that move, die, or are affected by a changing aura.

And with these three stones, we lay the foundation for our castle :wink:

## Implementation
:warning: In progress...
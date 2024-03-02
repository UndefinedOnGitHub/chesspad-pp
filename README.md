# Chesspad++ <span style="font-size: 10px;">(_Chesspad plus plus_)</span>

### A chess notepad for the digital age

This is my contribution to all the chess apps out there.
I hope that this is useful in the recording and learning
of this great game.

[Live App](https://chesspad-pp.web.app/)

<!-- ### chessppp - chesspadpp - chesspad.pp - ChessPadPP -->

<!-- ## Getting Started -->

## Learn the terminology

`Wikipedia`

<!-- * [Algebraic notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)) -->

- [Chess Notation](https://en.wikipedia.org/wiki/Chess_notation)
- [Portable Game Notation - PGN](https://en.wikipedia.org/wiki/Portable_Game_Notation)

`chess.com`

- [Chess Notation](https://www.chess.com/terms/chess-notation)
- [Portable Game Notation - PGN](https://www.chess.com/terms/chess-pgn)

## Keyboard

The keyboard is comprised of `6` key groups. When you click on any button in a group
it will activate that button. When you set the minimum requirements for a move you will
be able to submit the move with the long return key on the far right.

#### Move structure

`<piece>` `<source column>` `<source row>` `<take>` `<column>` `<row>` `=<promotion piece>` or `<castle>`

Examples: `Qe4` `d4` `Raf1` `Rdxg8` `exf5` `e8=Q` `O-O`

#### 1. Pieces

King ♔, Queen ♕, Rook ♖, Bishop ♗, Knight ♘, (Pawn ♙)

When you click on any of the piece's symbols you will activate this piece.
If you click any other piece the current piece will be set to inactive and the new piece will be activated.
When you click the pawn you will not see any symbol shown on the display. This is because pawn moves do not have a piece symbol.

#### 2. Coordinates

Column: `a` `b` `c` `d` `e` `f` `g` `h`

Row: `1` `2` `3` `4` `5` `6` `7` `8`

When you click on the row or column symbols it will set the corresponding move. If you click on another symbol it will switch to that symbol instead.

When you click on `#` it will switch to the opposite input `(row -> column) | (column -> row)`.

#### 3. Source Coordinates

Column: `a` `b` `c` `d` `e` `f` `g` `h`

Row: `1` `2` `3` `4` `5` `6` `7` `8`

The source coordinates are used whenever you need to declare the origin of a piece.
For example `axb5` `Rfe3` `Qe4e5`.

In order to select a source move you must click `*` before clicking the coordinate button. After clicking the coordinate button the source selector button will be deactivated and all future clicks will not effect the source option. If you wish to change the source option just click the `*` button again.

_(Beta Action):_
_In an attempt to improve the number of clicks I have added a catch to the click events. If you were to click a `Column(e)` then `Take(x)` and then click another `Column(f)` the system will enter `exf`. This is to help make a pawn capture (most common need for source move) simpler and avoid using the source button._

#### 4. Take

`x`

This is a boolean value. When you click on the `x` it will become active. If you wish to deactivate it just click it again.

#### 5. Castle

`♔♖` King & Rook (bottom|center)

`O-O` `O-O-O`

When you click on the castle button any other value entered will be removed and the display will be replaced with `O-O`. If you wish to long castle `O-O-O` just click the castle button again. If you click on any other button the castle will be replaced with the other button that was pressed.

#### 6. Promotion

`=` `♕Queen` `♖Rook` `♗Bishop` `♘Knight`

When you click on the `=` button it will become active. If you click on a piece that piece will be set as the promotion piece and the `=` button will become inactive. If you click on the `=` again without clicking on a piece it will be inactive. If you wish to change the promotion piece, set the `=` to active and click on the new piece.

## Notepad Tab

This app is comprised of a `keyboard` as well as a `notepad` for
tracking the moves.

### Notepad

- The notepad will reflect the moves of an active game.
- Moves will be stored on your local storage allowing you to not lose your game if the browser is closed.
- On the notepad you can click `clear` anytime to reset all the moves.
- If you click on a move you will be able to edit the selected move.
- If you click the move again it will deselect the move and the next move entered will be added to the end. `Bug: after deselecting the move the move stays on the keyboard. A simple reset will clear it.`
- When finished click finish. You will then be prompted to select the winner.
- On the finish screen click copy or select the PGN and paste it in your favorite game engine.
  - [`chess.com Analysis Board`](https://www.chess.com/analysis?tab=analysis)
  - [`lichess Analysis Board`](https://lichess.org/analysis#0)
- When finished with the game click `New Game` to start a new game.
- After clicking New Game you will not be able to recover the game.

## Puzzle Tab:

- The puzzle is fetched from chess.com
- The puzzle may not refresh after a solve because there is a min time between a new puzzle. If the puzzle is the same try to wait and solve again.

## Game Tab:

- The game tab is a way to practice making moves with the move keyboard.
- Select a game from one of many GM player's games
- If the board does not make the first move give some time as the api is sometimes slow
- When the move is shown on the board enter the corresponding move on the keyboard.
- After entering all of the moves the finished game window will show
- You can click the new game anytime on the keyboard

## Contribute to the project:

- [Development](./DEVELOPMENT.md)
- [Future Planning](./FUTURE_PLANNING.md)

# 2048-Game
It’s a sliding puzzle game on a grid (usually 4×4) where:  You move tiles (up, down, left, right) using arrow keys.  When two tiles with the same number touch, they merge into one tile (sum of both).  After every move, a new tile (2 or 4) appears in a random empty spot.  The goal: Reach the tile “2048”.
<img width="1365" height="727" alt="image" src="https://github.com/user-attachments/assets/0307182a-c133-49a0-8911-b05f3c0b773a" />


When the project runs, the 2048 Game board appears on the screen as a 4×4 grid.
At the start of the game, two random tiles (usually 2 or 4) appear on the board.

🕹️ Gameplay Output

The player uses the arrow keys (↑ ↓ ← →) to move all the tiles in that direction.

When two tiles with the same number collide, they merge into one tile with their sum value.

After every valid move, a new tile (2 or 4) appears in an empty cell.

The score automatically increases based on the merged tile values.

If the player creates a tile with 2048, a popup message shows “Congratulations, You Win!”

If no more moves are possible, the game displays a “Game Over” message.


Final Output

Win Condition: A “You Win” modal popup appears when a tile reaches 2048.

Lose Condition: A “Game Over” modal popup appears when no moves are left.

Restart Option: The player can restart the game anytime using the restart button.

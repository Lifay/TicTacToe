$(document).ready(function () {

    var player = "X";
    var computer = "O";
    var playerMoves = [];
    var computerMoves = [];
    var gameRunning = false;

    const board = [ ["R1C1", "R1C2", "R1C3"],
                    ["R2C1", "R2C2", "R2C3"],
                    ["R3C1", "R3C2", "R3C3"] ];

    const winCondition = [
        ["R1C1", "R1C2", "R1C3"],
        ["R2C1", "R2C2", "R2C3"],
        ["R3C1", "R3C2", "R3C3"],
        ["R1C1", "R2C1", "R3C1"],
        ["R1C2", "R2C2", "R3C2"],
        ["R1C3", "R2C3", "R3C3"],
        ["R1C1", "R2C2", "R3C3"],
        ["R3C1", "R2C2", "R1C3"]
    ];

    $(".playerX, .playerO").on("click", function () {
        if (!gameRunning && $(this).html() != player) {
            player = $(this).html();
            computer = player === "X" ? "O" : "X";
            $(".playerX, .playerO").toggleClass("chosen");
        }
    });

    var computerTurn = function () {
        if (gameRunning) {
            let row = Math.floor(Math.random() * 3);
            let item = Math.floor(Math.random() * 3);
            var boardItem = board[row][item];

            if (!$(`#${boardItem}`).html()) {
                computerMoves.push(boardItem);
                $("#" + boardItem).html(computer);
            } else {
                computerTurn();
            }
        }
    };

    function checkForWin(player) {
        let win = false;
        let winMessage = player === playerMoves ? "You win" : "You lose";
        for (let i = 0; i < winCondition.length; i++) {
            if (winCondition[i].every(function (val) { return player.indexOf(val) >= 0 })) {
                gameRunning = false;
                $("#win").html(winMessage);
                break;
            };
        };
        if (playerMoves.length + computerMoves.length === 9) {
            if (!$("#win").html()) {
                $("#win").html("Tie!");
                gameRunning = false;
            }
        }
    }

    function resetGame() {
        $("td").html("");
        playerMoves = [];
        computerMoves = [];
        $("#win").html("");
    }

    $("td").on("click", function () {
        if (!gameRunning) {
            resetGame();
            gameRunning = true;
        } else {

            if (!$($(this)).html()) {
                $(this).html(player);
                playerMoves.push($(this).attr("id"));
                checkForWin(playerMoves);
                computerTurn();
                checkForWin(computerMoves);
            }
        }
    });



});
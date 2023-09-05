var score = 0
var record = 0

const num_of_loop = 3

var debug_last_pressed_key = 'None'

const game_grid_html = document.getElementsByClassName('grid')[0]

var game = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

function _get_free_cells() {
    let temp = []
    for (let x = 0; x < game.length; x++) {
        const element = game[x];
        for (let y = 0; y < element.length; y++) {
            let showx = x+1
            let showy = y+1
            if(game[x][y] == 0){
                temp.push([x+1,y+1])
            }
        }
    }
    return temp
}
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

function _update_debug() {
    let debug = document.getElementById('debug')
    debug.style.display = 'block'
    debug.innerHTML = ''
    debug.innerHTML += 'game:<br>'
    game.forEach(element => {
        debug.innerHTML += element+'<br>'
    });
    debug.innerHTML += debug_last_pressed_key
    // debug.innerHTML += game
}


function place_num(line,block,num) {
    console.warn('Place on: '+line+':'+block)
    let blok = document.getElementById('blok'+line+'_'+block)
    let elem = document.createElement('div')
    elem.classList.add('block_with_num')
    blok.appendChild(elem)
    elem.innerHTML = num
    elem.style.background = `var(--num${num})`
    if(num > 4){
        elem.style.color = 'var(--body_bg)'
    }else{
        elem.style.color = 'var(--dark_text)'
    }
    elem.style.animation = 'create_block .5s forwards ease-in-out'
    game[line-1][block-1] = num
}

function create_random() {
    let check_for_1or4 = randomInteger(0,10)

    let freeCells = _get_free_cells()

    let random_pick = freeCells[randomInteger(0,freeCells.length-1)]
    if (freeCells != []) {
        if (check_for_1or4 == 10) {
            place_num(random_pick[0],random_pick[1],4)
            temp_check = false
        }else{
            place_num(random_pick[0],random_pick[1],2)
            temp_check = false
        }
    }
}




function restart_game(isButton = false) {
    let all_html_blocks = document.getElementsByClassName('line')
    for (let x = 0; x < all_html_blocks.length; x++) {
        const element = all_html_blocks[x];
        element.innerHTML = ''
        element.style.background = 'var(--num0)'
        element.style.animation = 'none'
    }
    if (isButton) {
        game = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    }
}

function start_game() {
    // debugger
    for (let x = 0; x < 2; x++) {
        create_random() 
    }
}

function update_desk() {
    restart_game()
    for (let x = 0; x < game.length; x++) {
        for (let y = 0; y < game[x].length; y++) {
            let idx = x+1
            let idy = y+1
            let elem = document.getElementById('blok'+idx+'_'+idy)
            let block = document.createElement('div')
            block.classList.add('block_with_num')
            elem.appendChild(block)
            if(game[x][y] != 0){
                block.innerHTML = game[x][y]
                block.style.background = 'var(--num'+game[x][y]+')'
                if(game[x][y] >4){
                    block.style.color = 'var(--body_bg)'
                }else{
                    block.style.color = 'var(--dark_text)'
                }
            }else{
                elem.innerHTML = ''
            }
        }
    }
}

function update_game(edited_game) {
    game = edited_game
}

function name(params) {
    
}

function onkeydown_handle(event) {
    debug_last_pressed_key = event.code
    key = event.code
    let edited_game = [game[0],game[1],game[2],game[3]]
    console.log(game)
    if(game == [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]){
        console.log('game_clear')
        return
    }
    if(key == 'ArrowDown'){
        for (let x = 0; x < num_of_loop; x++) {
            let line4 = edited_game[3]
            let line3 = edited_game[2]
            let line2 = edited_game[1]
            let line1 = edited_game[0]
            for (let i = 0; i < line3.length; i++) {
                if(line4[i] == 0){
                    line4[i] = line3[i]
                    line3[i] = 0
                }else if(line4[i] == line3[i]){
                    line4[i] = line4[i] * 2
                    line3[i] = 0
                }
            }
            for (let i = 0; i < line2.length; i++) {
                if(line3[i] == 0){
                    line3[i] = line2[i]
                    line2[i] = 0
                }else if(line3[i] == line2[i]){
                    line3[i] = line3[i] * 2
                    line2[i] = 0
                }
            }
            for (let i = 0; i < line1.length; i++) {
                if(line2[i] == 0){
                    line2[i] = line1[i]
                    line1[i] = 0
                }else if(line2[i] == line1[i]){
                    line2[i] = line2[i] * 2
                    line1[i] = 0
                }
            }
        }
        if (edited_game != game) {
            update_game(edited_game)
            update_desk()
            create_random()
            console.group('Raznica')
            console.log(game)
            console.log(edited_game)
            console.groupEnd()
        }
    }else if(key == 'ArrowUp'){
        for (let x = 0; x < num_of_loop; x++) {
            let line4 = edited_game[3]
            let line3 = edited_game[2]
            let line2 = edited_game[1]
            let line1 = edited_game[0]
            // for (let i = 0; i < line3.length; i++) {
            //     if(line4[i] == 0){
            //         line4[i] = line3[i]
            //         line3[i] = 0
            //     }else if(line4[i] == line3[i]){
            //         line4[i] = line4[i] * 2
            //     }
            // }
            for (let i = 0; i < line2.length; i++) {
                if(line1[i]==0){
                    line1[i] = line2[i]
                    line2[i] = 0
                }else if(line1[i] == line2[i]){
                    line1[i] = line1[i] * 2
                    line2[i] = 0
                }
            }
            for (let i = 0; i < line3.length; i++) {
                if(line2[i]==0){
                    line2[i] = line3[i]
                    line3[i] = 0
                }else if(line2[i] == line3[i]){
                    line2[i] = line2[i] * 2
                    line3[i] = 0
                }
            }
            for (let i = 0; i < line4.length; i++) {
                if(line3[i]==0){
                    line3[i] = line4[i]
                    line4[i] = 0
                }else if(line3[i] == line4[i]){
                    line3[i] = line3[i] * 2
                    line4[i] = 0
                }
            }
            
        }
        if (edited_game != game) {
            update_game(edited_game)
            update_desk()
            create_random()
            console.group('Raznica')
            console.log(game)
            console.log(edited_game)
            console.groupEnd()
        }
    }else if(key == 'ArrowLeft'){
        for (let x = 0; x < num_of_loop; x++) {
            // LINE 1
            for (let i = 0; i < 3; i++) {
                if(edited_game[0][i] == 0){
                    edited_game[0][i] = edited_game[0][i+1]
                    edited_game[0][i+1] = 0
                }else if(edited_game[0][i] == edited_game[0][i+1]){
                    edited_game[0][i] = edited_game[0][i] * 2
                    edited_game[0][i+1] = 0
                }
            }
            // LINE 2
            for (let i = 0; i < 3; i++) {
                if(edited_game[1][i] == 0){
                    edited_game[1][i] = edited_game[1][i+1]
                    edited_game[1][i+1] = 0
                }else if(edited_game[1][i] == edited_game[1][i+1]){
                    edited_game[1][i] = edited_game[1][i] * 2
                    edited_game[1][i+1] = 0
                }
            }
            for (let i = 0; i < 3; i++) {
                if(edited_game[2][i] == 0){
                    edited_game[2][i] = edited_game[2][i+1]
                    edited_game[2][i+1] = 0
                }else if(edited_game[2][i] == edited_game[2][i+1]){
                    edited_game[2][i] = edited_game[2][i] * 2
                    edited_game[2][i+1] = 0
                }
            }
            for (let i = 0; i < 3; i++) {
                if(edited_game[3][i] == 0){
                    edited_game[3][i] = edited_game[3][i+1]
                    edited_game[3][i+1] = 0
                }else if(edited_game[3][i] == edited_game[3][i+1]){
                    edited_game[3][i] = edited_game[3][i] * 2
                    edited_game[3][i+1] = 0
                }
            }
        }
        if (edited_game != game) {
            update_game(edited_game)
            update_desk()
            create_random()
            console.group('Raznica')
            console.log(game)
            console.log(edited_game)
            console.groupEnd()
        }
        else{
            return
        }
    }else if(key == 'ArrowRight'){
        let temp = [3,2,1,0]
        for (let i = 0; i < 3; i++) {
            for (let i = 0; i < 3; i++) {
                if(edited_game[3][temp[i]] == 0){
                    edited_game[3][temp[i]] = edited_game[3][temp[i]-1]
                    edited_game[3][temp[i]-1] = 0
                }else if(edited_game[3][temp[i]] == edited_game[3][temp[i]-1]){
                    edited_game[3][temp[i]] = edited_game[3][temp[i]] * 2
                    edited_game[3][temp[i]-1] = 0
                }
            }
            for (let i = 0; i < 3; i++) {
                if(edited_game[2][temp[i]] == 0){
                    edited_game[2][temp[i]] = edited_game[2][temp[i]-1]
                    edited_game[2][temp[i]-1] = 0
                }else if(edited_game[2][temp[i]] == edited_game[2][temp[i]-1]){
                    edited_game[2][temp[i]] = edited_game[2][temp[i]] * 2
                    edited_game[2][temp[i]-1] = 0
                }
            }
            for (let i = 0; i < 3; i++) {
                if(edited_game[1][temp[i]] == 0){
                    edited_game[1][temp[i]] = edited_game[1][temp[i]-1]
                    edited_game[1][temp[i]-1] = 0
                }else if(edited_game[1][temp[i]] == edited_game[1][temp[i]-1]){
                    edited_game[1][temp[i]] = edited_game[1][temp[i]] * 2
                    edited_game[1][temp[i]-1] = 0
                }
            }
            for (let i = 0; i < 3; i++) {
                if(edited_game[0][temp[i]] == 0){
                    edited_game[0][temp[i]] = edited_game[0][temp[i]-1]
                    edited_game[0][temp[i]-1] = 0
                }else if(edited_game[0][temp[i]] == edited_game[0][temp[i]-1]){
                    edited_game[0][temp[i]] = edited_game[0][temp[i]] * 2
                    edited_game[0][temp[i]-1] = 0
                }
            }


        }
        if (edited_game != game) {
            update_game(edited_game)
            update_desk()
            create_random()
            console.group('Raznica')
            console.log(game)
            console.log(edited_game)
            console.groupEnd()
        }
    }
    // update_game(edited_game)
    // update_desk()
    // create_random()

}

window.onkeydown = onkeydown_handle

// setInterval(_update_debug, 10);
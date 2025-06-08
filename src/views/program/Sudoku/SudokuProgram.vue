<script lang="ts" setup>
import useSudoku from './composables/useSudoku'

const { Sudoku } = useSudoku()

//设置难度
const box = ref(57)//57
//数独
let sudoku: any = null
//数独棋盘数据
const board = ref<any>([])
//当前选中格
const boardIndex = ref<number[]>([-1, -1])
//记录操作
const history = ref<AnyObj[]>([])

onMounted(() => {
    handleNew()

})

//处理格子的class
const style = computed(() => {
    return (item: AnyObj) => {
        return item.class.join(' ')
    }
})

//设置选中格子
const handleClickGrid = (col: number, row: number) => {
    boardIndex.value = [col, row]

    const selectNumber = board.value[col][row]?.num
    for (let [i, j] of sudoku.sudokuGenerator()) {
        board.value[i][j].class = board.value[i][j].class.filter((x: any) => {
            return !['show', 'select', 'active'].includes(x)
        })
        if (i === col || j === row) {
            board.value[i][j].class.push('show')
        }
        if (selectNumber !== '' && board.value[i][j].num === selectNumber) {
            board.value[i][j].class.push('select')
        }
    }

    for (let [r, c] of sudoku.createPalace(row, col)) {
        const index = board.value[r][c].class.findIndex((val: any) => val === 'show')
        if (index < 0) {
            board.value[r][c].class.push('show')
        }
    }

    board.value[col][row].class.push('active')
}

//生成新数独
const handleNew = () => {
    sudoku = new Sudoku(box.value)
    // console.log(sudoku.showBoard);
    board.value = sudoku.showBoard
    boardIndex.value = [-1, -1]
    history.value = []
}

//重置当前棋盘
const handleReset = () => {
    for (let [row, col] of sudoku.sudokuGenerator()) {
        if (!board.value[row][col].isInitial) {
            board.value[row][col].num = ''
        }
        board.value[row][col].class.splice(2)
    }
    boardIndex.value = [-1, -1]
    history.value = []
}

//删除当前输入
const handleDelete = () => {
    if (!handleCheck()) return

    const num = board.value[boardIndex.value[0]][boardIndex.value[1]].num
    board.value[boardIndex.value[0]][boardIndex.value[1]].num = ''
    judgmentInput(boardIndex.value[0], boardIndex.value[1], num)
}

//后退
const handleBank = () => {
    // console.log(history.value);
    const historyLength = history.value.length
    if (historyLength <= 0) return
    const historyItem = history.value[historyLength - 1]
    board.value[historyItem.row][historyItem.col].num = ''
    judgmentInput(historyItem.row, historyItem.col, historyItem.num)
    history.value.pop()
}

//输入
const handleInputNum = async (number: number) => {
    if (!handleCheck(number)) return

    const findItem = board.value[boardIndex.value[0]][boardIndex.value[1]]
    const { fnResult, ...result } = sudoku.isValidAll(board.value, boardIndex.value[0], boardIndex.value[1], number, true)
    handleError(result, fnResult, 'push')

    const num = findItem.num
    board.value[boardIndex.value[0]][boardIndex.value[1]].num = number
    historyPush({
        row: boardIndex.value[0],
        col: boardIndex.value[1],
        num: number
    })

    //清除前一次输入错误的class
    if (num !== '') {
        judgmentInput(boardIndex.value[0], boardIndex.value[1], num)
    }
    if (fnResult) {
        judgment()
    }
}

//判断修改还是填充操作历史
const historyPush = (item: AnyObj) => {
    history.value.push(item)
}

//判断输入格，清除error
const judgmentInput = (row: number, col: number, num: number) => {
    const { fnResult, ...result } = sudoku.isValidAll(board.value, row, col, num, true)
    handleClickGrid(row, col)
    result.now = {
        result: false,
        col: col,
        row: row
    }
    handleError(result, fnResult, 'delete')
}

//处理error格子的class
const handleError = (obj: AnyObj, fnResult: boolean, operate: string) => {
    // console.log(obj, operate);
    const resultArr = Object.values(obj)
    resultArr.forEach((element: any) => {
        if (!element.result) {
            if (operate === 'delete') {
                board.value[element.row][element.col].class = board.value[element.row][element.col].class.filter((x: any) => {
                    return x !== 'error'
                })
            } else {
                if (!fnResult) {
                    board.value[boardIndex.value[0]][boardIndex.value[1]].class.push('error')
                }
                board.value[element.row][element.col].class.push('error')
            }

        }
    });
}


//判断是否完成
const judgment = () => {
    const result = sudoku.judgment(board.value)
    if (result) {
        ElMessage.success('🎉🎉🎉🎉🎉,3s后生成新数独')
        setTimeout(() => {
            handleNew()
        }, 3000)
    }
}

//自动填充
const handleAuto = () => {
    let data = sudoku.board
    const typingDelay = 50 // 打字间隔时间，单位毫秒

    //重置棋盘
    handleReset()

    function setNumber(num = 0) {
        if (num >= box.value) {
            return
        }
        for (let [i, j] of sudoku.sudokuGenerator()) {
            if (!board.value[i][j].isInitial && board.value[i][j].num === '') {
                num++
                setTimeout(() => {
                    //设置选中
                    handleClickGrid(i, j)
                    //输入参数
                    handleInputNum(data[i][j].num)
                    //递归
                    setNumber(num)
                }, 1000 + typingDelay)
                return
            }
        }
    }
    setNumber()
}

//显示当前选中格子的值
const handleAiOne = () => {
    if (!handleCheck()) return
    handleInputNum(sudoku.board[boardIndex.value[0]][boardIndex.value[1]].num)
}

//判断是否满足输入条件
const handleCheck = (number?: number) => {
    if (boardIndex.value.includes(-1)) return false
    const findItem = board.value[boardIndex.value[0]][boardIndex.value[1]]
    if (findItem?.isInitial) return false
    if (number && findItem.num === number) return false
    return true
}

</script>

<template>
    <div class="box">
        <div class="sudoku">
            <div class="row" v-for="(item, index) in board" :key="index">
                <div :class="style(item1)" v-for="(item1, index1) in item" :key="index1"
                    @click="handleClickGrid(index, index1)">
                    <div :class="item1?.isInitial ? 'num initial' : 'num'">{{ item1.num }}</div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="input">
                <div class="number" v-for="item in 9" :key="item" @click="handleInputNum(item)">
                    {{ item }}
                </div>
            </div>
            <div class="btn">
                <div class="new" @click="handleNew">new</div>
                <div class="reset" @click="handleReset">reset</div>
            </div>
            <div class="btn">
                <div class="new" @click="handleBank">bank</div>
                <div class="reset" @click="handleDelete">delete</div>
            </div>
            <div class="btn">
                <div class="new" @click="handleAuto">auto</div>
                <div class="new" @click="handleAiOne">AI</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    display: flex;
    // justify-content: center;
    align-items: flex-start;
    // height: calc(100vh - 50px);
    padding: 20px;
    user-select: none;

    .sudoku {
        border-radius: 12px;
        overflow: hidden;
        min-width: 740px;

        .row {
            display: flex;
            justify-content: center;
            align-content: center;
        }

        .grid {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            border-right: 1px solid #c3c8df;
            border-bottom: 1px solid #c3c8df;
            // color: #38475f;
            cursor: pointer;
            transition: 0.3s linear;
            font-size: 40px;

            .num {
                color: #4c69b3;
            }

            .initial {
                color: #38475f;
            }
        }

        .show {
            background: #e4ebf2;
        }

        .active {
            background: #c2ddf8;
        }

        .select {
            background: #c7d6e8;
        }

        .error {
            background: #f1d0d6;

            .num {
                color: #d5656f;
            }
        }

        /* 第 3、6、9 行底部加上实现边框 */
        .row:nth-child(3n) .grid {
            // border-bottom: 3px solid #000;
            margin-bottom: 10px;
            border-bottom: none;
        }

        /* 第 3、6、9 列右边加上实现边框 */
        .row .grid:nth-child(3n) {
            border-right: none;
            margin-right: 10px;
        }

        .row .grid:last-child {
            margin-right: 0;
        }

        .row:nth-child(9) .grid {
            margin-bottom: 0;
        }
    }

    .input {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 320px;
        min-width: 320px;
        border-radius: 12px;
        overflow: hidden;
        margin-left: 40px;
        // background-color: red;

        .number {
            width: 100px;
            height: 100px;
            color: #325aaf;
            cursor: pointer;
            transition: 0.3s linear;
            user-select: none;
            font-size: 46px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;

        }

        .number:nth-child(n) {
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .number:nth-child(3n) {
            margin-right: 0;
        }

        .number:nth-child(7),
        .number:nth-child(8),
        .number:nth-child(9) {
            margin-bottom: 0;
        }


    }

    .btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 40px;
        margin-top: 20px;

        .new,
        .reset {
            width: 45%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            border-radius: 12px;
            cursor: pointer;
        }
    }
}
</style>
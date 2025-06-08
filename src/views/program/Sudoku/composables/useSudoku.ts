export default function useSudoku() {
  class Sudoku {
    board: AnyObj[]
    showBoard: AnyObj[]
    box: number

    constructor(box: number) {
      this.board = []
      this.showBoard = []
      this.box = box
      this.init()
    }

    init() {
      this.createArr()
      this.board = this.fillRemainingSpaces(this.board, 0, 0)
      this.showBoard = this.generateGame(this.board) || []
    }

    //生成9x9的宫格
    createArr() {
      const randNineArr = this.randNine()
      for (let i = 0; i < 9; i++) {
        this.board[i] = []
        for (let j = 0; j < 9; j++) {
          this.board[i][j] = {
            num: i === 0 ? randNineArr[j] : '',
            class: ['grid', `grid-${i}-${j}`],
            isInitial: true
          }
        }
      }
      return this.board
    }

    //生成一行1到9的不重复随机数
    randNine() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
    }

    //填充空格
    fillRemainingSpaces(sudoku: AnyObj[], row: number, col: number): any {
      if (col === 9) {
        col = 0
        row++
        if (row === 9) {
          //   console.log(sudoku)
          return sudoku // 完成填充
        }
      }

      if (sudoku[row][col].num !== '') {
        return this.fillRemainingSpaces(sudoku, row, col + 1) // 跳过已填数字
      }

      for (let num = 1; num <= 9; num++) {
        if (this.isValidAll(sudoku, row, col, num).fnResult) {
          sudoku[row][col].num = num
          if (this.fillRemainingSpaces(sudoku, row, col + 1)) {
            return sudoku
          }
          sudoku[row][col].num = '' // 回溯
        }
      }

      return false
    }

    //校验空格是否合格
    isValidAll(sudoku: AnyObj[], row: number, col: number, num: number, isAll: boolean = false) {
      const result: AnyObj = {
        fnResult: true,
        rowResult: {},
        colResult: {},
        palaceResult: {}
      }
      result.rowResult = this.isValidRow(sudoku, row, col, num)
      if (!result.rowResult.result && !isAll) {
        result.fnResult = false
        return result
      }

      result.colResult = this.isValidCol(sudoku, row, col, num)
      if (!result.colResult.result && !isAll) {
        result.fnResult = false
        return result
      }

      result.palaceResult = this.isValidPalace(sudoku, row, col, num)
      if (!result.palaceResult.result && !isAll) {
        result.fnResult = false
      }

      if (isAll) {
        result.fnResult =
          result.rowResult.result && result.colResult.result && result.palaceResult.result
      }
      return result
    }

    // 检查行
    isValidRow(sudoku: AnyObj[], row: number, col: number, num: number) {
      const rowObj = {
        result: true,
        row: row,
        col: col
      }
      for (let i = 0; i < 9; i++) {
        if (sudoku[row][i].num === num) {
          //   console.log('检查行', row, i)
          rowObj.result = false
          rowObj.col = i
          return rowObj
        }
      }
      return rowObj
    }

    // 检查列
    isValidCol(sudoku: AnyObj[], row: number, col: number, num: number) {
      const colObj = {
        result: true,
        row: row,
        col: col
      }
      for (let i = 0; i < 9; i++) {
        if (sudoku[i][col].num === num) {
          colObj.result = false
          colObj.row = i
          //   colObj.col = col
          return colObj
        }
      }
      return colObj
    }

    // 检查宫
    isValidPalace(sudoku: AnyObj[], row: number, col: number, num: number) {
      const palaceObj = {
        result: true,
        row: row,
        col: col
      }

      const startRow = Math.floor(row / 3) * 3
      const startCol = Math.floor(col / 3) * 3
      const findRow = startRow + 3
      const findCol = startCol + 3
      for (let i = startRow; i < findRow; i++) {
        for (let j = startCol; j < findCol; j++) {
          if (sudoku[i][j].num === num) {
            palaceObj.result = false
            palaceObj.col = j
            palaceObj.row = i
            return palaceObj
          }
        }
      }

      return palaceObj
    }

    //根据输入的row和col返回3x3宫格循环的遍历器
    *createPalace(row: number, col: number) {
      const startRow = Math.floor(col / 3) * 3
      const startCol = Math.floor(row / 3) * 3
      const findRow = startRow + 3
      const findCol = startCol + 3
      for (let i = startRow; i < findRow; i++) {
        for (let j = startCol; j < findCol; j++) {
          yield [i, j]
        }
      }
    }

    //返回9x9宫格循环的遍历器
    *sudokuGenerator() {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          yield [i, j]
        }
      }
    }

    //生成显示数独
    generateGame(sudoku: AnyObj[], num: number = 0): any {
      const result: AnyObj[] = JSON.parse(JSON.stringify(sudoku))
      //57
      if (num >= this.box) {
        // console.log(result)
        // for (let i = 0; i < 9; i++) {
        //   for (let j = 0; j < 9; j++) {
        //     result[i][j] = this.boardProxy(
        //       Object.assign(result[i][j], {
        //         row: i,
        //         col: j
        //       })
        //     )
        //   }
        // }
        return result
      }
      const index1 = Math.floor(Math.random() * 9)
      const index2 = Math.floor(Math.random() * 9)

      if (result[index1][index2].num !== '') {
        result[index1][index2].num = ''
        result[index1][index2].isInitial = false
        num += 1
      }

      return this.generateGame(result, num)
    }

    //校验是否完成
    judgment(sudoku: AnyObj[]) {
      let num = 0
      sudoku.map((item) => {
        item.map((value: AnyObj) => {
          const index = value.class.findIndex((val: string) => val === 'error')
          if (index < 0 && value.num !== '' && !value.isInitial) {
            num++
          }
        })
      })
      return num === this.box
    }

    //有待优化
    // boardProxy(obj: AnyObj): any {
    //   return new Proxy(obj, {
    //     set: (target, key, value, proxy) => {
    //       const result = Reflect.set(target, key, value, proxy)
    //       if (key === 'num') {
    //         console.log(key, value, target, Reflect)
    //       }
    //       return result
    //     }
    //   })
    // }
  }
  return { Sudoku }
}

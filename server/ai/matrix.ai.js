// Matrix class for matrix operations
export class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1).map((elm, i, j) => arr[i]);
    }

    toArray() {
        return this.data.flat();
    }

    randomize() {
        this.map(() => Math.random() * 2 - 1);
    }

    static subtract(a, b) {
        return new Matrix(a.rows, a.cols).map(
            (_, i, j) => a.data[i][j] - b.data[i][j]
        );
    }

    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows).map(
            (_, i, j) => matrix.data[j][i]
        );
    }

    static dot(a, b) {
        return new Matrix(a.rows, b.cols).map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        });
    }

    map(func) {
        this.data = this.data.map((row, i) =>
            row.map((val, j) => func(val, i, j))
        );
        return this;
    }

    static map(matrix, func) {
        return new Matrix(matrix.rows, matrix.cols).map((val, i, j) =>
            func(matrix.data[i][j], i, j)
        );
    }

    multiply(n) {
        if (typeof n === "number") {
            this.map((val) => val * n);
        } else {
            this.map((val, i, j) => val * n.data[i][j]);
        }
        return this;
    }

    add(matrix) {
        this.map((val, i, j) => val + matrix.data[i][j]);
        return this;
    }
}

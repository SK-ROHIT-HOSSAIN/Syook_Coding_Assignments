/*Greater than and less than in a matrix
    - Detect values in a matrix that is greater than or equal to every element in its row and less than or equal to every element in its column.
    - So say you have a matrix-like so:
 
    ```js
        1  2  3
      |---------
    1 | 7  8  7
    2 | 5  4  2    value at column 1, row 2, with 5 (Ans)
    3 | 8  6  7
    ```
    - A matrix may have zero or more values like these which are greater than or equal and less than or equal.
    - Your code should be able to provide a list of all the values for any given matrix. If no values are found it should return an empty list.
    - The matrix can have a different number of rows and columns (Non-square matrix).*/

    //Solution

   const detectValues = (mat)=> {
        const Values = [];         //An array for storing those values of matrix which are greater than or equal to every element in its row and 
                                    //less than or equal to every element in its column.

        for (let r = 0; r < mat.length; r++) {
            for (let c = 0; c < mat[r].length; c++) {
                const value = mat[r][c];
    
                let rge = true;
                for (let col = 0; col < mat[r].length; col++) {
                    if (value < mat[r][col]) {
                        rge = false;
                        break;
                    }
                }
    
                let cle = true;
                for (let row = 0; row < mat.length; row++) {
                    if (value > mat[row][c]) {
                        cle = false;
                        break;
                    }
                }
    
                if (rge && cle) {      //  value which are greater than or equal to it's row && less than or equal to its column.
                    Values.push(value);     
                }
            }
        }
    
        return Values;
    }
    
    
    const mat = [
        [0, 5],
        [1, 8],
        [2, 3]
        
    ];
    
    const result = detectValues(mat);
    console.log(result); 
    


    //Output is 3

    //Explanation: 3 is the only element in the above matrix which is greater than other elements of it's row
    // && lesser than elements which are present in the column.
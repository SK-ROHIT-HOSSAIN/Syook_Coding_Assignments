/*1. Am I Perfect?
    - Write a function that tells if a given number is perfect or not. A number is called perfect if the sum of the factors of a number (excluding the number itself) is the number itself.
    - Output
      - Return “Perfect” if the number is perfect 
      - if the sum of factors is greater than the input return “Abundant” 
      - if the sum of factors is lesser than the input return “Deficient”.
 
    Example: 
    ```js
    1) 6 -> factors(1,2,3) -> sum (1+2+3) = 6 (perfect number)
    2) 12 -> factors(1,2,3,4,6) -> sum(1+2+3+4+6) = 16 > 12 (Abundant)
    3) 8 -> factors(1,2,4) -> sum(1+2+4) = 7 < 8 (Deficient)
    ```*/

    //Solution

    const AmIPerfect = (a) => {
        if(a == 1 || a < 0)
            return "Invalid" // As per the given examples negetive factors are not considered here.
        
        let sum = 0;
        for(let i =1; i<a; i++){
            if(a % i == 0){
                sum += i
            }
        }
        
        if(sum == a)
        return "Perfect"
        else if(sum > a)
        return "Abundant"
        else
        return "Deficient"


    }

    const result = AmIPerfect(12)
    console.log(result);

    //Output : Abundant

    //Explanation: 12's factors are 1,2,3,4,6 (12 will not be considered as per the question)
    // now, sum of factors is (1 + 2 + 3 + 4 + 6 ) = 16, as 16 > 12. So the output will be "Abundant"
//Now a Single array for the best path among all the solutions
var best_path;
        
//Storing the value of the smallest distance value
var best_distance;

//Storing the value of the all the possible routes i.e. Factorial of all the nodes or destinations
//Initializing the possibility to 0, so the default value of the variable is 0 
var possibility = 0;


export function Tsp (check_list,check_len_list) 
{
    var check_array = check_list;

    var len_list = check_len_list;

    //Converting the single dimensional array i.e. [1,2,3,4] to 
    // two dimensional array i.e. [[1,2],[3,4]]
    function listToMatrix(list, elementsPerSubArray) 
    {
        var matrix = [], i, k;
        for (i = 0, k = -1; i < list.length; i++)
        {
            if (i % elementsPerSubArray === 0)
            {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(list[i]);
        }
        return matrix;
    }

    //Calling the function with list and the dimension
    //(it will be a Square array or matrix)

    var len_array = listToMatrix(check_array, len_list);
    
    // The len_array will be something like this
    // len_array = 
    // [
    //     [0,12,3], 
    //     [12,0,9],
    //     [3,9,0],
    // ];



    // Now for all the possibilites of the destination, we will have n! (n number of factorial solutions)
    // Which means that if we have 5 destination, solutions will be 5*4*3*2*1 = 24
    // So the rows will be 24 and the columns will be 5 because 24 solutions each having 5 destinations to travel
    var destination_possibilities = new Array(len_list);
    
    //Initializing the possibility to 1, so the loop increments the value
    possibility = 1;
    //Loop to calculate the factorial value
    for (var j = 1; j <= len_list; j++)
    {
        possibility = possibility * j;
    }
    // Initialization of the array
    for (var i = 0; i < possibility; i++)
    {
       destination_possibilities[i] = [];
    }


    // Finding All Possibilities
    function permute (nums)
    {
        var result = [];        
        var backtrack = (i, nums) => 
        {
            if(i===nums.length)
            {
                result.push(nums.slice());
                return;
            }
            for(let j = i; j < nums.length; j++)
            {
                [nums[i],nums[j]] = [nums[j],nums[i]];
                backtrack(i+1, nums);
                [nums[i],nums[j]] = [nums[j],nums[i]]; 
            }
        }
        backtrack(0, nums);
        destination_possibilities = result;
    }
    var permute_value = new Array(len_list);
    for (var i = 1; i <= len_list; i++)
    {
        permute_value[i-1] = [i];
    }
    permute(permute_value);
    // End All Possibilities


    // // Let's say that the possibilities are something like this
    // var destination_possibilities = [
    //     [1, 2, 3, 4, 5], [1, 2, 3, 5, 4], [1, 2, 4, 3, 5], [1, 2, 4, 5, 3], [1, 2, 5, 4, 3],
    //     ....     ....    ....     ....    ....     ....    ....     ....    ....     ....
    //     [5, 3, 4, 1, 2], [5, 3, 1, 4, 2], [5, 3, 1, 2, 4], [5, 4, 3, 1, 2], [5, 4, 3, 2, 1]
    //     ];

    //Now a Single array for the best path among all the solutions
    best_path = new Array(check_len_list);
    
    //Storing the value of the smallest distance value
    best_distance = 0.0;

    
    var distance = 0.0;
    var first_node = 0.0;
    var second_node = 0.0;

    // Finding all the answers
    for (var i = 0; i < possibility; i++)
    {
        distance = 0
        for (var j = 0; j < len_list-1; j++)
        {
            first_node = destination_possibilities[i][j];
            second_node = destination_possibilities[i][j+1];
            
            distance = distance + len_array[first_node-1][second_node-1];   
        }
        if (i == 0 )
        {
            best_distance = distance;
            best_path = destination_possibilities[i];      
        }
        else if (distance < best_distance)
        {
            best_distance = distance;
            best_path = destination_possibilities[i];                 
        }
    }

    // The things that we will be needing are:
    // best_path: a list or an array
    // best_distance: a variable
    // possibility: a variable

}


export function getPath()
{
    return best_path;
}

export function getDistance()
{
    return best_distance;
}

export function getPossibilities()
{
    return possibility;
}
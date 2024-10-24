//1  importations
const http = require('http')
const { items , array1 , array2, scores } = require('./data')



// 2. initialisations
const server = http.createServer()

//3. traitements

console.log('test')

function mergeArrays(array1, array2) {
    let result = [...array1]

    array2.forEach(item=>{
        let exist = result.find(ele=>ele.id == item.id)
        if(!exist){
            result.push(item)
        }
    })



    return result
}


// console.log(mergeArrays(array1 , array2))



const groupBy=(items)=>{
    let result = {}
    items.forEach(item=>{
        if(!result[item.category])
        result[item.category] = []
      
        result[item.category].push(item)


    })

    return result
}

// console.log(groupBy(items))
function calculateStatistics(array) {
    let result = {}
    array.forEach(item=>{
        if(!result[item.subject]){
            result[item.subject] = [0 , 0]
        }
        result[item.subject][0]+=item.score
        result[item.subject][1]++
    })
    for(const obj in result){
        console.log(obj)
        result[obj] = result[obj][0] /result[obj][1]
    }


    return result
    // Math : [ 170  ,2]
}
console.log(calculateStatistics(scores))

// 4. execution

server.listen(3000 ,()=>{
    console.log('Server connected on port 3000')
} )
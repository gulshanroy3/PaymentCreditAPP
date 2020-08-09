export const createTableData=(data,allowedColumn)=>{
return{
    "header":filterColumns(allowedColumn),
    "data":data
}
}
const filterColumns=(data)=>{
    let header=[]
    data.forEach(eachData=>{
        if(eachData.status){
            header.push(eachData)
        }
    })
    header.push({key:'button',label:'',status:true})
    return header;
}


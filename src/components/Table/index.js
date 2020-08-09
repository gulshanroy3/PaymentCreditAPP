import React from 'react'
import Button from "../../components/Button"
import  "./index.scss"
export default function Table(props) {

  const showUser = (tableData) => {
      const {header,data}=tableData
        return (
            <table>
                <thead>
                    <tr className='table-heading'>
                        {header.map(eachHeader=>{
                            return(
                            <td className='td-name'> {eachHeader.label}</td>
                            )
                        })}
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((eachData, index) => (
                      <tr className='row'>
                          {
                                header.map(eachHeader=>{
                                    return(
                                        eachHeader.key==='button'?
                                        <td style={{margin:'12px auto'}}>
                                            <Button onClick={()=>props.onClick(index)} disabled={eachData.amountDue===0}>
                                            <span>Payment</span>
                                        </Button>
                                        </td>:
                                    <td className='td-name'> {eachData[eachHeader.key]}</td>
                                    )
                                })
                          }
                      </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            {showUser(props.data)}
        </div>
    )
}

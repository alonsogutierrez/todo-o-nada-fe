import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { isValid, differenceInDays, format } from 'date-fns'
import ClientAPI from '../../../common/ClientAPI'
import 'react-datepicker/dist/react-datepicker.css'

const DownloadSalesByDate = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const divDatePickersStyles = {
    display: 'inline-flex',
  }
  const titleDatePickerStyle = {
    paddingLeft: '10px',
  }

  const handleDownload = async () => {
    if (validateDates(startDate, endDate)) {
      const clientAPI = new ClientAPI()
      try {
        const downloadSalesResponse = await clientAPI.downloadSales(startDate, endDate)
        const file = new Blob([downloadSalesResponse], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        })
        const excelFileName = `TodoONada_Report_
        ${format(startDate, 'yyyy-MM-dd')}_${format(endDate, 'yyyy-MM-dd')}.xlsx`
        const fileURL = URL.createObjectURL(file)
        const anchor = document.createElement('a')
        anchor.href = fileURL
        anchor.download = excelFileName
        anchor.click()
        anchor.remove()
      } catch (err) {
        console.error('Error trying to download sales: ', err.message)
      }
    }
  }

  const validateDates = (startDate, endDate) => {
    return isValid(startDate) && isValid(endDate) && differenceInDays(endDate, startDate) <= 30
  }

  return (
    <>
      <h1>Descarga tus ventas</h1>
      <p>Rango máximo son 30 días</p>

      <div style={divDatePickersStyles}>
        <h5>Desde: {'  '}</h5>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

        <h5 style={titleDatePickerStyle}>Hasta: {'  '}</h5>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div>
        <br></br>
        <a href="#" className="btn btn-primary mb-2 mr-2" onClick={() => handleDownload()}>
          {' '}
          Descargar{' '}
        </a>
      </div>
    </>
  )
}

export default DownloadSalesByDate

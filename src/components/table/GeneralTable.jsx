import React, { useEffect, useState } from 'react'
import { DataTable } from 'mantine-datatable';
const GeneralTable = ({column , record , loading}) => {
    const PAGE_SIZE = 7;
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(record.slice(0, PAGE_SIZE));
  
    useEffect(() => {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;
      setRecords(record.slice(from, to));
    }, [page]);
  return (
    <div>

<DataTable
 fetching={loading}
      columns={column}
      records={records}
      totalRecords={record.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
    />
    </div>
  )
}

export default GeneralTable